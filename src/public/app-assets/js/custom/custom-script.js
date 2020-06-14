
let enviar=document.getElementById('sendprex'); 
 
function retrono(){
  let pre=  document.getElementById('latex-pregunta').value
  let res_cor=  document.getElementById('res_cor').value
  let opc_a=document.getElementById('latex-opcA').value
  let opc_b=document.getElementById('latex-opcB').value
  let opc_c=document.getElementById('latex-opcC').value
  let opc_d= document.getElementById('latex-opcD').value
  let id_tem= document.getElementById('tema').value
  let id_dif= document.getElementById('dificultad').value

    /*-----------------------------*/

    let vpre=validarPre(pre);
    if(vpre==true){
        document.getElementById('apre').innerHTML=""; 
        let vopc_a=validarPreOPC(opc_a);
        if(vopc_a==true){
            document.getElementById('aopc_a').innerHTML=""; 
            let vopc_b=validarPreOPC(opc_b);
            if(vopc_b==true){
                document.getElementById('aopc_b').innerHTML=""; 
                let vopc_c=validarPreOPC(opc_c);
                if(vopc_c==true){
                    document.getElementById('aopc_c').innerHTML=""; 
                    let vopc_d=validarPreOPC(opc_d);
                    if(vopc_d==true){
                        document.getElementById('aopc_d').innerHTML=""; 
                        let vtem= validarTem(id_tem);
                        if(vtem==true){
                            document.getElementById('atem').innerHTML=""; 
                            let vdif=validarDif(id_dif);
                            if(vdif==true){
                                document.getElementById('adif').innerHTML=""; 
                                carga2();
                                
                            }else{
                                document.getElementById('adif').innerHTML=""; 
                                return false;
                            }
                        }else{
                            document.getElementById('atem').innerHTML=vtem; 
                            return false;
                        }
                    }else{
                        document.getElementById('aopc_d').innerHTML=vopc_d; 
                        return false;
                    }
                }else{
                    document.getElementById('aopc_c').innerHTML=vopc_c; 
                    return false;
                }
            }else{
                
                document.getElementById('aopc_b').innerHTML=vopc_b; 
                return false;
            }
        }else{
            document.getElementById('aopc_a').innerHTML=vopc_a; 
            return false;
        }
    }else{
        document.getElementById('apre').innerHTML=vpre; 
        return false;
    }
}
    

function validarPre(pre){
    if(pre.length>150||pre.length<1){
        return "*Nombre de la pregunta entre 1-150 caracteres"; 
    }else{
        return true; 
    } 
}
function validarPreOPC(opc_pre){
    if(opc_pre.length>50||opc_pre.length<1){
        return "*Inciso de la pregunta entre 1-50 caracteres"; 
    }else{
        return true; 
    } 
}
function validarTem(tem){
    if(tem!='1'&& tem!='2'&& tem!='3'&& tem!='4'){
        console.log('*Tema invalido'); 
    }else{
        return true; 
    } 
}
function validarDif(dif){
    if(dif!='1'&&dif!='2'&&dif!='3'){
        console.log('*Dificultad invalida'); 
    }else{
        return true; 
    } 
}
enviar.addEventListener('click', (e)=>{
    if(!retrono()){
        e.preventDefault(); 
    }
}, false); 





function barraBusqueda(id_barra, id_tabla) {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(id_barra);

    filter = input.value.toUpperCase();
    table = document.getElementById(id_tabla);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");

        if (td) {
            for (let j = 0; j < td.length; j++) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().includes(filter)) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

$(() => {
    $("#agregarusuajax").on("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(document.getElementById("agregarusuajax"));

        //formData.append(f.attr("name"), $(this)[0].files[0]);
        $.ajax({
            url: `/web/registrar_ajax`,
            method: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(res) {
            M.toast({ html: res, classes: 'rounded' });
            mostrarUsuarios();
        });
    }); //como desglosa el form data

});

function registroUsuarios2() {
    $("#agregarusuajax").on('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(document.getElementById('agregarusuajax'))
        $.ajax({
            url: `/web/registrar_ajax`,
            method: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(res) {
            M.toast({ html: res, classes: 'rounded' });
            mostrarUsuarios();
        }); //aqui se necesita el id_usu


    });
}

function mostrarAlumnos(id_gru) {
    $.ajax({
        url: `/web/getAlumnosGrupo`,
        method: 'POST',
        data: {
            id_gru: id_gru
        },
        success: (alumnos) => {
            let tbody = $('#tabla_alumnos');
            let n = 1;
            tbody.html('');
            alumnos[0].forEach(alumno => {
                console.log(alumno);
                tbody.append(`
                    <tr>
                        <td>${n}</td>
                        <td>${alumno.nom_usu}</td>
                        <td><a href="javascript:void(0);" class="waves-effect waves-teal btn-flat" onclick="eliminarAlumnoGrupo(${alumno.id_ugr}, ${alumno.id_gru}, ${alumno.id_prof})">Eliminar del grupo</a></td>
                    </tr>
                `);
                n++;
            });
        }
    });
}
function mostrarPregun(id_gru) {
    $.ajax({
        url: `/web/getAlumnosGrupo`,
        method: 'POST',
        data: {
            id_gru: id_gru
        },
        success: (alumnos) => {
            let tbody = $('#tabla_alumnos');
            let n = 1;
            tbody.html('');
            alumnos[0].forEach(alumno => {
                console.log(alumno);
                tbody.append(`
                    <tr>
                        <td>${n}</td>
                        <td>${alumno.nom_usu}</td>
                        <td><a href="javascript:void(0);" class="waves-effect waves-teal btn-flat" onclick="eliminarAlumnoGrupo(${alumno.id_ugr}, ${alumno.id_gru}, ${alumno.id_prof})">Eliminar del grupo</a></td>
                    </tr>
                `);
                n++;
            });
        }
    });
}

function eliminarAlumnoGrupo(id_ugr, id_gru, id_prof) {
    $.ajax({
        url: `/web/deleteAlumnoGrupo`,
        method: 'POST',
        data: {
            id_ugr: id_ugr
        },
        success: (response) => {
            M.toast({ html: response, classes: 'rounded' });
            mostrarAlumnos(id_gru);
            verGruposProfesor(id_prof);
        }
    });
}


function verGruposProfesor(id_prof) {
    $.ajax({
        url: `/web/verGruposProfesor`,
        method: 'POST',
        data: {
            id_prof: id_prof
        },
        success: (gruposFin) => {
            let tbody = $('#tabla_grupos');
            tbody.html('');
            gruposFin.forEach(grupo => {
                if (grupo.cla_gru == null) {
                    grupo.cla_gru = '';
                }
                tbody.append(`
                    <tr>
                        <td>${grupo.nom_gru}</td>
                        <td contenteditable="true" id="clave${grupo.id_gru}">${grupo.cla_gru}</td>
                        <td>${grupo.num_alu}</td>
                        <td><a href="javascript:void(0);" class="waves-effect waves-teal btn-flat">Modificar clave</a></td>
                        <td><a href="javascript:void(0);" onclick="mostrarAlumnos(${grupo.id_gru});" class="waves-effect waves-teal btn-flat">Ver alumnado</a></td>
                    </tr>
                `);
            });
        }
    });
}

function modificarClaveGrupo(id_gru, clave) {
    $.ajax({
        url: `/web/modificarClaveGrupo`,
        method: 'POST',
        data: {
            id_gru: id_gru,
            clave: clave
        },
        success: (response) => {
            M.toast({ html: response, classes: 'rounded' });
        }
    });
}


function modificarUsuario(id_usu, nom_usu, cor_usu) {
    $.ajax({
        url: `/web/modificarUsuarioAjax`,
        method: 'POST',
        data: {
            id_usu: id_usu,
            nom_usu: nom_usu,
            cor_usu: cor_usu
        },
        success: (response) => {
            M.toast({ html: response, classes: 'rounded' });
        }
    });
}

function ConsultarPregunta(id_tem, id_dif) {
    $.ajax({
        url: `/web/preguntasx`,
        method: 'POST',
        data: {
            id_tem: id_tem,
            id_dif: id_dif
        },
        success: (response) => {
            M.toast({ html: response, classes: 'rounded' });
        }
    });
}

function eliminarUsuario(id_usu) {
    $.ajax({
        url: `/web/eliminarUsuarioAjax`,
        method: 'POST',
        data: {
            id_usu: id_usu
        },
        success: (response) => {
            M.toast({ html: response, classes: 'rounded' });
            mostrarUsuarios();
        }
    });
}

function AgregarUsuarioAjax(nom_usu, app_usu, id_tus, cor_usu, pas_usu) {
    $.ajax({
        url: `/web/registrar_ajax`,
        method: 'POST',
        data: {
            nom_usu: nom_usu,
            app_usu: app_usu,
            id_tus: id_tus,
            cor_usu: cor_usu,
            pas_usu: pas_usu,
            id_usu: 1
        },
        success: (response) => {
            console.log(nom_usu);
            M.toast({ html: response, classes: 'rounded' });
            mostrarUsuarios();
        }
    });
}

function addPre(con_pre,res_cor, opc_a, opc_b, opc_c, opc_d,id_tem,id_dif) {
    $.ajax({
        url: `/web/Addquestion`,
        method: 'POST',
        data: { 
            con_pre: con_pre,
            res_cor: res_cor,
            opc_a: opc_a,
            opc_b: opc_b,
            opc_c: opc_c,
            opc_d: opc_d,
            id_tem: id_tem,
            id_dif: id_dif

        },
        success: (response) => {
            
            M.toast({ html: response, classes: 'rounded' }).de;
            mostrarPreguntas(-1);
        }
    });
}


function mostrarUsuarios(id_usu) {
    $.ajax({
        url: `/web/getUsuariosAjax`,
        method: 'POST',
        data: {
            id_usu: id_usu
        },
        success: (ListaFinal) => {
            console.log(ListaFinal);
            let tbody = $('#tabla_usu');
            let valor;
            tbody.html('');
            ListaFinal.forEach(usuario => {
                console.log(usuario.nom_usu);
                if (usuario.id_tus == 1) {
                    valor = "Alumno";
                } else if (usuario.id_tus == 2) {
                    r = "Tutor";
                } else if (usuario.id_tus == 3) {
                    valor = "Profesor";
                } else if (usuario.id_tus == 4) {
                    valor = "Autoridad";
                } else {
                    valor = "Administrador";
                }
                tbody.append(`
                        <tr>
                       
                            <td contenteditable="true" id="nom_usu${usuario.id_usu}">${usuario.nom_usu}</td>
                            <td contenteditable="true" id="cor_usu${usuario.id_usu}">${usuario.cor_usu}</td>
                            <td>${valor}</td>
                            <td>
                            <a href="javascript:void(0);" onclick="modificarUsuario(${usuario.id_usu}, document.getElementById('nom_usu${usuario.id_usu}').innerText,document.getElementById('cor_usu${usuario.id_usu}').innerText);" class="waves-effect waves-teal btn-flat">Modificar</a>
                            </td>
                            <td>
                            <a href="javascript:void(0);" onclick="eliminarUsuario(${usuario.id_usu});" class="waves-effect waves-teal btn-flat">Eliminar</a>
                            </td>
                        </tr>
                `);

            });
        }
    });
}




$(() => {
    $("#formuploadajax").on("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(document.getElementById("formuploadajax"));
        //formData.append(f.attr("name"), $(this)[0].files[0]);
        $.ajax({
            url: "/web/insertarApoyo",
            method: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(res) {
            M.toast({ html: res, classes: 'rounded' });
            mostrarApoyos(-1);
        });
    });
    $('#modificar_apoyo_ventana').on("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(document.getElementById('modificar_apoyo_ventana'));
        formData.append('link',document.getElementById('url_ventana_muestra').textContent);

        $.ajax({
            url: "/web/updateApoyo",
            method: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done((res) => {
            M.toast({ html: res.aviso, classes: 'rounded' });
            mostrarApoyos(-1);
            setVentanaApoyos(res.pdf, res.url, res.tema, res.id);
        });
    });
});

function mostrarPreguntas(id_tem) {
    $.ajax({
        url: '/web/getPreguntasAjax',
        method: 'POST',
        data: {
            id_tem: id_tem
        }
    }).done((preguntas) => {
        let contenedor = $('#contenedor_preguntas');
        contenedor.html('');
        preguntas.forEach(pregunta => {
            contenedor.append(`
            <div class="col xl3 l6 m3 s12" style="height: 120px;" onclick="setVentanaPre(${pregunta.id_bpr},'${pregunta.con_pre}','${pregunta.opc_a}','${pregunta.opc_b}','${pregunta.opc_c}','${pregunta.opc_d}');
             document.getElementById('show').className = 'app-file-sidebar-info ps show';
             document.getElementById('show2').className = 'app-file-overlay show';">
                                    <div class="card box-shadow-none mb-1
                                        app-file-info">
                                        <div class="card-content">
                                            <div class="app-file-content-logo
                                                grey lighten-4">
                                                <div class="fonticon">
                                                    <i class="material-icons">more_vert</i>
                                                </div>
                                                
                                                <div
                                                class="app-file-recent-details">
                                                <div class="app-file-name
                                                    font-weight-700"><span class="mathquillEstatic">${pregunta.con_pre}</span></div>
                                            </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
            `);
        });
    });
}

$(function(){
    $('#broswequestion').on('submit', function (e){
        
	e.preventDefault();
        $.ajax({
            url:'/web/preguntasx',
            method:'POST',
            data:{
			id_tema:$('#broswtem').val(),
			id_dif:$('#broswdif').val()
			},
            	success:function(questions){

                    
                    document.getElementById('contenedor_preguntas').innerHTML="";
                    questions.forEach(id=>{
                        let html=`<div class="col xl3 l6 m3 s12" style="height: 120px;" onclick="setVentanaPre(${id.id_bpr},'${id.con_pre}','${id.opc_a}','${id.opc_b}','${id.opc_c}','${id.opc_d}');
                        document.getElementById('show').className = 'app-file-sidebar-info ps show';
                        document.getElementById('show2').className = 'app-file-overlay show';">
                        <div class="card box-shadow-none mb-1
                            app-file-info">
                            <div class="card-content">
                                <div class="app-file-content-logo
                                    grey lighten-4">
                                    <div class="fonticon">
                                        <i class="material-icons">more_vert</i>
                                    </div>
                                    
                                    <div
                                    class="app-file-recent-details">
                                    <div class="app-file-name
                                        font-weight-700"><span class="mathquillEstatic">${id.con_pre}</span></div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>`; 
                        document.getElementById('contenedor_preguntas').innerHTML+=html;
                    });
            }
        })
    })
});


function mostrarApoyos(id_tem) {
    $.ajax({
        url: '/web/getApoyosAjax',
        method: 'POST',
        data: {
            id_tem: id_tem
        }
    }).done((apoyos) => {
        let contenedor = $('#div_contenedor_apoyos');
        contenedor.html('');
        apoyos.forEach(apoyo => {
            contenedor.append(`
            <div class="col xl3 l6 m3 s6" style="height: 250px;">
                <div class="card box-shadow-none mb-1 app-file-info">
                    <div class="card-content">
                        <div class="app-file-content-logo grey lighten-4" onclick="setVentanaApoyos('${apoyo.nom_pdf}','${apoyo.vin_apo}','${apoyo.nom_tem}', ${apoyo.id_apo},'${apoyo.pdf_apo}');
                        document.getElementById('show').className = 'app-file-overlay show';
                        document.getElementById('show2').className = 'app-file-sidebar-info ps show'">
                            <div class="fonticon">
                                <i class="material-icons">more_vert</i>
                            </div>
                            <img class="recent-file" src="/app-assets/images/icon/pdf.png" height="38" width="30" alt="Card image cap">
                        </div>
                        <div class="app-file-details">
                            <div class="app-file-name font-weight-700">${apoyo.nom_tem}</div>
                            <div class="app-file-size">${apoyo.nom_pdf}</div>
                        </div>
                    </div>
                </div>
            </div>
            `);
        });
    });
}

function setVentanaApoyos2(pdf, url, tema, id,apo) {
    document.getElementById('pdf_ventana_muestra').textContent = pdf;
    document.getElementById('url_ventana_muestra').textContent = url;
    document.getElementById('tema_ventana_muestra').textContent = tema;
    document.getElementById('id_apoyo').value = id;
    document.getElementById('descarga').href = "/uploads/"+apo;
    document.getElementById('descarga').download = pdf;
    $('#btn_delete_ventana_apoyos').click(() => {
        deleteApoyo(id);
    });
}
function setVentanaApoyos(pdf, url, tema, id,apo) {
    document.getElementById('pdf_ventana_muestra').textContent = pdf;
    document.getElementById('url_ventana_muestra').textContent = url;
    document.getElementById('tema_ventana_muestra').textContent = tema;
    document.getElementById('id_apoyo').value = id;
    $('#btn_delete_ventana_apoyos').click(() => {
        deleteApoyo(id,apo);
    });
}


function deleteApoyo(id,apo) {
    $.ajax({
        url: '/web/deleteApoyoAjax',
        method: 'POST',
        data: {
            id_apoyo: id,
            pdf_apo:apo
        }
    }).done((res) => {
        M.toast({ html: res, classes: 'rounded' });
        document.getElementById('show').className = 'app-file-overlay';
        document.getElementById('show2').className = 'app-file-sidebar-info ps';
        mostrarApoyos(-1);
        

    });



    
}

function setVentanaPre(id_bpr,con_pre, opc_a, opc_b,opc_c, opc_d) {
    document.getElementById('con_pre').textContent = con_pre;
     document.getElementById('opc_a').textContent = opc_a;
    document.getElementById('opc_b').textContent = opc_b;
    document.getElementById('opc_c').textContent = opc_c;
    document.getElementById('opc_d').textContent = opc_d;
    document.getElementById('id_bpr').value = id_bpr;

     $('#btn_delete_ventana_pre').click(() => {
         //deletePre(id_bpre);
    });
 }


function carga(){
    let pre=  document.getElementById('latex-pregunta').value
  let res_cor=  document.getElementById('res_cor').value
  let opc_a=document.getElementById('latex-opcA').value
  let opc_b=document.getElementById('latex-opcB').value
  let opc_c=document.getElementById('latex-opcC').value
  let opc_d= document.getElementById('latex-opcD').value
  let id_tem= document.getElementById('tema').value
  let id_dif= document.getElementById('dificultad').value
    document.getElementById('hidem').click();
    addPre(pre,res_cor,opc_a,opc_b,opc_c,opc_d,id_tem,id_dif);
};
function carga2(){
    document.getElementById('hidem2').click();
};






// setVentanaPre(id_bpr,con_pre, opc_a, opc_b,opc_c, opc_d) {
function updatePre(id_bpr,con_pre,opc_a,opc_b,opc_c,opc_d) {
    $.ajax({
        url: '/web/updatePre',
        method: 'POST',
        data: {
            id_bpr:id_bpr,
            con_pre:con_pre,
            opc_a:opc_a,
            opc_b:opc_b,
            opc_c:opc_c,
            opc_d:opc_d
        },
        success: (res) => {
            M.toast({ html: res.aviso, classes: 'rounded' })
            setVentanaPre(res.id_bpr,res.con_pre, res.opc_a, res.opc_b,res.opc_c, res.opc_d);
            mostrarPreguntas(-1);
        }
    });

};

function obtenerAlumnos(id_gru) {
    $.ajax({
        url: '/web/getAlumnosGrupo',
        method: 'POST',
        data: {
            id_gru
        },
        success: (res) => {
            let array = [];
            if (id_gru != -1) {
                res[0].forEach(alumno => {
                    array.push([alumno.id_ugr, alumno.nom_usu]);
                    $('#alumnosSeleccionados').html('');
                    $('#menu_temas_seleccionados').css('display', 'inline-block');
                    $('#cuestionarioSeleccionado').html('');
                    if (res[0].indexOf(alumno) == (res[0].length - 1)) {
                        crearSelectMaterialize(array, 'alumnosSeleccionados', 'Todos los alumnos');
                        crearSelectMaterialize(res[1], 'cuestionarioSeleccionado', 'Todos los cuestionarios');
                    }
                });
            } else {
                $('#menu_temas_seleccionados').css('display', 'none');
                $('#cuestionarioSeleccionado').html('');
                crearSelectMaterialize(res[1], 'cuestionarioSeleccionado', 'Todos los cuestionarios');
            }
        }
    });
}
