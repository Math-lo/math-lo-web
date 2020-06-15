const express = require('express');
const router = express.Router(); 
const cifrado = require('../tools/cifrado');
const cifradoRSA = require('../tools/cifrado-rsa');
const validacion = require('../tools/validacion');
//const firma = require('../tools/Firma'); 
const multer = require('multer');
const path = require('path');
const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const mail = require('../tools/mail');
const fs = require('fs');
const token = require('../tools/token');
/**---------------------------------------------------------------------------------------------------------- */

//4.-Time-Pink Floyd.rimo
function calcular_primo(num) {
    let p = true;
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            p = false;
        }
    }
    if (num == 2) {
        p = true;
    } else if (num == 1) {
        p = false;
    }
    if (p == true) {
        return num;
    } else {
        return calcular_primo(Math.floor(Math.random() * (10000 - 1000) + 1000));
    }
}
/*--------------------------------------------- FIN ----------------------------------------------------------*/
/*-----------------------------------__Archivos recibidos de las rutas__-----------------------------------------*/

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

let upload = multer({ storage: storage })
    /*----------------------------------------------------FIN-------------------------------------------------------*/

// Pagina principal 
router.get('/web', (req, res) => {
    if (req.session.usuario == undefined) {
        req.app.locals.layout = 'landing';
        res.render('sin-sesion/landing');
    } else {
        if (req.session.usuario.id_tus == 1) {
            req.getConnection((err, conn) => {
                conn.query('select * from eusuariosgrupo natural join cgrupo where id_usu=?', req.session.usuario.id_usu, (errConsul, GrupoUsu) => {
                    if (GrupoUsu.length > 0) {
                        conn.query('select nom_usu,cat_tus from eusuariosgrupo natural join cgrupo natural join musuario natural join ctipousuario where id_gru=? order by nom_usu asc', GrupoUsu[0].id_gru, (errConsulq, grupoF) => {
                            if (errConsulq) console.log(errConsulq)

                            GrupoUsu.forEach(element => {
                                if (element.id_usu == req.session.usuario.id_usu) {
                                    console.log('grupo asignado');
                                    let gru = 1;
                                    req.app.locals.layout = 'alumno';
                                    res.render('alumno/inicio2', { usuario: req.session.usuario, grupo: gru, grupoNom: element.nom_gru, grupoF: grupoF });
                                } else {
                                    console.log('grupo sin asignar');
                                    let gru = 0;
                                    req.app.locals.layout = 'alumno';
                                    res.render('alumno/inicio2', { usuario: req.session.usuario, grupo: gru, grupoNom: element.nom_gru });
                                }
                            });

                        });
                    } else {

                        req.app.locals.layout = 'alumno';
                        res.render('alumno/inicio2', { usuario: req.session.usuario });
                        console.log("No entra")
                    }

                });
            });
        } else
        if (req.session.usuario.id_tus == 2) {
            req.app.locals.layout = 'tutor';
            req.getConnection((err, conn) => {
                conn.query('select * from musuario where id_usu = ?', req.session.usuario.id_usu, (err, usuario) => {
                    callStudentsTutor(conn, usuario[0].curp_usu, estudiantes => {
                        res.render('tutor/inicio', { estudiantes, usuario: req.session.usuario });
                    });
                });

            });

        } else
        if (req.session.usuario.id_tus == 3) {
            req.app.locals.layout = 'profesor';
            req.getConnection((err, conn) => {
                conn.query('select * from eusuariosgrupo natural join musuario natural join cgrupo where id_usu = ? ', req.session.usuario.id_usu, (err, grupos) => {
                    retornaGrupos(grupos, conn, (ListaFinal) => {
                        res.render('profesor/prueba-profesor', { grupos: ListaFinal, usuario: req.session.usuario }); //si solo agrega la de otro uysuario y sha
                    });
                });
            });

        } else
        if (req.session.usuario.id_tus == 4) {
            req.app.locals.layout = 'autoridad';
            req.getConnection((err, conn) => {

                conn.query('select * from eusuariosgrupo natural join musuario natural join cgrupo where id_usu = ? order by nom_gru asc', req.session.usuario.id_usu, (err, grupos) => {
                    retornaGrupos(grupos, conn, (grupos) => {
                        res.render('autoridad/inicio', { grupos, usuario: req.session.usuario });
                    });
                });
            });

        } else
        if (req.session.usuario.id_tus == 5) {
            req.getConnection((err, conn) => {
                conn.query('select * from musuario natural join ctipousuario where cor_usu != ? order by nom_usu asc', req.session.usuario.cor_usu, (err2, usuario) => {
                    if (err2) console.log(err2);
                    retornaUsuarios(usuario, conn, (ListaFinal) => {
                        req.app.locals.layout = 'Administrador2';
                        res.render('admin/prueba_admin', { usuariosRetorno: ListaFinal, usuario: req.session.usuario, rows: usuario });
                    });

                })
            })
        }
    }
});
router.get('/web/gruposAd', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from cgrupo  natural join musuario natural join eusuariosgrupo order by nom_gru asc', (err, grupos) => {
            retornaGrupos(grupos, conn, (ListaFinalGrupo) => {
                res.render('admin/grupos', { gruposRetorno: ListaFinalGrupo, usuario: req.session.usuario });
            });
        });

    });
});

function callStudentsTutor(conn, curps, callback) {
    let curp = curps.split(',');
    console.log(curps);
    let grupos = [];
    curp.forEach(curp_individual => {
        conn.query('select * from eusuariosgrupo natural join musuario natural join cgrupo where (id_tus = 1 and curp_usu = ?)', curp_individual, (err, grupo) => {
            grupo.forEach(g => {
                if (!grupos.includes(g)) grupos.push(g);
            });
        });
    });
    setTimeout(() => {
        callback(grupos);
    }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
}

router.post('/web/}', (req, res) => {
    let id_usu = req.body.id_usu;
    let curp = req.body.curp;
    req.getConnection((err, conn) => {
        conn.query('select * from musuario where (curp_usu = ? and id_tus = 1)', cifrado.cifrar(curp), (err, usuario1) => {
            if (usuario1.length < 1) {
                res.json('Alumno inexistente en el registro');
            } else {
                conn.query('select * from musuario where id_usu = ?', id_usu, (err, usuario) => {
                    conn.query('update musuario set curp_usu = ? where id_usu = ?', [usuario[0].curp_usu + ',' + cifrado.cifrar(curp), id_usu], (err, state) => {
                        if (!err) res.json('Alumno agregado satisfactoriamente');
                    });
                });
            }
        });

    });
});

router.post('/web/deleteStudent', (req, res) => {
    let curp = req.body.curp_usu;
    let id = req.session.usuario.id_usu;
    req.getConnection((err, conn) => {
        conn.query('select * from musuario where id_usu = ?', id, (err, usuario) => {
            let curps = usuario[0].curp_usu.split(',');
            getFinalCurp(curps, curp, (str_curp) => {
                conn.query('update musuario set curp_usu = ? where id_usu = ?', [str_curp, id], (err, state) => {
                    if (!err) res.json('Alumno eliminado satisfactoriamente');
                });
            });
        });
    });
});

function getFinalCurp(curps, curp, callback) {
    let curp_final = '';
    curps.forEach(curp_individual => {
        if (curp_individual != curp) {
            curp_final += curp_individual + ','
        }
    });
    setTimeout(() => {
        callback(curp_final);
    }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
}

router.post('/web/resetTutor', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from musuario where id_usu = ?', req.session.usuario.id_usu, (err, usuario) => {
            callStudentsTutor(conn, usuario[0].curp_usu, estudiantes => {
                res.json(estudiantes);
            });
        });

    });
});

router.post('/web/seeReportsTutor', (req, res) => {
    let grupo = req.body.id_grupo;
    req.getConnection((err, conn) => {
        conn.query('select * from ecuestionario order by fec_fin desc', (err, cuestionarios) => {
            let array = [],
                cuestionariosGrupo = [];
            cuestionarios.forEach(cuestionario => {
                array = cuestionario.id_gru.split(',');
                array.forEach(id => {
                    if (id == grupo && !cuestionariosGrupo.includes([cuestionario.id_cue, cuestionario.nom_cue])) {
                        cuestionariosGrupo.push([cuestionario.id_cue, cuestionario.nom_cue]);
                    }
                });
            });
            conn.query('select * from ctemas', (err, temasCr) => {
                let temas = [];
                temasCr.forEach(tema => {
                    temas.push([tema.id_tem, tema.nom_tem]);
                    if (temasCr.indexOf(tema) == (temasCr.length - 1)) {
                        res.json([cuestionariosGrupo, temas]);
                    }
                });

            });
        });
    });
});

router.get('/web/ver_reportes', (req, res) => {
    if (req.session.usuario.id_tus == 3) {
        req.app.locals.layout = 'profesor';
        req.getConnection((err, conn) => {
            conn.query('select * from eusuariosgrupo natural join cgrupo where id_usu = ?', req.session.usuario.id_usu, (err, grupos) => {
                conn.query('select * from ecuestionario order by fec_fin desc', (err, cuestionarios) => {
                    let array = [],
                        cuestionariosGrupo = [];
                    cuestionarios.forEach(cuestionario => {
                        array = cuestionario.id_gru.split(',');
                        array.forEach(id => {
                            grupos.forEach(grupo => {
                                if (id == grupo.id_gru && !cuestionariosGrupo.includes(cuestionario)) {
                                    cuestionariosGrupo.push(cuestionario);
                                }
                            });
                        });
                    });
                    conn.query('select * from ctemas', (err, temas) => {
                        res.render('profesor/testGraficas', { grupos, cuestionarios: cuestionariosGrupo, temas });
                    });

                });
            });
        });
    } else if (req.session.usuario.id_tus == 4) {
        req.app.locals.layout = 'autoridad';
        req.getConnection((err, conn) => {
            conn.query('select * from eusuariosgrupo natural join cgrupo where id_usu = ?', req.session.usuario.id_usu, (err, grupos) => {
                conn.query('select * from ecuestionario order by fec_fin desc', (err, cuestionarios) => {
                    let array = [],
                        cuestionariosGrupo = [];
                    cuestionarios.forEach(cuestionario => {
                        array = cuestionario.id_gru.split(',');
                        array.forEach(id => {
                            grupos.forEach(grupo => {
                                if (id == grupo.id_gru && !cuestionariosGrupo.includes(cuestionario)) {
                                    cuestionariosGrupo.push(cuestionario);
                                }
                            });
                        });
                    });
                    conn.query('select * from ctemas', (err, temas) => {
                        res.render('profesor/testGraficas', { grupos, cuestionarios: cuestionariosGrupo, temas });
                    });

                });
            });
        });
    } else {
        res.redirect('/web');
    }


});


// Cerrar sesion
router.get('/web/logout', (req, res) => {
    req.session.usuario = undefined;
    req.session = undefined;
    res.redirect('/web');
});

router.get('/web/apoyos-a-alumnos', (req, res) => {
    let sesionAd = false;
    let sesionA = false;
    let sesionP = false;
    let sesionAl = false;
    if (req.session.usuario.id_tus == 3) {
        sesionP = true;
        req.app.locals.layout = 'profesor';
        req.getConnection((err, conn) => {
            conn.query('select * from ctemas', (err, temas) => {
                conn.query('select * from mapoyos natural join ctemas', (err, apoyos) => {
                    res.render('profesor/apoyos', { temas: temas, apoyos: apoyos, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA, sesionAl: sesionAl });
                });
            });
        });
    } else if (req.session.usuario.id_tus == 4) {
        sesionA = true;
        req.app.locals.layout = 'autoridad';
        req.getConnection((err, conn) => {
            conn.query('select * from ctemas', (err, temas) => {
                conn.query('select * from mapoyos natural join ctemas', (err, apoyos) => {
                    res.render('profesor/apoyos', { temas: temas, apoyos: apoyos, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA, sesionAl: sesionAl });
                });
            });
        });
    } else if (req.session.usuario.id_tus == 1) {
        sesionAl = true;
        req.app.locals.layout = 'alumno';
        req.getConnection((err, conn) => {
            conn.query('select * from ctemas', (err, temas) => {
                conn.query('select * from mapoyos natural join ctemas', (err, apoyos) => {
                    res.render('profesor/apoyos', { temas: temas, apoyos: apoyos, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA, sesionAl: sesionAl });
                });
            });
        });
    } else if (req.session.usuario.id_tus == 5) {
        sesionAd = true;
        req.app.locals.layout = 'Administrador2';
        req.getConnection((err, conn) => {
            conn.query('select * from ctemas', (err, temas) => {
                conn.query('select * from mapoyos natural join ctemas', (err, apoyos) => {
                    res.render('profesor/apoyos', { temas: temas, apoyos: apoyos, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA, sesionAl: sesionAl });
                });
            });
        });
    } else {
        res.redirect('/web');
    }


});
/*-------------------------------------------CUESTIONARIOS--------------------------------------*/
router.get('/web/preguntas', (req, res) => {
    let sesionAd = false;
    let sesionA = false;
    let sesionP = false;
    if (req.session.usuario.id_tus == 3) {
        sesionP = true;
        req.app.locals.layout = 'profesor';
        req.getConnection((err, conn) => {
            conn.query("select * from ctemas", (err2, temas) => {
                conn.query("select * from cdificultad", (err3, dif) => {
                    conn.query('select * from mbancopreguntas', (err, preguntas) => {
                        console.log(preguntas);
                        res.render('profesor/questions', { temas: temas, dif: dif, preguntas: preguntas, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA });
                    });
                })
            });
        });
    } else if (req.session.usuario.id_tus == 4) {
        sesionA = true;

        req.app.locals.layout = 'autoridad';
        req.getConnection((err, conn) => {
            conn.query("select * from ctemas", (err2, temas) => {
                conn.query("select * from cdificultad", (err3, dif) => {
                    conn.query('select * from mbancopreguntas', (err, preguntas) => {
                        res.render('profesor/questions', { temas: temas, dif: dif, preguntas: preguntas, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA });
                    });
                })
            });
        });
    } else if (req.session.usuario.id_tus == 5) {
        sesionAd = true;

        req.app.locals.layout = 'Administrador2';
        req.getConnection((err, conn) => {
            conn.query("select * from ctemas", (err2, temas) => {
                conn.query("select * from cdificultad", (err3, dif) => {
                    conn.query('select * from mbancopreguntas', (err, preguntas) => {
                        res.render('profesor/questions', { temas: temas, dif: dif, preguntas: preguntas, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA });
                    });
                })
            });
        });
    } else {
        res.redirect('/web');
    }

});

router.post('/web/updateUserType', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('update musuario set id_tus = ? where cor_usu = ?', [req.body.val, req.body.cor], (err, state) => {
            if (!err) res.json('Usuario modificado satisfactoriamente');
            console.log(state);

        }); //abre el localhost plox :c
    });
});
router.post('/web/updatePre', (req, res) => {
    let id = req.body.id_bpr;
    let data = {
        "con_pre": req.body.con_pre,
        "res_cor":req.body.res_cor,
        "opc_a": req.body.opc_a,
        "opc_b": req.body.opc_b,
        "opc_c": req.body.opc_c,
        "opc_d": req.body.opc_d,
        "id_tem":req.body.id_tem,
        "id_dif":req.body.id_dif
    }
    console.log(data);
    console.log('Este es el id a modificar', id);
    req.getConnection((err, conn) => {
        conn.query('update mbancopreguntas set ? where id_bpr = ?', [data, id], (err, state) => {
            conn.query('select * from mbancopreguntas where id_bpr = ?', id, (err2, datos) => {
                if (err) console.log('este es el error: ', err);
                if (err2) console.log('este es el error2: ', err2);
                datos.forEach(uwu => {
                    res.json({
                        'aviso': "pregunta modificada satisfactoriamente",
                        'id_bpr': uwu.id_bpr,
                        'con_pre': uwu.con_pre,
                        'opc_a': uwu.opc_a,
                        'opc_b': uwu.opc_b,
                        'opc_c': uwu.opc_c,
                        'opc_d': uwu.opc_d

                    });
                });
            });
        });
    });
});
router.get('/web/cuestionarios', (req, res) => {
    let sesionP = false;
    let sesionAd = false;
    let sesionA = false;
    if (req.session.usuario.id_tus == 3) {
        sesionP = true;
        req.app.locals.layout = 'profesor';
        req.getConnection((err, conn) => {
            conn.query("select * from mbancopreguntas natural join ctemas natural join cdificultad", (err2, preguntas) => {
                conn.query("select * from eusuariosgrupo natural join musuario natural join cgrupo where id_usu=?", req.session.usuario.id_usu, (err3, grupos) => {
                    if (err2) console.log("ERROR 2: " + err2)
                    if (err3) console.log("ERROR 3: " + err2)
                    conn.query("select * from ctemas",  (err3, temas) => { 
                        res.render('profesor/Create', { preguntas: preguntas, grupos: grupos,temas:temas, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA });
                    })            
                });
            });
        });
    } else if (req.session.usuario.id_tus == 4) {
        sesionA = true;
        req.app.locals.layout = 'autoridad';
        req.getConnection((err, conn) => {
            conn.query("select * from mbancopreguntas natural join ctemas natural join cdificultad", (err2, preguntas) => {
                conn.query("select * from eusuariosgrupo natural join musuario natural join cgrupo where id_usu=?", req.session.usuario.id_usu, (err3, grupos) => {
                    if (err2) console.log("ERROR 2: " + err2)
                    if (err3) console.log("ERROR 3: " + err2)

                    res.render('profesor/Create', { preguntas: preguntas, grupos: grupos, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA });
                });
            });
        });
    } else if (req.session.usuario.id_tus == 5) {
        sesionAd = true;
        req.app.locals.layout = 'Administrador2';
        req.getConnection((err, conn) => {
            conn.query("select * from mbancopreguntas natural join ctemas natural join cdificultad", (err2, preguntas) => {
                conn.query("select * from eusuariosgrupo natural join musuario natural join cgrupo where id_usu=?", req.session.usuario.id_usu, (err3, grupos) => {
                    if (err2) console.log("ERROR 2: " + err2)
                    if (err3) console.log("ERROR 3: " + err2)

                    res.render('profesor/Create', { preguntas: preguntas, grupos: grupos, sesionP: sesionP, sesionAd: sesionAd, sesionA: sesionA });
                });
            });
        });
    } else {
        res.redirect('/web');
    }

});

/*------------AJAX DE CUESTIONARIOS----------*/ //
router.post('/web/preguntasx', (req, res) => {
    //req.app.locals.layout = 'profesor';
    req.getConnection((err, conn) => {
        console.log(req.body);
        const idTema = req.body.id_tema;
        const idDif = req.body.id_dif;
        if (idDif == "all" && idTema == "all") {
            conn.query('select * from mbancopreguntas natural join cdificultad 	natural join ctemas', (err, preguntas) => {
                if (err) console.log("ERROR ", err)
                console.log(preguntas);
                res.json(preguntas);
            });
        } else if (idDif == "all" && idTema != "all") {
            conn.query('select * from mbancopreguntas natural join cdificultad 	natural join ctemas where id_tem=? ', idTema, (err, preguntas) => {
                if (err) console.log("ERROR ", err)
                res.json(preguntas);
            });
        } else if (idTema == "all" && idDif != "all") {
            conn.query('select * from mbancopreguntas natural join cdificultad 	natural join ctemas where id_dif=?', idDif, (err, preguntas) => {
                if (err) console.log("ERROR ", err)
                res.json(preguntas);
            });
        } else {
            conn.query('select * from mbancopreguntas natural join cdificultad natural join ctemas where id_tem=? and id_dif=?', [idTema, idDif], (err, preguntas) => {
                if (err) console.log("ERROR ", err)

                res.json(preguntas);
            });
        }


    });
});

/*---------FIn AJAX DE CUESTIONARIOS---------*/
/*-----------------------------------------FIN CUESTIONARIOS--------------------------------------*/
/* ------- Peticiones ajax ------------- */

router.post('/web/getPreguntasAjax', (req, res) => {
    let tema = req.body.id_tem;

    req.getConnection((err, conn) => {
        if (tema != -1) {
            conn.query('select * from mbancopreguntas natural join ctemas where id_tem = ?', tema, (err, preguntas) => {
                console.log(preguntas)
                res.json(preguntas);
            });
        } else {
            conn.query('select * from mbancopreguntas natural join ctemas', (err, preguntas) => {
                console.log(preguntas)

                res.json(preguntas);
            });
        }

    });
});
router.post('/web/getApoyosAjax', (req, res) => {
    let tema = req.body.id_tem;

    req.getConnection((err, conn) => {
        if (tema != -1) {
            conn.query('select * from mapoyos natural join ctemas where id_tem = ?', tema, (err, apoyos) => {
                res.json(apoyos);
            });
        } else {
            conn.query('select * from mapoyos natural join ctemas', (err, apoyos) => {
                res.json(apoyos);
            });
        }

    });
});

router.post('/web/deleteApoyoAjax', (req, res) => {
    let id = req.body.id_apoyo;
    let apo = req.body.pdf_apo;

    var filePath = './src/public/uploads/' + apo;
    fs.unlinkSync(filePath);

    console.log('id', id);

    console.log('apoyo', apo);
    req.getConnection((err, conn) => {
        conn.query('delete from mapoyos where id_apo = ?', id, (err, exito) => {
            console.log(err);
            res.json('Apoyo eliminado satisfactoriamente');
        });
    });
});

router.post('/web/updateApoyoLinkAjax', (req, res) => {
    let id = req.body.id_apoyo;
    let link = req.body.link;
    let uwu = req.body.apo_name;
    console.log('vamos suicidate', uwu);

    req.getConnection((err, conn) => {
        conn.query('update mapoyos set vin_apo = ? where id_apo = ?', [link, id], (err, apoyoModificado) => {
            res.json('Link del apoyo modificado satisfactoriamente');
        });
    });
});

router.post('/web/getAlumnosGrupo', (req, res) => {
    const { id_gru } = req.body;
    req.getConnection((err, conn) => {
        conn.query('select id_ugr, nom_usu, id_gru from eusuariosgrupo natural join musuario where id_gru = ? and id_tus = 1 order by nom_usu asc', id_gru, (err, alumnosGrupo) => {
            let jfinal = [];
            alumnosGrupo.forEach(algru => {
                let j = {
                    "id_ugr": algru.id_ugr,
                    "nom_usu": algru.nom_usu,
                    "id_gru": algru.id_gru,
                    "id_prof": req.session.usuario.id_usu
                }
                jfinal.push(j);
            });
            if (id_gru == -1) {
                conn.query('select * from eusuariosgrupo natural join cgrupo where id_usu = ?', req.session.usuario.id_usu, (err, grupos) => {
                    conn.query('select id_cue,nom_cue,id_gru from ecuestionario order by fec_fin desc', (err, cuestionarios) => {
                        let array = [],
                            cuestionariosGrupo = [],
                            cuestionarioFinal = [];
                        cuestionarios.forEach(cuestionario => {
                            array = cuestionario.id_gru.split(',');
                            array.forEach(id => {
                                grupos.forEach(grupo => {
                                    if (id == grupo.id_gru && !cuestionariosGrupo.includes(cuestionario)) {
                                        cuestionariosGrupo.push(cuestionario);
                                        cuestionarioFinal.push([cuestionario.id_cue, cuestionario.nom_cue]);
                                    }
                                });
                            });
                        });
                        res.json([jfinal, cuestionarioFinal]);
                    });
                });
            } else {
                conn.query('select id_cue,nom_cue,id_gru from ecuestionario order by fec_fin desc', (err, cuestionarios) => {
                    let array = [],
                        cuestionariosGrupo = [];
                    cuestionarios.forEach(cuestionario => {
                        array = cuestionario.id_gru.split(',');
                        array.forEach(id => {
                            if (id == id_gru) {
                                cuestionariosGrupo.push([cuestionario.id_cue, cuestionario.nom_cue]);
                            }
                        });
                    });
                    res.json([jfinal, cuestionariosGrupo]);
                });
            }

        });
    });
});

router.post('/web/deleteAlumnoGrupo', (req, res) => {
    const { id_ugr } = req.body;
    req.getConnection((err, conn) => {
        conn.query('delete from eusuariosgrupo where id_ugr = ?', id_ugr, (err, alumnoGrupoEliminado) => {
            res.json('Alumno eliminado satisfactoriamente ');
        });
    });
});

router.post('/web/verGruposProfesor', (req, res) => {
    const { id_prof } = req.body;
    req.getConnection((err, conn) => {
        conn.query('select * from eusuariosgrupo natural join musuario natural join cgrupo where id_usu = ? order by nom_gru asc', id_prof, (err, grupos) => {
            retornaGrupos(grupos, conn, (ListaFinal) => {
                res.json(ListaFinal);
            });
        });

    });
});

router.post('/web/modificarClaveGrupo', (req, res) => {
    const id_gru = req.body.id_gru;
    const clave = req.body.clave;
    req.getConnection((err, conn) => {
        conn.query('update cgrupo set cla_gru = ? where id_gru = ?', [clave, id_gru], (err, exito) => {
            res.json("La clave del grupo se ha modificado con éxito");
        });
    });

});
router.post('/web/getUsuariosAjax', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from musuario natural join ctipousuario ', (err, usuConsul) => {
            console.log('el error es: ', err);
            //console.log('f', usuConsul);
            retornaUsuarios(usuConsul, conn, (ListaFinal) => {
                res.json(ListaFinal);

            });

        });
    });
});
router.get('/web/prueba_admin', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from MUsuario natural join CTipoUsuario where cor_usu != ?', req.session.usuario.cor_usu, (err2, usuario) => {
            if (err2) console.log(err2);
            retornaUsuarios(usuario, conn, (ListaFinal) => {
                req.app.locals.layout = "Administrador2";
                res.render('admin/prueba_admin', { usuariosRetorno: ListaFinal, usuario: req.session.usuario, rows: usuario });
            });

        })
    });
});
router.post('/web/eliminarUsuarioAjax', (req, res) => {
    const id_usu = req.body.id_usu;
    console.log(id_usu);

    req.getConnection((err, conn) => {
        conn.query('delete from eusuariosgrupo where id_usu = ?', [id_usu], (err, exito) => {
            conn.query('delete from musuario where id_usu = ?', [id_usu], (err2, exito) => {
                if (err);
                console.log(err2);
                console.log(err);
                res.json("Usuario eliminado con exito");
            });
        });
    });

});
router.post('/web/modificarUsuarioAjax', (req, res) => {
    const id_usu = req.body.id_usu;
    const nom_usu = req.body.nom_usu;
    const cor_usu = req.body.cor_usu;

    let data = {
        "nom_usu": nom_usu,
        "cor_usu": cor_usu,

    }
    req.getConnection((err, conn) => {
        conn.query('update musuario set ? where id_usu = ?', [data, id_usu], (err, exito) => {
            res.json("Usuario modificado con exito");
        });
    });

});
"use strict";

function retornaUsuarios(usuarios, conn, callback) {
    let usuariosFin = [],
        n = 0;
    usuarios.forEach(user => {
        conn.query('select * from musuario natural join ctipousuario ', (err, userConsult) => {
            userConsult.forEach(consult => {
                n++;
            });
            let data = {
                "id_usu": user.id_usu,
                "nom_usu": user.nom_usu,
                "cor_usu": user.cor_usu,
                "id_tus": user.id_tus,
                "cat_tus": user.cat_tus
            }
            usuariosFin.push(data);
            //console.log(usuariosFin);
            n = 0;
        });
    });
    setTimeout(() => {
        callback(usuariosFin);
    }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
}

function retornaGrupos(grupos, conn, callback) {
    let gruposFin = [],
        n = 0;
    grupos.forEach(grupo => {
        conn.query('select id_usu from eusuariosgrupo natural join musuario where id_gru = ? and id_tus = 1', grupo.id_gru, (err, alumnos) => {
            alumnos.forEach(alumno => {
                n++;
            });
            let g = {
                "id_gru": grupo.id_gru,
                "nom_gru": grupo.nom_gru,
                "cla_gru": grupo.cla_gru,
                "num_alu": n
            }
            gruposFin.push(g);
            n = 0;
        });
    });
    setTimeout(() => {
        callback(gruposFin);
    }, 0 | Math.random() * 100);
}

function retornaPreguntas(preguntas, conn, callback) {
    let preguntasFin = [],
        n = 0;
    preguntas.forEach(pregunta => {
        conn.query('select * from mbancopreguntas', (err, pregunta1) => {
            pregunta1.forEach(pre => {
                n++;
            });
            let g = {
                "con_pre": pre.con_pre
            }
            preguntasFin.push(g);
            console.log(preguntasFin);
            n = 0; 
        });
    });
    setTimeout(() => {
        callback(preguntasFin);
    }, 0 | Math.random() * 100);
}

/* -------------- fin peticiones ajax ---------------*/

// Registrar usuario en la bd

router.post('/web/registrar', (req, res) => {
    /*Comienzo Validacion de Registro */
    console.log('Si entra');
    var reNomA = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
    var reNom = /^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/;
    var reCorreo = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9._-]+@[a-zA-ZÀ-ÿ\u00f1\u00d10-9.-]+\.([a-zA-ZÀ-ÿ\u00f1\u00d1]{2,4})+$/
    var reCurp = /[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
    var reContra = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,50}$/;
    //let reNomB= false;
    //let reAppB= false;
    //let reCorreoB= false;
    //reCorreoB= reCorreo.test(req.body.email_usuario);
    //reNomB= reNomA.test(req.body.nombres_usuario);
    // reAppB= reNomA.test(req.body.apellidos_usuario);
    let spaceNom = req.body.nombres_usuario.split(' ');
    let spaceApp = req.body.apellidos_usuario.split(' ');


    if (!req.body.nombres_usuario || !req.body.apellidos_usuario || !req.body.email_usuario ||
        !req.body.curp_alumno || !req.body.contraseña_usuario || !req.body.tipo_usuario) {
        console.log('rellene todos los campos');
        res.redirect('/web/#modal1');
    } else if (!reNomA.test(req.body.nombres_usuario) || !reNomA.test(req.body.apellidos_usuario)) {
        console.log('El nombre o apellidos contiene caracteres invalidos');
        res.redirect('/web/#modal1');
    } else if (spaceNom.length > 2 || spaceApp.length != 2) {
        console.log('numero de espacios');
        res.redirect('/web/#modal1');
    } else if (!reCorreo.test(req.body.email_usuario)) {
        console.log('correo invalido');
        res.redirect('/web/#modal1');
    } else if (req.body.email_usuario.length > 70) {
        console.log('correo invalido por tamaño');
        res.redirect('/web/#modal1');
    } else if (!reCurp.test(req.body.curp_alumno)) {
        console.log('curp invalido');
        res.redirect('/web/#modal1');
    } else if (!reContra.test(req.body.contraseña_usuario)) {
        console.log('contraseña invalida');
        res.redirect('/web/#modal1');
    }else {/*Fin Validacion de Registro */
        let nombre = req.body.apellidos_usuario + ' ' + req.body.nombres_usuario;
        let cor = req.body.email_usuario.toLowerCase();
        let pas = req.body.contraseña_usuario;
        let tip = req.body.tipo_usuario;
        let curp = req.body.curp_alumno.toUpperCase();
        token.generar(tok => {
            let usuario = {
                "nom_usu": nombre,
                "curp_usu": curp,
                "cor_usu": cor,
                "pas_usu": pas,
                "tok_usu": tok,
                "id_tus": tip
            }
            console.log('Si entra: ', usuario);
            req.getConnection(async(err, conn) => {
                await conn.query(`select * from musuario where nom_usu = '${usuario.nom_usu}' or cor_usu = ' ${usuario.cor_usu}'`, (err, usuarioExistente) => {
                    if (err) console.log("ERROR AL REGISTRAR")
                    if (usuarioExistente.length < 1) {
                        usuario.pas_usu = cifrado.cifrar(usuario.pas_usu);
                        usuario.curp_usu = cifrado.cifrar(usuario.curp_usu);
                        req.session.usuario_sin_verificar = usuario;
                        conn.query(`insert into musuario set ?`, req.session.usuario_sin_verificar, (err, usuarioInsertado) => {
                            req.session.usuario_sin_verificar = undefined;
                            res.redirect('/web');
                        });
                        // mail.envia(usuario.cor_usu, usuario.tok_usu + mail.generaCodigo(usuario.cor_usu));
                        // res.redirect('/web/confirmacion_de_usuario');
                    } else {
                        res.redirect('/web');
                    }
                });
            });
        });

    }
});

router.get('/web/confirmacion_de_usuario', (req, res) => {
    if (req.session.usuario_sin_verificar != undefined) {
        req.app.locals.layout = undefined;

        res.render('sin-sesion/confirmar');
    } else {
        res.redirect('/web');
    }
});

router.post('/web/confirmacion', (req, res) => {
    if (!req.body.codigo_confirmacion) {
        res.redirect('/web');
    } else {
        console.log('hola');
        console.log('prueba1', mail.generaCodigo(req.session.usuario_sin_verificar.cor_usu));
        if (req.session.usuario_sin_verificar.tok_usu + mail.generaCodigo(req.session.usuario_sin_verificar.cor_usu) == req.body.codigo_confirmacion) {

            req.session.usuario = req.session.usuario_sin_verificar;
            req.getConnection((err, conn) => {
                conn.query(`insert into musuario set ?`, req.session.usuario_sin_verificar, (err, usuarioInsertado) => {
                    req.session.usuario_sin_verificar = undefined;
                    res.redirect('/web');
                });
            });
        } else {
            res.redirect('/web');
        }

    }
});

//insertar alumno al grupo
router.post('/web/alumnoIGrupo', (req, res) => {
    let cla_gru = req.body.codigo_grupo;
    req.getConnection((err, conn) => {
        if (err) console.log('el error es: ', err);

        conn.query('select * from cgrupo where cla_gru = ?', cla_gru, (errConsul, clave) => {
            if (errConsul) console.log('el error en la consulta es: ', errConsul);
            console.log(clave)
            if (clave.length > 0) {
                clave.forEach(element => {
                    console.log(element.cla_gru);
                    console.log(element.id_gru);
                    if (element.cla_gru == cla_gru) {
                        let insertData = {
                            "id_usu": parseInt(req.session.usuario.id_usu),
                            "id_gru": element.id_gru
                        }
                        conn.query('insert into eusuariosgrupo set ?', [insertData], (errInsert, row) => {
                            if (errInsert) console.log('El error al insertar es: ', errInsert);
                            console.log(req.session.usuario.id_usu);
                            req.session.usuario.id_gru = element.id_gru;
                            res.redirect('/web'); 
                        });

                    } else {
                        console.log('no furula');
                        res.redirect('/web');
                    }
                });
            } else {
                console.log("No Existe el código de grupo");
                res.redirect("/web")
            }
        })
    });
});

router.post('/web/recuperarCuenta', (req, res) => {
    if (!req.body.email_recuperacion) {
        res.redirect('/web/#!');
    } else {
        req.getConnection((err, conn) => {
            conn.query('select * from musuario where cor_usu = ?', req.body.email_recuperacion, (err, usuarioCorrecto) => {
                console.log(usuarioCorrecto);

                mail.enviaRecuperacion(req.body.email_recuperacion, cifrado.desencriptar(usuarioCorrecto[0].pas_usu));
                res.redirect('/web/#inicio');
            });
        });

    }
});

router.post('/web/insertarTema', (req, res) => {
    if (!req.body.tema) {
        res.redirect('/web/#!');
    } else {
        req.getConnection((err, conn) => {
            let tema = {
                "nom_tem": req.body.tema,
                "id_uni": req.body.unidad_aprendizaje
            }
            conn.query('insert into ctemas set ?', tema, (err, temaInsertado) => {
                res.redirect('/web/#!');
            });
        });
    }
});

router.post('/web/insertarGrupo', (req, res) => {
    if (!req.body.grupo) {
        res.redirect('/web/#!');
    } else {
        req.getConnection((err, conn) => {
            let grupo = {
                "nom_gru": req.body.grupo
            }
            conn.query('insert into cgrupo set ?', grupo, (err, grupoInsertado) => {
                res.redirect('/web/#!');
            });
        });
    }
});

router.post('/web/modificarTema', (req, res) => {
    if (!req.body.tema_modificar || !req.body.n_tema_modificar) {
        res.redirect('/web/#!');
    } else {
        req.getConnection((err, conn) => {
            conn.query(`update ctemas set nom_tem = '${req.body.tema_modificar}' where id_tem = ${req.body.n_tema_modificar}`, (err, temaModificado) => {
                res.redirect('/web/#!');
            });
        });
    }
});
// Registrar usuario en la bd
router.post('/web/registrar_ajax', (req, res) => {
    console.log('me odio');
    console.log(req.body);
    let nombre = req.body.app_usu + ' ' + req.body.nom_usu;
    let cor = req.body.cor_usu.toLowerCase();
    let pas = req.body.pas_usu;
    let tip = req.body.id_tus;
    let curp = "-";

    let usuario = {
        "nom_usu": nombre,
        "curp_usu": curp,
        "cor_usu": cor,
        "pas_usu": cifrado.cifrar(pas),
        "id_tus": tip
    }
    if (!req.body.nom_usu || !req.body.app_usu || !req.body.cor_usu || !req.body.pas_usu || !req.body.id_tus) {
        res.json('No se pudo insertar el usuario satisfactoriamente ');
        console.log(usuario)
    } else {
        console.log(usuario);

        req.getConnection(async(err, conn) => {
            await conn.query('insert into musuario set ?', usuario, (err, usuariosC) => {
                if(err) console.log(err)
                res.json('Se inserto Satisfactoriamente ');
            });
        });
    }
});

router.post('/web/eliminarTema', (req, res) => {
    if (!req.body.tema_eliminar) {
        res.redirect('/web/#!');
    } else {
        req.getConnection((err, conn) => {
            conn.query('delete from ctemas where id_tem = ?', (req.body.tema_eliminar), (err, temaEliminado) => {
                res.redirect('/web/#!');
            });
        });
    }
});

router.post('/web/modificarGrupo', (req, res) => {
    if (!req.body.grupo_modificar || !req.body.n_grupo_modificar) {
        res.redirect('/web/#!');
    } else {
        req.getConnection((err, conn) => {
            conn.query(`update cgrupo set nom_gru = '${req.body.grupo_modificar}' where id_tem = ${req.body.n_grupo_modificar}`, (err, grupoModificado) => {
                res.redirect('/web/#!');
            });
        });
    }
});

router.post('/web/eliminarGrupo', (req, res) => {
    if (!req.body.grupo_eliminar) {
        res.redirect('/web/#!');
    } else {
        req.getConnection((err, conn) => {
            conn.query('delete from cgrupo where id_gru = ?', (req.body.grupo_eliminar), (err, grupoEliminado) => {
                res.redirect('/web/#!');
            });
        });
    }
});

// Iniciar sesion de un usuario sin sesion
router.post('/web/iniciar', (req, res) => {
    //aqui comprueba para inicar sesion
    if (!req.body.email_inicio || !req.body.contraseña_inicio) {
        res.redirect('/web');
    } else {
        let email = req.body.email_inicio;
        let password = req.body.contraseña_inicio;
        req.getConnection((err, conn) => {
            conn.query(`select * from  musuario where cor_usu = '${email}' and pas_usu = '${cifrado.cifrar(password)}'`, (err, usuarioCorrecto) => {
                if (usuarioCorrecto.length > 0) {
                    conn.query(`select * from eusuariosgrupo natural join musuario where cor_usu = '${email}' and pas_usu = '${cifrado.cifrar(password)}'`, (err, grupo) => {
                        let usuario = {}
                        if(grupo.length > 0){
                            usuario = {
                                "id_usu": usuarioCorrecto[0].id_usu,
                                "nom_usu": usuarioCorrecto[0].nom_usu,
                                "curp_usu": usuarioCorrecto[0].curp_usu,
                                "cor_usu": usuarioCorrecto[0].cor_usu,
                                "pas_usu": usuarioCorrecto[0].pas_usu,
                                "id_tus": usuarioCorrecto[0].id_tus,
                                "id_gru": grupo[0].id_gru
                            }
                        }else{
                            usuario = {
                                "id_usu": usuarioCorrecto[0].id_usu,
                                "nom_usu": usuarioCorrecto[0].nom_usu,
                                "curp_usu": usuarioCorrecto[0].curp_usu,
                                "cor_usu": usuarioCorrecto[0].cor_usu,
                                "pas_usu": usuarioCorrecto[0].pas_usu,
                                "id_tus": usuarioCorrecto[0].id_tus,
                                "id_gru": undefined
                            }
                        }     
                        req.session.usuario = usuario;
                        res.redirect('/web');
                    })
                    
                } else {
                    res.json('Usuario inexistente con estas credenciales');
                }
            });
        });
    }
});

router.post('/web/insertarApoyo', upload.single('archivo_apoyo'), (req, res) => {
    let fileroute, vinculo, filename;
    let reNomUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if(reNomUrl.test(req.body.hipervinculo_apoyo)==false){
         res.json('No se pudo insertar el apoyo, verifique los datos');
    }else if(req.body.hipervinculo_apoyo.length<1||req.body.hipervinculo_apoyo.length>60){
         res.json('No se pudo insertar el apoyo, verifique los datos');      
    }else if(req.body.apoyo_tema!=1 && req.body.apoyo_tema!=2 && req.body.apoyo_tema!=3 && req.body.apoyo_tema!=4){
         res.json('No se pudo insertar el apoyo, verifique los datos');      
    }else{
if (req.file != undefined) {
        fileroute = req.file.filename;
        filename = req.file.originalname;
    } else {
        fileroute = null;
        filename = null;
    }
    if (req.body.hipervinculo_apoyo != undefined) {
        vinculo = req.body.hipervinculo_apoyo;
    } else {
        vinculo = null;
    }
    if (!req.body.apoyo_tema) {
        res.json('No se pudo insertar el apoyo, verifique los datos');
    } else {
        req.getConnection((err, conn) => {
            let apoyo = {
                "pdf_apo": fileroute,
                "nom_pdf": filename,
                "vin_apo": vinculo,
                "id_tem": req.body.apoyo_tema
            }
            conn.query('insert into mapoyos set ?', apoyo, (err, apoyoInsertado) => {
                res.json('Apoyo insertado satisfactoriamente');
            });
        });
    }
    }
});

router.post('/web/updateApoyo', upload.single('archivo_apoyo_modificar'), (req, res) => {
    let json = {};

    if (req.file != undefined) {
        json.pdf_apo = req.file.filename;
        json.nom_pdf = req.file.originalname;
    }
    if (req.body.link != undefined) {
        json.vin_apo = req.body.link;
    }
    if (req.body.update_tema != -1) {
        json.id_tem = req.body.update_tema;
    }
    req.getConnection((err, conn) => {
        conn.query('update mapoyos set ? where id_apo = ?', [json, req.body.id_apoyo_name], (err, apoyoModificado) => {
            conn.query('select * from mapoyos natural join ctemas where id_apo = ?', [req.body.id_apoyo_name], (err, apoyo) => {
                console.log(apoyo);
                console.log(apoyo[0].pdf_apo);

                res.json({
                    'aviso': "Apoyo modificado satisfactoriamente",
                    'id': apoyo[0].id_apo,
                    'pdf': apoyo[0].nom_pdf,
                    'url': apoyo[0].vin_apo,
                    'tema': apoyo[0].nom_tem
                });
            });

        });
    });
});

router.post('/web/AddGrupobb', (req, res) => {

    if (!req.body.id_gru || !req.body.id_sem || !req.body.id_tur || !req.body.des_gru) {
        res.redirect('/web');
    } else {

        let id_gru = req.body.id_gru;
        let id_sem = req.body.id_sem;
        let id_tur = req.body.id_tur;
        let des_gru = req.body.des_gru;
        let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let l1 = abc[Math.floor(Math.random() * (50))];
        let l2 = abc[Math.floor(Math.random() * (50))];
        let l3 = abc[Math.floor(Math.random() * (50))];
        console.log('letra 1: ' + l1 + ' letra 2: ' + l2 + ' letra 3: ' + l3);
        let prim = calcular_primo(Math.floor(Math.random() * (10000 - 1000) + 1000));
        console.log('El primo es: ' + prim);
        let hexaprim = prim.toString(16);
        console.log("El número decimal %s en hexadecimal es %s", prim, hexaprim);
        let t = [l1, l2, l3];
        hexaprim.split('').forEach(hexaprim =>
            t.push(hexaprim)
        );
        console.log(t);
        for (var i = t.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = t[i];
            t[i] = t[j];
            t[j] = temp;
        }
        console.log(t);
        let st = t.toString();
        console.log(st);
        st = st.replace(/,/g, "");
        console.log(st);

        let grupo = {
            "id_gru": id_gru,
            "id_sem": id_sem,
            "id_tur": id_tur,
            "des_gru": des_gru
        };
        let token = {
            "id_gru": id_gru,
            "con_tok": st,
            "bol_tok": 1
        }
        console.log(grupo);
        req.getConnection((err, conn) => {
            conn.query('select * from agruparusuariogrupo where id_gru=?', [id_gru], (err, rows23) => {
                if (rows23.length > 0) {
                    res.redirect('/web/docente');
                } else {
                    conn.query('insert into grupo set ?', [grupo], (err, rows) => {
                        if (err) console.log("El error en insertar grupo es: ", err);
                        let id_us;
                        if (req.session.cargo == 'docente') {
                            id_us = req.session.name;
                            let dat = {
                                "id_gru": id_gru,
                                "id_us": id_us
                            }
                            conn.query('insert into agruparusuariogrupo set ?', [dat], (err2, rows) => {});
                        } else {
                            id_us = req.body.id_prof;
                            let dat = {
                                "id_gru": id_gru,
                                "id_us": id_us
                            }
                        }
                    });
                    conn.query('insert into token set ?', [token], (err, rows) => {
                        if (err) console.log("El error en insertar token es: ", err);

                        //como admin?. u: mychemis p: #erty!Mo;rph    creo
                    });
                    if (req.session.cargo == "docente") {
                        res.redirect('/web/docente');
                    } else {
                        res.redirect('/web/AddGrupo');
                    }
                }
            });
        });
    }


});

//Verificar Token
router.post('/web/alumno', (req, res) => {
    let token = req.body.token;
    rows.forEach(element => {
        bol = element.bol_tok;
        id_gru = element.id_gru;
        con_tok = element.con_tok;
        agr = {
            "id_gru": id_gru,
            "id_us": id_us
        }
    });
    let id_us = req.session.name;
    console.log(id_us);
    let con_tok;
    let agr = {};
    if (req.session.name == undefined) {
        res.redirect('/web');
    } else {
        req.getConnection((err, conn) => {
            if (err) console.log("Error en Verificar token");
            conn.query('select * from token where con_tok=?', [token], (err, rows) => {
                rows.forEach(element => {
                    bol = element.bol_tok;
                    id_gru = element.id_gru;
                    con_tok = element.con_tok;
                    agr = {
                        "id_gru": id_gru,
                        "id_us": id_us
                    }
                });

                if (con_tok = token && bol == 1) {
                    console.log('concuerda');
                    conn.query('insert into agruparusuariogrupo set ?', [agr], (err, rows2) => {
                        res.redirect('/web');
                    });
                } else {
                    req.getConnection((err, conn) => {
                        conn.query('select * from agruparusuariogrupo natural join grupo natural join usuario natural join semestre natural join turno where id_us = ? ', [req.session.name], (err2, rows) => {
                            req.app.locals.layout = 'alumno';
                            //console.log(rows, "rows")
                            const aviso = {
                                "aviso": "El código de grupo no existe"
                            }
                            req.app.locals.layout = 'alumno';
                            res.render('alumno/inicio', { rows: rows, aviso: aviso });
                        });
                    });
                    //console.log('no concuerda');
                    //res.redirect('/home');
                }
            });
        });
    }

});

/*-----------------------------------------Administrador---------------------------------------------------*/
router.get('/web/Admin2.0', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from MUsuario natural join CTipoUsuario where nom_usu=?', "Flores Rodriguez Alan", (err2, rows) => {
            rows.forEach(element => {
                console.log(cifrado.desencriptar(element.pas_usu));

            });
            if (err2) console.log(err2);
            req.app.locals.layout = 'Administrador';
            res.render('admin/HomeAd2', { rows: rows });
        })
    })
});
router.post('/web/eliminarUs2.0', (req, res) => {
    console.log(req.body.tema_eliminar)
    req.getConnection((err, conn) => {
        conn.query('delete from MUsuario where id_usu = ?', (req.body.tema_eliminar), (err, temaEliminado) => {
            req.app.locals.layout = 'Administrador';
            res.redirect('/web');
        });
    });
});
router.get('/web/ModifyUsAd2.0', (req, res) => {
    req.app.locals.layout = 'Administrador';
    res.render('admin/ModificarAd2');
});

router.post('/web/updateTeacherGroup', (req, res) => {
    req.getConnection((err, conn) => {
        let data = {
            'id_usu': req.body.id_prof,
            'id_gru': req.body.id_gru
        }
        conn.query('select * from eusuariosgrupo natural join musuario where (id_gru = ? and (id_tus = 3 or id_tus = 4))', data.id_gru, (err, encargados) => {
            encargados.forEach(encargado => {
                conn.query('delete from eusuariosgrupo where id_ugr = ?', encargado.id_ugr, (err, state) => {
                    if (err) console.log(err);
                });
            });
        });
        conn.query('insert into eusuariosgrupo set ?', data, (err, state) => {
            if (state) res.json('Profesor modificado satisfactoriamente');
        });
    });
});

router.post('/web/deleteTeacherGroup', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from eusuariosgrupo natural join musuario where (id_gru = ? and (id_tus = 3 or id_tus = 4))', req.body.id_gru, (err, profesores) => {
            profesores.forEach(profesor => {
                conn.query('delete from eusuariosgrupo where id_ugr = ?', profesor.id_ugr, (err, state) => {
                    if (err) console.log(err);
                });
            });
            res.json('Profesor eliminado satisfactoriamente');
        });
    });
});

/*-----------------------------------------Fin Administrador---------------------------------------------------*/
/*-----------------------------------------CUESTIONARIO---------------------------------------------------*/
router.post('/web/Addquestions/:questions', (req, res) => {
    req.app.locals.layout = 'profesor';
    // req.getConnection((err, conn) => {
    let questions = req.params.questions.split('|');

    for (let i = 0; i < questions.length; i++) {
        questions[i] = JSON.parse(questions[i]);

    }
    req.getConnection((err, conn) => {
        for (let i = 0; i < questions.length; i++) {

            conn.query('insert into mbancopreguntas(con_pre,res_cor,id_tem,id_dif) values (?,?,?,?)', [questions[i].p, questions[i].a, 1, 1], (err2, temaEliminado) => {
                req.app.locals.layout = 'Administrador';
                if (i == questions.length - 1) { res.redirect('/web/CreateQuizz'); }
                if (err2) console.log("ERROR 2 ", err2)
            });
        }
        if (err) console.log("ERROR 1 ", err)
    });
});
router.get('/web/questions', (req, res) => {

    req.app.locals.layout = 'profesor';
    req.getConnection((err, conn) => {
        conn.query("select * from ctemas", (err2, temas) => {
            conn.query("select * from cdificultad", (err3, dif) => {
                res.render('profesor/questions', { temas: temas, dif: dif });
            })
        });
    });

});
router.post('/web/Addquestion', (req, res) => {
    if(!req.body.con_pre||!req.body.res_cor||!req.body.opc_a||!req.body.opc_b||!req.body.opc_c||!req.body.opc_d||!req.body.id_tem||!req.body.id_dif){
        console.log('Campos vacios');
    }else if(req.body.con_pre.length>150||req.body.con_pre.length<1){
        console.log('entre 1-150 caracteres');
    }else if(req.body.opc_a.length<1||req.body.opc_a.length>50){
        console.log('a)entre 1-50 caracteres');
    }else if(req.body.opc_b.length<1||req.body.opc_b.length>50){
        console.log('b)entre 1-50 caracteres');
    }else if(req.body.opc_c.length<1||req.body.opc_c.length>50){
        console.log('c)entre 1-50 caracteres');
    }else if(req.body.opc_d.length<1||req.body.opc_d.length>50){
        console.log('d)entre 1-50 caracteres');
    }else if(req.body.id_tem!='1'&& req.body.id_tem!='2'&&req.body.id_tem!='3'&&req.body.id_tem!='4'){
        console.log('id de tema invalido');
    }else if(req.body.id_dif!='1'&&req.body.id_dif!='2'&&req.body.id_dif!='3'){
        console.log('id de dificultad invalido');
    }else{
        req.app.locals.layout = 'profesor';
        req.getConnection((err, conn) => {
            let valores = {
                "con_pre": req.body.con_pre,
                "res_cor": req.body.res_cor,
                "opc_a": req.body.opc_a,
                "opc_b": req.body.opc_b,
                "opc_c": req.body.opc_c,
                "opc_d": req.body.opc_d,
                "id_tem": req.body.id_tem,
                "id_dif": req.body.id_dif
            }
            console.log('estos son los valore kawai: ', valores)
            conn.query('insert into mbancopreguntas set ?', valores, (err2, temaEliminado) => { //no se por que aparece ese Send osea en html no lo tengo:c
                if (err2) console.log("ERROR 2 ", err2)
                res.json('Se inserto la pregunta correctamente');
            }); //Error: Lock wait timeout exceeded; try restarting transaction es algo del maisicuel XD
            if (err) console.log("ERROR 1 ", err)
        });
    }
});

 
 router.post('/web/AddQuizz', (req, res) => {
     //Validacion de cuestionarios
    console.log('erwqefcqweqwerwqerewrzwrqwe ',req.body.element)
    console.log(req.body.date);
    let dateS=req.body.date.split('-');
    var reNomCuest = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1]+(\s*[a-zA-Z0-9À-ÿ\u00f1\u00d1]*)*[a-zA-Z0-9À-ÿ\u00f1\u00d1]+$/
    var reFecha= /\d{4}([-])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/
    let todaydatere = new Date();
    console.log(parseInt(dateS[1])); //
    console.log('mes actual: ',todaydatere.getMonth());
    if(!req.body.nombre||!req.body.date||!req.body.element||!req.body.group){
        console.log('Campos vacios');
        res.redirect('/web/cuestionarios');
    } else if(!reNomCuest.test(req.body.nombre)){
        console.log('Solo debe contener letras');
        res.redirect('/web/cuestionarios');
    }else if(req.body.nombre.length>60|| req.body.nombre.length<1){
            console.log('Supera el rango');
            res.redirect('/web/cuestionarios');
    }else if(!reFecha.test(req.body.date)){
                    console.log('Fecha invalida');
                    res.redirect('/web/cuestionarios');
    }else if(parseInt(dateS[0])< todaydatere.getFullYear()){
        console.log('fecha imposible');
        res.redirect('/web/cuestionarios');

    }else if(parseInt(dateS[1])< (todaydatere.getMonth()+1) && parseInt(dateS[0]) == todaydatere.getFullYear()){
        console.log('fecha imposible por que el mes es anterior a la fecha de creacion');
        res.redirect('/web/cuestionarios');

    }else if(parseInt(dateS[2])< todaydatere.getDate()&& parseInt(dateS[1]) == (todaydatere.getMonth()+1)){///

            console.log('fecha imposible por que el dia es anterior a la fecha de creacion');
        res.redirect('/web/cuestionarios');
    }else{
        req.app.locals.layout = 'profesor';
    req.getConnection((err, conn) => {
        let todaydate = new Date();
        let today = todaydate.getFullYear() + "-" + (todaydate.getMonth() + 1) + "-" + todaydate.getDate();
        console.log(today)
        let elements = {
            "nom_cue": req.body.nombre,
            "fec_ini": req.body.date,
            "fec_fin": today,
            "id_bpr": req.body.element.toString(),
            "id_gru": req.body.group.toString()
        }
        console.log(elements)
        conn.query('insert into ecuestionario set ?', elements, (err2, elementos) => {
            if (err2) console.log("ERROR 2 ", err2)
            res.redirect('/web/cuestionarios');
        });
        if (err) console.log("ERROR 1 ", err)
    });
    }
    
});

/*router.post('/web/AddQuizz', (req, res) => {
  
    req.app.locals.layout = 'profesor';
    req.getConnection((err, conn) => {
        let todaydate = new Date();
        let today = todaydate.getFullYear() + "-" + (todaydate.getMonth() + 1) + "-" + todaydate.getDate();
        let elements = {
            "nom_cue": req.body.nombre,
            "fec_ini": req.body.date,
            "fec_fin": today,
            "id_bpr": req.body.element.toString(),
            "id_gru": req.body.group.toString()
        }
        conn.query('insert into ecuestionario set ?', elements, (err2, elementos) => {
            if (err2) console.log("ERROR 2 ", err2)
            res.redirect('/web/cuestionarios');
        });
        if (err) console.log("ERROR 1 ", err)
    });
});*/



router.get('/web/viewQuestions', (req, res) => {
    if (req.session.usuario) {
        const id_tus = req.session.usuario.id_tus;
        if (id_tus === 3 || id_tus === 4 || id_tus === 5) {
            req.app.locals.layout = 'profesor';
            req.getConnection((err, conn) => {
                viewquestions(conn, (quizz) => {
                    res.render('profesor/VerCuestionarios', { quizz: quizz })
                })

            });
        } else {
            res.redirect("/web");
        }
    } else {
        res.redirect("/web");
    }
});

function viewquestions(conn, callback) {
    let quizzFinal = [];
    let question;
    conn.query('select * from ecuestionario', (err, quizz) => {
        quizz.forEach(element => {
            question = element.id_bpr.split(',');
            let qf = []
            qf = question
            let cont = 0; 
           for(let i = 0; i<question.length; i++){
                for(let j = 0; j<question.length; j++){
                    if(question[i] == question[j]){
                        if(cont > 0){
                            qf.splice(j,1)
                        }
                        cont++;
                    } 
                }

                cont = 0;
           }
            returnQuestionasQuestionaire(conn, question, questions => {
                let json = {
                    "id_cue": element.id_cue,
                    "nom_cue": element.nom_cue,
                    "fec_ini": element.fec_ini, 
                    "fec_fin": element.fec_fin,
                    "questions": questions
                }
                quizzFinal.push(json); 
                questions = []; 
            });

        });
        setTimeout(() => {
            callback(quizzFinal);
        }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
    });
}
function returnQuestionasQuestionaire(conn, question, callback) {
    let questions = [];
   
    for (let i = 0; i < question.length; i++) {
        conn.query("select * from mbancopreguntas where id_bpr = ?", question[i], (err, preg) => {
            if (err) console.log("ERRORR")
            questions.push(preg[0]);
        })
    }
    
    setTimeout(() => {
        callback(questions);
    }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
}
router.get("/web/Quizz", (req, res) => {
    req.session.quizz = undefined;
    if (req.session.usuario) {
        req.app.locals.layout = 'alumno';
        if (req.session.usuario.id_tus === 1) {
            if(req.session.usuario.id_gru){
                req.getConnection((err, conn) => {
                    const id_us = req.session.usuario.id_usu;
                    conn.query("select * from eusuariosgrupo where id_usu = ?", id_us, (err, group) => {
                        returnQuestionAlumno(conn, id_us, group, (quizz) => {
                            res.render('alumno/cuestionario', { quizz: quizz })
                        })
                    })

                });
            }else{
                res.redirect('/web');
            }
        } else {
            res.redirect("/web");
        }
    } else {
        res.redirect("/web");
    }
});
router.post("/web/Quizz", (req, res) => {
 
    if (req.session.usuario) {
        if (req.session.usuario.id_tus === 1) {
            req.app.locals.layout = 'alumno';
            req.session.quizz = req.body.quizz
            res.redirect("/web/Quizz/solve")
        } else {
            res.redirect("/web")
        }
    } else {
        res.redirect("/web")
    }
});
router.get("/web/Quizz/solve", (req, res) => {
    const id_cue = req.session.quizz
    if (req.session.usuario) {
        if (req.session.usuario.id_tus == 1) {
            if (id_cue) {
                req.app.locals.layout = 'alumno';
                req.getConnection((err, conn) => {
                    conn.query("select * from ecuestionario where id_cue = ?", id_cue, (err2, quizz) => {
                        if (err2) console.log("ERROR AL ARROJAR QUiZZ ", err2)
                        returnQuizzAlumno(conn, quizz[0], (quiz) => {
                            req.session.questions = quiz[0].questions;
                            res.render("alumno/ContestarQuizz", { quizz: quiz, id_cue: id_cue })
                        });
                    });
                });
            } else {
                res.redirect("/web");
            }
        } else {
            res.redirect("/web");
        }
    } else {
        res.redirect("/web");
    }
});

function returnQuizzAlumno(conn, quizz, callback) {
    let quizzFinal = []
    let cont = 0;
    id_bpr = quizz.id_bpr.split(',');
    let qf = [];
    qf = id_bpr;
    for (let i = 0; i < id_bpr.length; i++) {
        for (let j = 0; j < id_bpr.length; j++) {
            if (id_bpr[i] == id_bpr[j]) {
                if (cont > 0) {
                    qf.splice(j, 1)
                }
                cont++;
            }
        }
        cont = 0;
    }
    returnQuestionasQuestionaire(conn, qf, (preguntas) => {
        let json = {
            "id_cue": quizz.id_cue,
            "nom_cue": quizz.nom_cue,
            "fec_ini": quizz.fec_ini,
            "fec_fin": quizz.fec_fin,
            "questions": preguntas
        }
        quizzFinal.push(json);
    })

    setTimeout(() => {
        callback(quizzFinal);
    }, 0 | Math.random() * (.3 - .2) + .2 * 1000);

}

function returnQuestionAlumno(conn, id_us, group, callback) {
    let id_bpr;
    let qs = [];
    conn.query("select * from ecuestionario", (err, ques) => {
        ques.forEach(element => {
            cuestionarioContestado(conn, element.id_cue, id_us, (bool) => {
                if (bool) {
                    id_bpr = element.id_gru.split(',');
                    for (let i = 0; i < id_bpr.length; i++) {
                        if (id_bpr[i] == group[0].id_gru) {
                            qs.push(element);
                            break;
                        }
                    }
                }
            })

        });

        setTimeout(() => {
            callback(qs);
        }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
    })
}

function cuestionarioContestado(conn, id_cue, id_us, callback) {
    let bool = false;
    conn.query("select * from dpuntajealumnocuestionario where id_cue = ? and id_usu = ?", [id_cue, id_us], (err, rows) => {
        if (err) console.log("Error de dpuntaje ", err);
        
        if (rows.length < 1) {
            bool = true
        }
        setTimeout(() => {
            callback(bool);
        }, 0 | Math.random() * (.3 - .2) + .2 * 100);
    });
}

router.post("/web/resultadosQuizz", (req, res) => {
    const respuestas = req.body;
    const id_cue = req.session.quizz;
    const questions = req.session.questions;
    console.log("QUESTIONS ", questions)
    if (id_cue) {
        let res_cor = [];
        let res_incor = [];
        let cont = 0;
        req.app.locals.layout = 'alumno';
        for (k in respuestas) {
            if (respuestas[k] == questions[cont].res_cor) {
                res_cor.push(questions[cont].id_bpr);
            } else {
                res_incor.push(questions[cont].id_bpr);
            }
            cont += 1;
        }

        req.getConnection((err, conn) => {
            let json = {
                "id_usu": req.session.usuario.id_usu,
                "id_cue": req.session.quizz,
                "id_pco": res_cor.toString(),
                "id_pin": res_incor.toString()
            }
            conn.query("insert into dpuntajealumnocuestionario set ? ", json, (err, ban) => {
                if (err) console.log('el error al insertar las respuestas:', err)
                res.redirect("/web/Quizz/puntaje");
            });
        });
    } else {
        res.redirect("/web")
    }

});

router.get('/web/Quizz/puntaje', (req, res) => {
    const id_cue = req.session.quizz;
    const id_usu = req.session.usuario.id_usu;
    const questions = req.session.questions;
    if (req.session.usuario.id_tus == 1) {
        req.app.locals.layout = 'alumno';
        if (id_cue) {
            req.getConnection((err, conn) => {
                conn.query("select * from dpuntajealumnocuestionario  natural join ecuestionario where id_cue = ? and id_usu = ?", [id_cue, id_usu], (err, puntaje) => {
                    if (err) console.log(err)
                    req.session.quizz = undefined;
                    req.session.questions = undefined;
                    compararquizz(questions, puntaje[0], (qf) => {

                        questionarioFinal = correctas(qf); 
                        console.log("FINAL ",questionarioFinal)
                        res.render("alumno/puntajecuestionario", { qf: questionarioFinal })
                    })

                });
            })
        } else {
            res.redirect("/web")
        }
    } else {
        res.redirect("/web")
    }
});
function correctas(qf){
    let questionarioFinal = []; 
    qf.forEach(element=>{
        if(element.res_cor == 'a'){
            element.a = true;
        }else if(element.res_cor == 'b'){
            element.b = true;
        }else if(element.res_cor == 'c'){
            element.c = true;
        }else{
            element.d = true;
        }
        questionarioFinal.push(element)
    })
    return questionarioFinal; 
}
function compararquizz(questions, puntaje, callback) {
    let qf = questions;
    res_cor = puntaje.id_pco.split(',');
    res_incor = puntaje.id_pin.split(',');
    let cont = 0;
    questions.forEach(element => {
        for (let i = 0; i < res_cor.length; i++) {
            if (element.id_bpr == res_cor[i]) {
                qf[cont].correct = true;
            }
        }
        for (let i = 0; i < res_incor.length; i++) {
            if (element.id_bpr == res_incor[i]) {
                qf[cont].correct = false;
            }
        }
        cont++;

    });
    setTimeout(() => {
        callback(qf);
    }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
}


/*-------------------------------------FIN DE CUESTIONARIO--------------------------------------------*/
/*--------------------------------------CALIFICACIONES------------------------------------------------*/

router.get('/web/calificacionesgrupo', (req, res) => {
    if (req.session.usuario.id_tus == 3) {
        req.app.locals.layout = 'profesor'
        req.getConnection((err, conn) => {
            conn.query('select * from eusuariosgrupo natural join cgrupo where id_usu = ?', (req.session.usuario.id_usu), (err, grupos) => {
                if (err) console.log("ERROR EN CONSULTA DE GRUPOS", err)
                    //conn.query('select * from eusuariosgrupo where id_usu =?', (req.session.usuario.id_usu), (err3,grupos)=>{
                    //  if(err3) console.log("ERROR 3", err3)
                    //retornarcuestionariosprofesor(conn,grupos, (cuestionariosF)=>{

                res.render("profesor/calificacionesxgrupo", { grupos: grupos /*, cuestionario:cuestionariosF*/ })
                    //})
                    //})
            });
        });
    } else {
        res.redirect("/web")
    }
})

function retornarcuestionariosprofesor(conn, grupos, callback) {
    let cuestionariosF = [];
    conn.query('select * from ecuestionario', (err2, cuestionarios) => {
        if (err2) console.log("EEROR2")
        cuestionarios.forEach(element => {
            let grupos2 = element.id_gru.split(',');
            grupos.forEach(grupo => {
                for (let i = 0; i < grupos2.length; i++) {
                    if (grupo.id_gru == grupos2[i]) {
                        cuestionariosF.push(element);
                        break;
                    } else {
                        break;
                    }
                }
            })
        });
        console.log("CUestionarios ", cuestionariosF)

        setTimeout(() => {
            callback(cuestionariosF);
        }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
    });
}

router.post('/web/calificacionesgrupo', (req, res) => {
    if (req.session.usuario.id_tus == 3) {
        req.app.locals.layout = 'profesor'
        req.getConnection((err, conn) => {
            console.log(req.body)
            const grupo = req.body.grupo;
            const cuest = req.body.cuestionario;
            if (!cuest) {
                conn.query("select * from dpuntajealumnocuestionario natural join ecuestionario natural join musuario ", (err2, puntajes) => {
                    calificacionesxgrupo(conn, puntajes, req.session.usuario.id_usu, grupo, (puntajesF) => {          
                            validargrupo(puntajesF,conn,grupo,(puntajesFF)=>{
                                const calificaciones = sacarcalificacion(puntajesFF, cuest);
                                res.json({ calificaciones: calificaciones[0], cuestionarios: calificaciones[1] })
                            })
                    })
                });
            } else {
                conn.query("select * from dpuntajealumnocuestionario natural join ecuestionario natural join musuario where id_cue = ?", (parseInt(cuest)), (err2, puntajes) => {
                    calificacionesxgrupo(conn, puntajes, req.session.usuario.id_usu, grupo, (puntajesF) => {
                        validargrupo(puntajesF,conn,grupo,(puntajesFF)=>{
                            const calificaciones = sacarcalificacion(puntajesFF, cuest);
                            res.json({ calificaciones: calificaciones[0], cuestionarios: calificaciones[1] })
                        })
                    })

                });
            }
        });
    }
});

function calificacionesxgrupo(conn, puntajes, usuario, grupo, callback) {
    conn.query("select * from eusuariosgrupo natural join cgrupo where id_usu =? and id_gru = ?", [usuario, parseInt(grupo)], (err, groups) => {
        if (err) console.log("ERROR EN CALIFICACIONES 2", err)
        let puntajesF = [];
        let bool = false;
        let arraysgrupo = []
        groups.forEach(grupoo => {
            arraysgrupo.push(grupoo.nom_gru);
            puntajes.forEach(element => {
                let grupos = element.id_gru.split(',');
                if (puntajesF.length > 0) {
                    for (let j = 0; j < puntajesF.length; j++) {
                        if (puntajesF[j] == element) {
                            bool = true;
                            break;
                        } else {
                            bool = false;
                        }
                    }
                }
                if (!bool) {
                    for (let i = 0; i < grupos.length; i++) {
                        if (grupos[i] == grupoo.id_gru) {
                            puntajesF.push(element)
                            break;
                        }
                    }
                }
            });
        });
    
        setTimeout(() => {
            callback(puntajesF);
        }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
    });
}

async function validargrupo(puntajesF,conn,grupo, callback){
    puntajesFF = [];
    await puntajesF.forEach(element=>{
    conn.query('select * from eusuariosgrupo where id_usu = ?',element.id_usu, (err,gru)=>{
        if(err) console.log("ERROR",err)
        if(gru.length>0){
            if(gru[0].id_gru == grupo){
                puntajesFF.push(element)
            }else{
                console.log("ENTRA AQUI")
            } 
        }else{
            console.log("No pertenece al grupo")
        }
    }); 
    })
    setTimeout(() => {
        callback(puntajesFF);
    }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
}

function sacarcalificacion(puntaje, cuest) {
    calificaciones = [];
    cuestionarios = []
    let json2 = {}
    puntaje.forEach(element => {
        let correctas = element.id_pco.split(',');
        let incorrectas = element.id_pin.split(',');
        let calificacion;
        if (correctas[0] == '') {
            correctas = correctas.splice(0, 0);
        }
        if (incorrectas[0] == '') {
            incorrectas = incorrectas.splice(0, 0);
        }
        calificacion = (correctas.length * 10 / (correctas.length + incorrectas.length));
        calificacion = trunc(calificacion, 2); 
        let json = {
            "nom_cue": element.nom_cue,
            "nom_usu": element.nom_usu,
            "calificacion": calificacion
        }
        if (!cuest) {
            if (cuestionarios.length == 0) {
                json2 = {
                    "id_cue": element.id_cue,
                    "nom_cue": element.nom_cue
                }
                cuestionarios.push(json2)
            } else {
                for (let i = 0; i < cuestionarios.length; i++) {
                    if (element.id_cue == cuestionarios[i].id_cue) {
                        break;
                    } else {
                        json2 = {
                            "id_cue": element.id_cue,
                            "nom_cue": element.nom_cue
                        }
                        cuestionarios.push(json2)
                        break;
                    }
                }
            }
        }
        calificaciones.push(json);
    });
    return [calificaciones, cuestionarios];
}
function trunc (x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
  }
  

router.get('/web/calificaciones', (req, res) => {
    if (req.session.usuario.id_usu) {
        req.app.locals.layout = 'alumno';
        if(req.session.usuario.id_gru){
            req.getConnection((err, conn) => {
                conn.query("select * from dpuntajealumnocuestionario natural join musuario natural join ecuestionario where id_usu=?", (req.session.usuario.id_usu), (err2, rows) => {
                    let calificacion = sacarcalificacion(rows, undefined);
                    let promedio = promedios(calificacion[0])
                    console.log(calificacion[0])
                    res.render('alumno/calificaciones', { calificaciones: calificacion[0], promedio: promedio })
                })
            });
        }else{
            res.redirect('/web')//SUERTE
        }
    } else {
        res.redirect('/web')
    }

})

function promedios(calificacion) {
    let sum = 0;
    calificacion.forEach(element => {
        sum += element.calificacion;
    })
    let promedio = sum / calificacion.length;
    if (promedio <= 5) {
        return promedio + "\n (DBERÍAS ESTUDIAR MÁS. Revisa la sección de apoyo)";
    } else if (promedio < 7 && promedio > 5) {
        return promedio + "\n(Puedes hacerlo mejor. Revisa la sección de apoyo)";
    } else if (promedio >= 8 && promedio < 9) {
        return promedio + "\n(Vas bien, pero puedes hacerlo mejor. Revisa la sección de apoyo)";
    } else if(promedio == "" || promedio == undefined || isNaN(promedio)){
     
    }else{    
        return promedio + "\n MUY BIEN!";
    }

}

/*------------------------------------FIN DE CALIFICACIONES-------------------------------------------*/
/* 
 * Inicio de autoridad
 */

router.get('/web/vergrupos', (req, res) => {
    if (req.session.usuario.id_tus == 4) {
        req.app.locals.layout = 'autoridad';
        req.getConnection((err, conn) => {
            retornaGruposAutoridad(conn, (grupos) => {
                conn.query('select * from musuario where id_tus = 3 or id_tus = 4', (err, profesores) => {
                    res.render('autoridad/grupos', { grupos, usuario: req.session.usuario, profesores });
                });
            });
        });
    }
});
/*------------------------------------FIN DE CALIFICACIONES-------------------------------------------*/
/* 
 * I nicio de autoridad
 */

router.get('/web/vergrupos', (req, res) => {
    if (req.session.usuario.id_tus == 4) {
        req.app.locals.layout = 'autoridad';
        req.getConnection((err, conn) => {
            retornaGruposAutoridad(conn, (grupos) => {
                conn.query('select * from musuario where id_tus = 3 or id_tus = 4', (err, profesores) => {
                    res.render('autoridad/grupos', { grupos, usuario: req.session.usuario, profesores });
                });
            });
        });
    } else if (req.session.usuario.id_tus == 5) {
        req.app.locals.layout = 'Administrador2';
        req.getConnection((err, conn) => {
            retornaGruposAutoridad(conn, (grupos) => {
                conn.query('select * from musuario where id_tus = 3 or id_tus = 4', (err, profesores) => {
                    res.render('admin/gruposGenerales', { grupos, usuario: req.session.usuario, profesores });
                });
            });
        });
    } else {
        res.redirect('/web');
    }
});

router.post('/web/takeAutorityGroup', (req, res) => {
    req.getConnection((err, conn) => {
        retornaGruposAutoridad(conn, (grupos) => {
            res.json(grupos);
        });
    });
});

function retornaGruposAutoridad(conn, callback) {
    let grupoFinal = [],
        profesor = '';
    conn.query('select * from cgrupo order by nom_gru asc', (err, grupos) => {
        grupos.forEach(grupo => {
            conn.query('select * from eusuariosgrupo natural join musuario where (id_gru = ? and (id_tus = 3 or id_tus = 4))', grupo.id_gru, (err, profesorGrupo) => {
                if (profesorGrupo.length > 0) {
                    profesor = profesorGrupo[0].nom_usu
                } else {
                    profesor = null;
                }
                let json = {
                    'id_gru': grupo.id_gru,
                    'nom_gru': grupo.nom_gru,
                    'cla_gru': grupo.cla_gru,
                    'prof_gru': profesor
                }
                grupoFinal.push(json);
            });
        });
        setTimeout(() => {
            callback(grupoFinal);
        }, 0 | Math.random() * (.3 - .2) + .2 * 1000);
    });
}

router.get('/web/ver_reportes_general', (req, res) => {
    if (req.session.usuario.id_tus === 4) {
        req.app.locals.layout = 'autoridad';
        req.getConnection((err, conn) => {
            conn.query('select * from cgrupo order by nom_gru', (err, grupos) => {
                conn.query('select * from ecuestionario order by fec_fin desc', (err, cuestionarios) => {
                    conn.query('select * from ctemas order by nom_tem', (err, temas) => {
                        res.render('autoridad/reportes', { grupos, cuestionarios, temas });
                    });
                });
            });
        });
    } else if (req.session.usuario.id_tus === 5) {
        req.app.locals.layout = 'Administrador2';
        req.getConnection((err, conn) => {
            conn.query('select * from cgrupo order by nom_gru', (err, grupos) => {
                conn.query('select * from ecuestionario order by fec_fin desc', (err, cuestionarios) => {
                    conn.query('select * from ctemas order by nom_tem', (err, temas) => {
                        res.render('autoridad/reportes', { grupos, cuestionarios, temas });
                    });
                });
            });
        });
    } else {
        res.redirect('/web');
    }


});

/*------------------------------------Fin de autoridad-------------------------------------------------*/

router.get('/web/curp_cifrar:id_usuario', (req, res) => {
    let id = req.params.id_usuario;
    req.getConnection((err, conn) => {
        conn.query('select * from musuario where id_usu = ?', id, (err, usuario) => {
            if (usuario.length > 0) {
                conn.query('update musuario set curp_usu = ? where id_usu = ?', [cifrado.cifrar(usuario[0].curp_usu), id], (err, state) => {
                    res.json(state);
                });
            } else {
                res.json(id);
            }
        });
    });
});

router.get('/web/obtenerCurp:id', (req, res) => {
    let id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('select * from musuario where id_usu = ?', id, (err, usuario) => {
            res.json(cifrado.desencriptar(usuario[0].curp_usu));
        });
    });
});

function generarToken(id_usu) {
    req.getConnection((err, conn) => {
        token.generar(tok => {
            conn.query('update musuario set tok_usu = ? where id_usu = ?', [cifrado.cifrar(tok), id_usu], (err, estado) => { //ya funciona??8
                if (estado) console.log(estado);
            });
        });

    });
}
//SET FOREIGN_KEY_CHECKS = 0;
module.exports = router;