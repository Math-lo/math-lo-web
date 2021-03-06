/**
 * funcion para hacer un buscador en una tabla
 * @param {int} id_barra identificaador de la barra de busqueda (input)
 * @param {int} id_tabla identificador del tbody de la tabla
 */
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

/* Inicio de la vista "inicio" */

/**
 * funcion para mandar a llamar que visualice los alumnos del grupo
 * @param {int} id_gru identificador del grupo
 */
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

/**
 * funcion para eliminar a un estudiante del grupo de la autoridad
 * @param {int} id_ugr identificador de usuario grupo de la entidad de la bd relacional
 * @param {int} id_gru identificador del grupo
 * @param {int} id_prof identificador del profesor
 */
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

/**
 * funcion para ver los grupos de algun actor que funja como profesor
 * @param {int} id_prof identificador del profesor
 */

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

/**
 * funcion para modificar la clave de un grupo
 * @param {int} id_gru identificador del grupo
 * @param {String} clave texto que se desee establecer como clave del grupo
 */
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

/* Fin de la vista de inicio */

/* Inicio vista de apoyos */

/**
 * funcion para mostrar apoyos por tema
 * @param {int} id_tem identificador del tema
 */
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
                        <div class="app-file-content-logo grey lighten-4" onclick="setVentanaApoyos('${apoyo.nom_pdf}','${apoyo.vin_apo}','${apoyo.nom_tem}');
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

/**
 * funcion para setear los valores en la ventana de información de los apoyos
 * @param {String} pdf nombre del pdf del apoyo
 * @param {String} url vinculo que esta registrado en el apoyo
 * @param {String} tema tema del apoyo correspondiente
 * @param {int} id identificador del apoyo en cuestion
 */
function setVentanaApoyos(pdf, url, tema, id) {
    document.getElementById('pdf_ventana_muestra').textContent = pdf;
    document.getElementById('url_ventana_muestra').textContent = url;
    document.getElementById('tema_ventana_muestra').textContent = tema;
    document.getElementById('id_apoyo').value = id;
    $('#btn_delete_ventana_apoyos').click(() => {
        deleteApoyo(id);
    });
}

/**
 * 
 * @param {int} id identificador del apoyo a eliminar
 */
function deleteApoyo(id) {
    $.ajax({
        url: '/web/deleteApoyoAjax',
        method: 'POST',
        data: {
            id_apoyo: id
        }
    }).done((res) => {
        M.toast({ html: res, classes: 'rounded' });
        document.getElementById('show').className = 'app-file-overlay';
        document.getElementById('show2').className = 'app-file-sidebar-info ps';
        mostrarApoyos(-1);

    });
}

/**
 * Eventos para los formularios correspondientes a los apoyos
 */
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
        formData.append('link', document.getElementById('url_ventana_muestra').textContent);
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
/* Fin de la vista de apoyos */

/* Inicio de la vista de reportes generales */

/**
 * 
 * @param {int} id_gru identificador del grupo para obtener alumnos 
 */
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

/* Fin de la vista de reportes generales */

/* Inicio de funciones generales */
/**
 * 
 * @param {array} arreglo arreglo con el que se van a crear los option 
 * @param {int} id_select id del select donde debe ser colocado
 * @param {string} general opcion general de los select
 */
function crearSelectMaterialize(arreglo, id_select, general) {
    let select = document.getElementById(id_select);
    let optionGeneral = document.createElement('option');
    optionGeneral.value = -1;
    optionGeneral.textContent = general;
    select.appendChild(optionGeneral);
    arreglo.forEach(elemento => {

        let option = document.createElement('option');
        option.value = elemento[0];
        option.textContent = elemento[1];
        select.appendChild(option);
        if (arreglo.indexOf(elemento) == (arreglo.length - 1)) {
            $(`#${id_select}`).formSelect();
        }
    });
}
/* Fin de funciones generales */

/* Inicio de vista grupos */

/**Funcion para cambiar el profesor de un grupo
 * 
 * @param {int} id_prof identificador del profesor que se va a setear
 * @param {int} id_gru identificador del grupo a modificar el profesor
 */
function cambiarProfesorGrupo(id_prof, id_gru) {
    $.ajax({
        url: '/web/updateTeacherGroup',
        method: 'POST',
        data: {
            id_prof,
            id_gru
        },
        success: (res) => {
            M.toast({ html: res, classes: 'rounded' });
            takeAutorityGroups();
        }
    });
}

/**Función para eliminar el profesor de un grupo
 * 
 * @param {int} id_gru identificador del grupo donde se eliminara el profesor
 */
function deleteTeacherGroup(id_gru) {
    $.ajax({
        url: '/web/deleteTeacherGroup',
        method: 'POST',
        data: {
            id_gru
        },
        success: (res) => {
            M.toast({ html: res, classes: 'rounded' });
            takeAutorityGroups();
        }
    });
}

/**
 * Función para actualizar los datos de la tabla de grupos
 */
function takeAutorityGroups() {
    $.ajax({
        url: '/web/takeAutorityGroup',
        method: 'POST',
        success: (res) => {
            let html = '';
            res.forEach(grupo => {
                if (grupo.prof_gru == null) grupo.prof_gru = '';
                if (grupo.cla_gru == null) grupo.cla_gru = '';
                html += `
                <tr>
                <td>${grupo.nom_gru}</td>
                <td contenteditable="true" id="clave${grupo.id_gru}">${grupo.cla_gru}</td>
                <td>${grupo.prof_gru}</td>
                <td>
                    <a href="javascript:void(0);" onclick="modificarClaveGrupo(${grupo.id_gru}, document.getElementById('clave${grupo.id_gru}').innerText);" class="waves-effect waves-teal btn-flat">Modificar clave</a>
                </td>
                <td>
                    <a href="javascript:void(0);" onclick="deleteTeacherGroup(${grupo.id_gru});" class="waves-effect waves-teal btn-flat">Quitar profesor</a>
                </td>
                <td>
                    <a href="#tabla_alumnos" onclick="mostrarAlumnos(${grupo.id_gru});" class="waves-effect waves-teal btn-flat">Ver alumnado</a>
                </td>
                </tr>
                `
            });
            $('#tabla_grupos').html(html);
        }
    });
}
/* Fin de la vista grupos */