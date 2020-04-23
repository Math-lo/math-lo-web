/**
 * Función para registrar un hijo en el tutor por medio del curp 
 * @param {int} id_curp identificador del input donde obtener el valor del curp
 * @param {int} id_usu identificador del tutor
 */
function RegisterStudent(id_curp, id_usu) {
    let curp = document.getElementById(id_curp).value;
    $.ajax({
        url: '/web/registerStudent',
        method: 'POST',
        data: {
            curp,
            id_usu
        },
        success: (res) => {
            M.toast({ html: res, classes: 'rounded' });
            ResetTutor();
        }
    });
}

/**
 * 
 * @param {String} curp_usu curp del alumno que se desea eliminar
 * @param {int} id_tutor identificador del tutor donde se desea eliminar el alumno
 */
function deleteStudent(curp_usu) {
    $.ajax({
        url: '/web/deleteStudent',
        method: 'POST',
        data: {
            curp_usu
        },
        success: (res) => {
            M.toast({ html: res, classes: 'rounded' });
            ResetTutor();
        }
    });
}

function ResetTutor() {
    $.ajax({
        url: '/web/resetTutor',
        method: 'POST',
        success: (res) => {
            $('#Container_students').html('');
            res.forEach(alumno => {
                $('#Container_students').append(`<div class="row">
                <div class="container">
                    <div class="col s6">
                        <a href="javascript:void(0);"> 
                            <div class="card" style="padding: 30px 10px;">
                                ${alumno.nom_usu} ${alumno.nom_gru}
                                <a href="javascript:void(0);" onclick="deleteStudent('${alumno.curp_usu}');"
                                 class="btn btn-flat btn-light-deep-purple" style="float: right;">Eliminar</a>
                            </div>
                        </a>
                    </div>
                </div>
            </div>`);
            });

        }
    });
}

function seeReports(id_usu, nom_usu, id_grupo) {
    $.ajax({
        url: '/web/seeReportsTutor',
        method: 'POST',
        data: {
            id_grupo
        },
        success: (res) => {
            console.log(res);
            crearSelectMaterialize(res[0], 'cuestionarioSeleccionado', 'Seleccionar cuestionario');
            crearSelectMaterialize(res[1], 'temaSeleccionado', 'Selecciona tema');
            $('#menu_nav_reportes_cuestionario').css('display', 'inline-block');
            $('#menu_temas_seleccionados').css('display', 'inline-block');
            $('#nombre_alumno').html(`<h4>${nom_usu}</h4>`);
            $('#alumno_ver').val(id_usu);
            $('#grupo_ver').val(id_grupo);
        }
    });
}

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