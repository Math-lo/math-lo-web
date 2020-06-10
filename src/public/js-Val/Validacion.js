let enviar=document.getElementById('send'); 
 
function retrono(){
    let nombre=document.getElementById('nom').value; 
    //let paterno=document.getElementById('appat').value;
    let materno=document.getElementById('apmat').value; 
    let sexo=1;
    let tusuario=document.getElementById('tipo').value; 
    console.log(tusuario+tusuario) 
    let usuario=document.getElementById('username').value; 
    let correo=document.getElementById('email').value; 
    let contraseña=document.getElementById('pas').value; 
    /*-----------------------------*/
    let vnombre=validarnombreapellido(nombre,"nombre"); 
    if(vnombre==true){
        document.getElementById('anombre').innerHTML=""; 
      //  let vpaterno=validarnombreapellido(paterno, "apellido paterno");
       // if(vpaterno==true){
           // document.getElementById('aappat').innerHTML=""; 
            let vmaterno=validarnombreapellido(materno, "apellido materno");
            if(vmaterno==true){ 
                document.getElementById('aapmat').innerHTML=""; 
                if(sexo!="1"){ 
                    document.getElementById('asex').innerHTML="Sexo es inválido";
                    return false
                }else{
                   
                    if(tusuario!="1" &&  tusuario!= "2"){
                        console.log('f');
                        document.getElementById('atipo').innerHTML="Tipo de usuario inválido";
                        return false
                    }else{
                        document.getElementById('atipo').innerHTML="";

                        let vusuario=validarnombreusuario(usuario); 
                        if (vusuario==true){
                            document.getElementById('ausername').innerHTML="";
                            let vemail=validarEmail(correo);
                            if(vemail==true){
                                document.getElementById('aemail').innerHTML="";
                                let vcontraseña=ValidarContraseña(contraseña);
                                if(vcontraseña){
                                    document.getElementById('apas').innerHTML=""; 
                                    return true;
                                    //if(confirmacontraseña==contraseña){
                                        //return true;
                                   // }else{
                                        //document.getElementById('aconf').innerHTML="Las contraseñas no coinciden";
                                        //return false;
                                    //}
                                }else{
                                    document.getElementById('apas').innerHTML="Entre 8-50 caracteres-Al menos una letra mayúscula-Al menos una letra minuscula-Al menos un dígito-No espacios en blanco-Al menos 1 caracter especial";
                                    
                                    return false; 
                                }
                            }else{
                                document.getElementById('aemail').innerHTML=vemail;
                                return false; 
                            }
                        }else{
                            document.getElementById('ausername').innerHTML=vusuario;
                            return false;
                        }
                    }
                }
            }else{
                document.getElementById('aapmat').innerHTML=vmaterno; 
                return false;
            }
       /*}else{
            document.getElementById('aappat').innerHTML=vpaterno;
            return false; 
      }*/
    }else{
        document.getElementById('anombre').innerHTML=vnombre; 
        return false; 
    }
    
}



function validarnombreapellido(nombre, tipo){
    var reNomA= /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
    
    /*if(spaceApp!=2){
        if(tipo=="apellido materno"){
            return "Coloca Ambos apellidos"
        }else{
            return "Coloca Ambos apellidos"

        }
    }else*/ if(tipo=="apellido materno"){
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
/*function validarnombreusuario(username){
    if (username.length<3 || username.length>50){
        return "El usuario debe estar entre 3 y 30 caracteres"
    }else{
        if(!validacaracteres("qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNMáéíóúÄÁÉÏíÓúÖÜý1234567890", username)){
            return "El nombre de usuario sólo acepta números y letras"
        }else{
            return true; 
        }
    } 
}*/

function validarnombreusuario(username){
    var reCurp= /[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
    if(username.length<1){
        return "Ingrese el Curp"; 
    }
    if (!reCurp.test(username)){
        return "Curp Invalido"
    }else{
            return true; 
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
/*Minimo 8 caracteres
Maximo 50
Al menos una letra mayúscula
Al menos una letra minucula
Al menos un dígito
No espacios en blanco
Al menos 1 caracter especial*/
/*
function ValidarContraseña(contraseña){
    if(contraseña.length<8){
        return false;
    }else{
        const numeros="1234567890";
        const mayusculas="QWERTYUIOPASDFGHJKLÑZXCVBNMÓÉÍÚÁÚÜÄËÖÏ"; 
        let contn=0,contm=0; 
        for(let i=0;i<contraseña.length; i++){
            for(let j=0; j<numeros.length; j++){
                if(contraseña.charAt(i)==numeros.charAt(j)){
                    contn++; 
                    if(contm>0) break;   
                }
            }
            for(let k=0; k<mayusculas.length; k++){
                if(contraseña.charAt(i)==mayusculas.charAt(k)){
                    contm++;
                    if(contm>0) break;  
                }
            }
            if(contn>0 && contm>0) break; 
        }
        if(contn>0 && contm>0){
            return true;
        }else{
            return false; 
        }
    }
}*/
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

