let enviar=document.getElementById('send'); 
 
function retrono(){
    let nombre=document.getElementById('first_name').value; 
    let materno=document.getElementById('last_name').value; 
    let sexo=1;
    let tusuario=document.getElementById('tip_usu').value; 
    
     
    let correo=document.getElementById('email').value; 
    let contraseña=document.getElementById('password').value; 
    /*-----------------------------*/
    let vnombre=validarnombreapellido(nombre,"nombre"); 
    if(vnombre==true){
        document.getElementById('anombre').innerHTML=""; 
            let vmaterno=validarnombreapellido(materno, "apellido materno");
            if(vmaterno==true){ 
                document.getElementById('aapmat').innerHTML=""; 
                if(sexo!="1"){ 
                    document.getElementById('asex').innerHTML="Sexo es inválido";
                    return false
                }else{
                    if(tusuario!=3 &&  tusuario!= 5&&  tusuario!= 4){
                        console.log('f');
                        document.getElementById('atipo').innerHTML="Tipo de usuario inválido";
                        return false
                    }else{
                        document.getElementById('atipo').innerHTML="";
                            let vemail=validarEmail(correo);
                            if(vemail==true){
                                document.getElementById('aemail').innerHTML="";
                                let vcontraseña=ValidarContraseña(contraseña);
                                if(vcontraseña){
                                    document.getElementById('apas').innerHTML=""; 
                                    AgregarUsuarioAjax(document.getElementById('first_name').value, document.getElementById('last_name').value,document.getElementById('tip_usu').value,document.getElementById('email').value,document.getElementById('password').value);

                                }else{
                                    document.getElementById('apas').innerHTML="Entre 8-50 caracteres-Al menos una letra mayúscula-Al menos una letra minuscula-Al menos un dígito-No espacios en blanco-Al menos 1 caracter especial";
                                    
                                    return false; 
                                }
                            }else{
                                document.getElementById('aemail').innerHTML=vemail;
                                return false; 
                            }
                    }
                }
            }else{
                document.getElementById('aapmat').innerHTML=vmaterno; 
                return false;
            }

    }else{
        document.getElementById('anombre').innerHTML=vnombre; 
        return false; 
    }
    
}



function validarnombreapellido(nombre, tipo){
    var reNomA= /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
    
 if(tipo=="apellido materno"){
        let spaceApp=nombre.split(' ');
        
        if(spaceApp.length!=2){
            return "Coloca Ambos apellidos"
        }else{
            return true

        }
    }
     if (nombre.length<3 || nombre.length>50){
        if(tipo=="apellido materno" ){
            return "Los apellidos deben estar entre 3 y 50 caracteres"
        }else{
            return "El nombre debe estar entre 3 y 50 caracteres"
        }
    }else{
        if(!reNomA.test(nombre)){

            if(tipo=="apellido materno" ){
                
                    return "Los Apellidos sólo deben contener letras"

            }else{
                return "El nombre sólo debe contener letras"
            }
        }else{
            return true; 
        }
    } 
}



function validarEmail(email) { 
    if(email.length<1){
        return "El correo no puede estar vacío"; 
    }else{
         var reCorreo= /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9._-]+@[a-zA-ZÀ-ÿ\u00f1\u00d10-9.-]+\.([a-zA-ZÀ-ÿ\u00f1\u00d1]{2,4})+$/

        if(!reCorreo.test(email)){
            return "El correo Es inválido"

        }else{
            return true; 

        }
    } 
}

function validacaracteres(carac, val){
    let arreglo = [];
    a = true;
    for (let i = 0; i < val.length; i++) {
        arreglo[i] = false;
    }
    for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < carac.length; j++) {
            if (val.charAt(i) == carac.charAt(j)) {
                arreglo[i] = true;
                break;
            }
        }
        if (arreglo[i] == false) {
            a = false;
            break; 
        }
    }
    return a;
}

function ValidarContraseña(contraseña){
   
var reContra= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,50}$/;
    if(!reContra.test(contraseña)){ 
        return false;
        
    }else{
        return true;
    }
}

enviar.addEventListener('click', (e)=>{
    if(!retrono()){
        e.preventDefault(); 
    }
}, false); 

