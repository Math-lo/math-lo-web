
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
        let contenedor = $('#fg');
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
                                <div class="" id="prueba">
                                    
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
    let mod1=$('#ventanaMod1');
    mod1.html('');
    mod1.append(`<div class="row">
    <div class="input-field col s12" style="margin-bottom: 0px;">
        <p>Pregunta: 
      <span id='math-field-pregunta-mod${id_bpr}' style="width: 100%; min-height:40px; margin-bottom: 0px;">${con_pre}</span></p>
    </div>
    <div class="input-field col s12" style="margin-top: 0px;">
        <input id="latex-pregunta-mod${id_bpr}" type="text" name="pregunta" value="${con_pre}" readonly ">
    </div>
    <b><span class="label-input100" id="apre-mod"></span></b>
      
  </div>                     
                              </div>`);
let modTec1=$('#ventanaModTec1');
    modTec1.html('');
    modTec1.append(`<li>
    <div class="collapsible-header"><i class="material-icons">keyboard</i></div>
    <div class="collapsible-body text-reset">
        <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_sqrt" onclick="mathFieldSpanMod${id_bpr}.cmd('\\sqrt');
        mathFieldSpanMod${id_bpr}.focus();" style="width: 90px;">√</a>
        <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pm" onclick="mathFieldSpanMod${id_bpr}.cmd('\\pm');
        mathFieldSpanMod${id_bpr}.focus();" style="width: 90px;">∓</a>
        <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_mp" onclick="mathFieldSpanMod${id_bpr}.cmd('\\mp');
        mathFieldSpanMod${id_bpr}.focus();" style="width: 90px;">±</a>
        <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_frac" onclick="mathFieldSpanMod${id_bpr}.cmd('\\frac');
        mathFieldSpanMod${id_bpr}.focus();" style="width: 90px;">x/x</a>
        <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanMod${id_bpr}.cmd('^');
        mathFieldSpanMod${id_bpr}.focus();" style="width: 90px;">^</a>
        <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanMod${id_bpr}.cmd('\\cdot');
        mathFieldSpanMod${id_bpr}.focus();" style="width: 90px;">*</a>
    </div>
</li>`);
let mod2=$('#ventanaMod2');
mod2.html('');
mod2.append(`<div class="row">
<div class="input-field col s12" style="margin-bottom: 0px;">
<p>Opción A: 
<span id='math-field-opcA-mod${id_bpr}' style="width: 100%; min-height:40px; margin-bottom: 0px;">${opc_a}</span></p>
</div>
<div class="input-field col s12" style="margin-top: 0px;">
<input id="latex-opcA-mod${id_bpr}" type="text" name="a" value="${opc_a}" readonly ">
</div>
<b><span class="label-input100" id="aopc_a-mod"></span></b>
  
</div>                     
                          </div>`);
let modTec2=$('#ventanaModTec2');
modTec2.html('');
modTec2.append(`<li>
<div class="collapsible-header"><i class="material-icons">keyboard</i></div>
<div class="collapsible-body text-reset">
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_sqrt" onclick="mathFieldSpanAMod${id_bpr}.cmd('\\sqrt');
    mathFieldSpanAMod${id_bpr}.focus();" style="width: 90px;">√</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pm" onclick="mathFieldSpanAMod${id_bpr}.cmd('\\pm');
    mathFieldSpanAMod${id_bpr}.focus();" style="width: 90px;">∓</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_mp" onclick="mathFieldSpanAMod${id_bpr}.cmd('\\mp');
    mathFieldSpanAMod${id_bpr}.focus();" style="width: 90px;">±</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_frac" onclick="mathFieldSpanAMod${id_bpr}.cmd('\\frac');
    mathFieldSpanAMod${id_bpr}.focus();" style="width: 90px;">x/x</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanAMod${id_bpr}.cmd('^');
    mathFieldSpanAMod${id_bpr}.focus();" style="width: 90px;">^</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanAMod${id_bpr}.cmd('\\cdot');
    mathFieldSpanAMod${id_bpr}.focus();" style="width: 90px;">*</a>
</div>
</li>`);
let mod3=$('#ventanaMod3');
mod3.html('');
mod3.append(`<div class="row">
<div class="input-field col s12" style="margin-bottom: 0px;">
<p>Opción B: 
<span id='math-field-opcB-mod${id_bpr}' style="width: 100%; min-height:40px; margin-bottom: 0px;">${opc_b}</span></p>
</div>
<div class="input-field col s12" style="margin-top: 0px;">
<input id="latex-opcB-mod${id_bpr}" type="text" name="a" value="${opc_b}" readonly >
</div>
<b><span class="label-input100" id="aopc_b-mod"></span></b>
  
</div>                     
                          </div>`);
let modTec3=$('#ventanaModTec3');
modTec3.html('');
modTec3.append(`<li>
<div class="collapsible-header"><i class="material-icons">keyboard</i></div>
<div class="collapsible-body text-reset">
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_sqrt" onclick="mathFieldSpanBMod${id_bpr}.cmd('\\sqrt');
    mathFieldSpanBMod${id_bpr}.focus();" style="width: 90px;">√</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pm" onclick="mathFieldSpanBMod${id_bpr}.cmd('\\pm');
    mathFieldSpanBMod${id_bpr}.focus();" style="width: 90px;">∓</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_mp" onclick="mathFieldSpanBMod${id_bpr}.cmd('\\mp');
    mathFieldSpanBMod${id_bpr}.focus();" style="width: 90px;">±</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_frac" onclick="mathFieldSpanBMod${id_bpr}.cmd('\\frac');
    mathFieldSpanBMod${id_bpr}.focus();" style="width: 90px;">x/x</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanBMod${id_bpr}.cmd('^');
    mathFieldSpanBMod${id_bpr}.focus();" style="width: 90px;">^</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanBMod${id_bpr}.cmd('\\cdot');
    mathFieldSpanBMod${id_bpr}.focus();" style="width: 90px;">*</a>
</div>
</li>`);
let mod4=$('#ventanaMod4');
mod4.html('');
mod4.append(`<div class="row">
<div class="input-field col s12" style="margin-bottom: 0px;">
<p>Opción C: 
<span id='math-field-opcC-mod${id_bpr}' style="width: 100%; min-height:40px; margin-bottom: 0px;">${opc_c}</span></p>
</div>
<div class="input-field col s12" style="margin-top: 0px;">
<input id="latex-opcC-mod${id_bpr}" type="text" name="a" value="${opc_c}" readonly>
</div>
<b><span class="label-input100" id="aopc_c-mod"></span></b>
  
</div>                     
                          </div>`);
let modTec4=$('#ventanaModTec4');
modTec4.html('');
modTec4.append(`<li>
<div class="collapsible-header"><i class="material-icons">keyboard</i></div>
<div class="collapsible-body text-reset">
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_sqrt" onclick="mathFieldSpanCMod${id_bpr}.cmd('\\sqrt');
    mathFieldSpanCMod${id_bpr}.focus();" style="width: 90px;">√</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pm" onclick="mathFieldSpanCMod${id_bpr}.cmd('\\pm');
    mathFieldSpanCMod${id_bpr}.focus();" style="width: 90px;">∓</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_mp" onclick="mathFieldSpanCMod${id_bpr}.cmd('\\mp');
    mathFieldSpanCMod${id_bpr}.focus();" style="width: 90px;">±</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_frac" onclick="mathFieldSpanCMod${id_bpr}.cmd('\\frac');
    mathFieldSpanCMod${id_bpr}.focus();" style="width: 90px;">x/x</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanCMod${id_bpr}.cmd('^');
    mathFieldSpanCMod${id_bpr}.focus();" style="width: 90px;">^</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanCMod${id_bpr}.cmd('\\cdot');
    mathFieldSpanCMod${id_bpr}.focus();" style="width: 90px;">*</a>
</div>
</li>`);
let mod5=$('#ventanaMod5');
mod5.html('');
mod5.append(`<div class="row">
<div class="input-field col s12" style="margin-bottom: 0px;">
<p>Opción D: 
<span id='math-field-opcD-mod${id_bpr}' style="width: 100%; min-height:40px; margin-bottom: 0px;">${opc_d}</span></p>
</div>
<div class="input-field col s12" style="margin-top: 0px;">
<input id="latex-opcD-mod${id_bpr}" type="text" name="a" value="${opc_d}" readonly>
</div>
<b><span class="label-input100" id="aopc_d-mod"></span></b>
  
</div>                     
                          </div>`);
let modTec5=$('#ventanaModTec5');
modTec5.html('');
modTec5.append(`<li>
<div class="collapsible-header"><i class="material-icons">keyboard</i></div>
<div class="collapsible-body text-reset">
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_sqrt" onclick="mathFieldSpanDMod${id_bpr}.cmd('\\sqrt');
    mathFieldSpanDMod${id_bpr}.focus();" style="width: 90px;">√</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pm" onclick="mathFieldSpanDMod${id_bpr}.cmd('\\pm');
    mathFieldSpanDMod${id_bpr}.focus();" style="width: 90px;">∓</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_mp" onclick="mathFieldSpanDMod${id_bpr}.cmd('\\mp');
    mathFieldSpanDMod${id_bpr}.focus();" style="width: 90px;">±</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_frac" onclick="mathFieldSpanDMod${id_bpr}.cmd('\\frac');
    mathFieldSpanDMod${id_bpr}.focus();" style="width: 90px;">x/x</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanDMod${id_bpr}.cmd('^');
    mathFieldSpanDMod${id_bpr}.focus();" style="width: 90px;">^</a>
    <a class="btn waves-effect gradient-45deg-deep-orange-orange" id="btn_formula_pot" onclick="mathFieldSpanDMod${id_bpr}.cmd('\\cdot');
    mathFieldSpanDMod${id_bpr}.focus();" style="width: 90px;">*</a>
</div>
</li>`);

    let prueba = $('#prueba');
    prueba.html('');
    prueba.append(`
    
    <script>
    var mathFieldSpanMod${id_bpr} = document.getElementById('math-field-pregunta-mod${id_bpr}');
    var mathFieldSpanAMod${id_bpr} = document.getElementById('math-field-opcA-mod${id_bpr}');
    var mathFieldSpanBMod${id_bpr} = document.getElementById('math-field-opcB-mod${id_bpr}');
    var mathFieldSpanCMod${id_bpr} = document.getElementById('math-field-opcC-mod${id_bpr}');
    var mathFieldSpanDMod${id_bpr} = document.getElementById('math-field-opcD-mod${id_bpr}');



    var latexSpanAMod${id_bpr} = document.getElementById('latex-opcA-mod${id_bpr}');
    var latexSpanMod${id_bpr} = document.getElementById('latex-pregunta-mod${id_bpr}');
    var latexSpanBMod${id_bpr} = document.getElementById('latex-opcB-mod${id_bpr}');
    var latexSpanCMod${id_bpr} = document.getElementById('latex-opcC-mod${id_bpr}');
    var latexSpanDMod${id_bpr} = document.getElementById('latex-opcD-mod${id_bpr}');



    var MQ = MathQuill.getInterface(2); // for backcompat
    var mathFieldSpanMod${id_bpr} = MQ.MathField(mathFieldSpanMod${id_bpr}, {
    spaceBehavesLikeTab: true, // configurable
    handlers: {
        edit: function() { // useful event handlers
        latexSpanMod${id_bpr}.value = mathFieldSpanMod${id_bpr}.latex(); // simple API
        }
    }
    });
    var mathFieldSpanAMod${id_bpr} = MQ.MathField(mathFieldSpanAMod${id_bpr}, {
        spaceBehavesLikeTab: true, // configurable
        handlers: {
          edit: function() { // useful event handlers
            latexSpanAMod${id_bpr}.value = mathFieldSpanAMod${id_bpr}.latex(); // simple API
          }
        }
      });
      var mathFieldSpanBMod${id_bpr} = MQ.MathField(mathFieldSpanBMod${id_bpr}, {
        spaceBehavesLikeTab: true, // configurable
        handlers: {
          edit: function() { // useful event handlers
            latexSpanBMod${id_bpr}.value = mathFieldSpanBMod${id_bpr}.latex(); // simple API
          }
        }
      });
      var mathFieldSpanCMod${id_bpr} = MQ.MathField(mathFieldSpanCMod${id_bpr}, {
        spaceBehavesLikeTab: true, // configurable
        handlers: {
          edit: function() { // useful event handlers
            latexSpanCMod${id_bpr}.value = mathFieldSpanCMod${id_bpr}.latex(); // simple API
          }
        }
      });
      var mathFieldSpanDMod${id_bpr} = MQ.MathField(mathFieldSpanDMod${id_bpr}, {
        spaceBehavesLikeTab: true, // configurable
        handlers: {
          edit: function() { // useful event handlers
            latexSpanDMod${id_bpr}.value = mathFieldSpanDMod${id_bpr}.latex(); // simple API
          }
        }
      });
    </script>
    
    `);
    let prueba2 = $('#prueba2');
    prueba2.html('');
    prueba2.append(`
    <script>
function retronoMod(){
    
let pre_mod${id_bpr}=  document.getElementById('latex-pregunta-mod${id_bpr}').value
let res_cor_mod${id_bpr}=  document.getElementById('res_cor-mod').value
let opc_a_mod${id_bpr}=document.getElementById('latex-opcA-mod${id_bpr}').value
let opc_b_mod${id_bpr}=document.getElementById('latex-opcB-mod${id_bpr}').value
let opc_c_mod${id_bpr}=document.getElementById('latex-opcC-mod${id_bpr}').value
let opc_d_mod${id_bpr}= document.getElementById('latex-opcD-mod${id_bpr}').value
let id_tem_mod${id_bpr}= document.getElementById('tema-mod').value
let id_dif_mod${id_bpr}= document.getElementById('dificultad-mod').value
  

    /*-----------------------------*/

    let vpre=validarPre2(pre_mod${id_bpr});
    if(vpre==true){
        document.getElementById('apre-mod').innerHTML=""; 
        let vopc_a=validarPreOPC2(opc_a_mod${id_bpr});
        if(vopc_a==true){
            document.getElementById('aopc_a-mod').innerHTML=""; 
            let vopc_b=validarPreOPC2(opc_b_mod${id_bpr});
            if(vopc_b==true){
                document.getElementById('aopc_b-mod').innerHTML=""; 
                let vopc_c=validarPreOPC2(opc_c_mod${id_bpr});
                if(vopc_c==true){
                    document.getElementById('aopc_c-mod').innerHTML=""; 
                    let vopc_d=validarPreOPC2(opc_d_mod${id_bpr});
                    if(vopc_d==true){
                        document.getElementById('aopc_d-mod').innerHTML=""; 
                        let vtem= validarTem2(id_tem_mod${id_bpr});
                        if(vtem==true){
                            document.getElementById('atem-mod').innerHTML=""; 
                            let vdif=validarDif2(id_dif_mod${id_bpr});
                            if(vdif==true){
                                
                                let vresc=validarResCor2(res_cor_mod${id_bpr});
                                if(vresc==true){
                                    document.getElementById('aresc-mod').innerHTML=""; 
                                    
                                    updatePre(${id_bpr},document.getElementById('latex-pregunta-mod${id_bpr}').value,document.getElementById('res_cor-mod').value,document.getElementById('latex-opcA-mod${id_bpr}').value,document.getElementById('latex-opcB-mod${id_bpr}').value,document.getElementById('latex-opcC-mod${id_bpr}').value,document.getElementById('latex-opcD-mod${id_bpr}').value,document.getElementById('tema-mod').value,parseInt(document.getElementById('dificultad-mod').value));
                                    return true;
                                }else{
                                    document.getElementById('aresc-mod').innerHTML=vresc; 
                                }
                                
                            }else{
                                document.getElementById('adif-mod').innerHTML=vdif; 
                                return false;
                            }
                        }else{
                            document.getElementById('atem-mod').innerHTML=vtem; 
                            return false;
                        }
                    }else{
                        document.getElementById('aopc_d-mod').innerHTML=vopc_d; 
                        return false;
                    }
                }else{
                    document.getElementById('aopc_c-mod').innerHTML=vopc_c; 
                    return false;
                }
            }else{
                
                document.getElementById('aopc_b-mod').innerHTML=vopc_b; 
                return false;
            }
        }else{
            document.getElementById('aopc_a-mod').innerHTML=vopc_a; 
            return false;
        }
    }else{
        document.getElementById('apre-mod').innerHTML=vpre; 
        return false;
    }
}
function validarPre2(pre){
    if(pre.length>150||pre.length<10){
        return "*Nombre de la pregunta entre 10-150 caracteres"; 
    }else{
        return true; 
    } 
}
function validarPreOPC2(opc_pre){
    if(opc_pre.length>50||opc_pre.length<1){
        return "*Inciso de la pregunta entre 1-50 caracteres"; 
    }else{
        return true; 
    } 
}
function validarTem2(tem){
    if(tem!='1'&& tem!='2'&& tem!='3'&& tem!='4'){
        return '*Tema invalido'; 
    }else{
        return true; 
    } 
}
function validarDif2(dif){
    if(dif!='1'&&dif!='2'&&dif!='3'){
        return '*Dificultad invalida'; 
    }else{
        return true; 
    } 
}
function validarResCor2(resc){
    if(resc!='a'&&resc!='b'&&resc!='c'&&resc!='d'){
        return '*Selecione una respuesta Correcta'; 
    }else{
        return true; 
    } 
}

    </script>
    
    `);
     $('#btn_delete_ventana_pre').click(() => {
         //deletePre(id_bpre);
    });
 }








// setVentanaPre(id_bpr,con_pre, opc_a, opc_b,opc_c, opc_d) {
function updatePre(id_bpr,con_pre,res_cor,opc_a,opc_b,opc_c,opc_d,id_tem,id_dif) {
    $.ajax({
        url: '/web/updatePre',
        method: 'POST',
        data: {
            id_bpr:id_bpr,
            con_pre:con_pre,
            res_cor:res_cor,
            opc_a:opc_a,
            opc_b:opc_b,
            opc_c:opc_c,
            opc_d:opc_d,
            id_tem: id_tem,
            id_dif: id_dif
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
