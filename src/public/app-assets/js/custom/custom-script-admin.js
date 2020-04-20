/**Funcion para cambiar el tipo de usuario
 * 
 * @param {int} id_cor identificador del input del correo
 * @param {int} id_select identificador del select donde se selecciona el tipo de usuario
 */
function cambiarTipoUsuario(id_cor, id_select) {
    $.ajax({
        url: '/web/updateUserType',
        method: 'POST',
        data: {
            cor: document.getElementById(id_cor).value,
            val: document.getElementById(id_select).value
        },
        success: (res) => {
            M.toast({ html: res, classes: 'rounded' });
            mostrarUsuarios();
        }
    });
}

/**
 * Funcion para mostrar los usuarios
 */
function mostrarUsuarios() {
    $.ajax({
        url: `/web/getUsuariosAjax`,
        method: 'POST',
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