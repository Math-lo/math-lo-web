google.charts.load('current', { 'packages': ['corechart'] });
google.charts.load('current', { 'packages': ['bar'] });
//const url = 'https://www.mychemistlab.com.mx/django/math.lo';
const url = 'http://localhost:8000';

function limpiaGraficas() {
    $('#grafica1').html('');
    $('#grafica2').html('');
    $('#grafica3').html('');
    $('#grafica4').html('');
    $('#grafica5').html('');
    $('#grafica6').html('');
}

function drawChart(chart_data, chart1_main_title, id) {
    var data =
        google.visualization.arrayToDataTable(chart_data);
    var options = {
        title: chart1_main_title,
        is3D: true,
        slices: { 0: { color: '#5c6bc0' }, 1: { color: '#ff9800' } }
    };
    var chart = new google.visualization.PieChart(document.getElementById(id));
    chart.draw(data, options);
}

function drawChartBar(chart_data, titulo, subtitulo, id) {
    let data =
        google.visualization.arrayToDataTable(chart_data);
    var options = {
        chart: {
            title: titulo,
            subtitle: subtitulo,
        },
        colors: ['#ff9800', '#5c6bc0']
    };
    var chart = new google.charts.Bar(document.getElementById(id));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function cargaGraficas() {
    $('#menu_nav_reportes_alumnos').css('display', 'none');
    limpiaGraficas();
    $.ajax({
        url: `${url}/gamma/generalGrades/`,
        method: 'GET',
        success: (res) => {
            $('#btn_inicio').html('');
            $('#menu_nav_reportes').css('display', 'inline-block');
            $('#menu_nav_reportes_cuestionario').css('display', 'inline-block');
            document.getElementById('btn_inicio').style = '';
            document.getElementById('btn_inicio').className = '';
            drawChart(res, 'Alumnos aprobados y reprobados generales', "grafica3");

        }
    });
    $.ajax({
        url: `${url}/gamma/generalColumnTopic/`,
        method: 'GET',
        success: (res) => {
            drawChartBar(res, 'Temas', 'Puntaje por temas', 'grafica4');
        }
    });
}

function cargarGraficasGrupo(id_gru, nom_gru) {
    $('#menu_nav_reportes_alumnos').css('display', 'inline-block');
    $('#menu_temas_seleccionados').css('display', 'inline-block');
    limpiaGraficas();
    $.ajax({
        url: `${url}/gamma/generalColumnGroupTopic/${id_gru}/`,
        method: 'GET',
        success: (res) => {
            if (res.length <= 1) {
                document.getElementById('grafica4').innerHTML = '<center><h2>Lo sentimos pero este grupo no cuenta con reportes</h2></center>'
                $('#menu_nav_reportes_alumnos').css('display', 'none');
                $('#menu_temas_seleccionados').css('display', 'none');
            } else {
                drawChartBar(res, `Temas del grupo ${nom_gru}`, 'Correctos e incorrectos', 'grafica4');
            }

        }
    });
}

function filtrarGraficas() {
    let grupo = document.getElementById('grupo_ver').value;
    let alumno = document.getElementById('alumno_ver').value;
    let cuestionario = document.getElementById('cuestionario_ver').value;
    let tema = document.getElementById('tema_ver').value;
    if (cuestionario != -1) {
        if (grupo != -1) {
            if (alumno != -1) {
                alumnoCuestionario(alumno, cuestionario);
            } else {
                grupoCuestionario(grupo, cuestionario);
            }
        } else {
            cuestionaire(cuestionario);
        }
    }
    if (alumno != -1) {
        if (tema != -1) {
            alumnoTema(alumno, tema);
        }
    } else {
        if (tema != -1) {
            M.toast({ html: "Se debe de seleccionar un alumno", classes: 'rounded' });
        }
    }
}

function grupoCuestionario(id_gru, id_cue) {
    limpiaGraficas();
    $.ajax({
        url: `${url}/gamma/generalGroupQuestionnaire/${id_gru}/${id_cue}/`,
        method: 'GET',
        success: (res) => {
            if (res.length <= 1) {
                $('#grafica1').html('');
                document.getElementById('grafica1').innerHTML = '<center><h2>Lo sentimos pero este grupo con este cuestionario no cuenta con reportes</h2></center>'
            } else {
                $('#grafica1').html('');
                drawChart(res, `Aprobados y reprobados del cuestionario en el grupo`, 'grafica1');
            }

        }
    })
    $.ajax({
        url: `${url}/gamma/questionnaireGradeGroup/${id_gru}/${id_cue}/`,
        method: 'GET',
        success: (res) => {
            if (res.length <= 1) {
                $('#grafica2').html('');
            } else {
                $('#grafica2').html('');
                drawChartBar(res, `Correctas e incorrectas del cuestionario en el grupo`, `Por pregunta`, 'grafica2');
            }

        }
    })
}

function cuestionaire(id_cue) {
    limpiaGraficas();
    $.ajax({
        url: `${url}/gamma/generalQuestionnaire/${id_cue}/`,
        method: 'GET',
        success: (res) => {
            if (res.length <= 1) {
                $('#grafica3').html('');
                document.getElementById('grafica3').innerHTML = '<center><h2>Lo sentimos pero cuestionario no cuenta con reportes</h2></center>'
            } else {
                $('#grafica3').html('');
                drawChart(res, `Aprobados y reprobados del cuestionario general`, 'grafica3');
            }

        }
    })
    $.ajax({
        url: `${url}/gamma/questionnaireGrades/${id_cue}/`,
        method: 'GET',
        success: (res) => {
            if (res.length <= 1) {
                $('#grafica4').html('');
            } else {
                $('#grafica4').html('');
                drawChartBar(res, `Aciertos e incorrectos del cuestionario`, 'General', 'grafica4');
            }

        }
    })
}

function alumnoCuestionario(id_alum, id_cues) {
    limpiaGraficas();
    $.ajax({
        url: `${url}/gamma/questionnaireAlumno/${id_alum}/${id_cues}/`,
        method: 'GET',
        success: (res) => {
            if (res.length <= 1) {
                $('#grafica1').html('');
                document.getElementById('grafica1').innerHTML = '<center><h2>Lo sentimos pero este alumno con este cuestionario no cuenta con reportes</h2></center>'
            } else {
                $('#grafica1').html('');
                drawChart(res, `Correctas e incorrectas del cuestionario del alumno`, 'grafica1');
            }

        }
    })
}

function alumnoTema(id_alu, id_tema) {
    limpiaGraficas();
    $.ajax({
        url: `${url}/gamma/questionnairesAlumnoTopic/${id_alu}/${id_tema}/`,
        method: 'GET',
        success: (res) => {
            if (res.length <= 1) {
                $('#grafica1').html('');
                document.getElementById('grafica1').innerHTML = '<center><h2>Lo sentimos pero este alumno con este tema no cuenta con reportes</h2></center>'
            } else {
                $('#grafica1').html('');
                drawChart(res, `Correctas e incorrectas del alumno en el tema`, 'grafica1');
            }

        }
    })
}