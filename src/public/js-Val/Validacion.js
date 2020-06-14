let enviar=document.getElementById('send'); 
 
function retrono(){
    let date=document.getElementById('date').value;
    let name=document.getElementById('nombre').value;
    let element=document.getElementsByName('element').length;
    let group= document.getElementsByName('group').length;

    /*-----------------------------*/
    

    let vname=validarnombreCuest(name); 
                    if(vname==true){ 
                        document.getElementById('anombre').innerHTML=""; 
                        let vfecha=validarFecha(date);
                            if(vfecha==true){ 
                            document.getElementById('afecha').innerHTML=""; 
                            let velem=validarElement(element);
                            if(velem==true){
                                document.getElementById('aelem').innerHTML=""; 
                                let vgru=validarGroup(group);
                  
                                 if(vgru==true){
                                    document.getElementById('agru').innerHTML="";
                                    return true;

                                    }else{
                                        document.getElementById('agru').innerHTML=vgru; 
                                        return false;
                                }
                        
                            }else{
                                document.getElementById('aelem').innerHTML=velem; 
                                return false;
                            }
                            }else{
                                document.getElementById('afecha').innerHTML=vfecha; 
                                return false;
                            }
                    }else{
                    document.getElementById('anombre').innerHTML=vname; 
                    return false;
                }
                

    }         



function validarnombreCuest(cuest){
    var reNomCuest = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1]+(\s*[a-zA-Z0-9À-ÿ\u00f1\u00d1]*)*[a-zA-Z0-9À-ÿ\u00f1\u00d1]+$/
    if(cuest.length<1){
        return "*Ingresa el nombre del Cuestionario."; 
    }
    if (!reNomCuest.test(cuest)){
        return "*Formato invalido"
    }else{
            return true; 
    } 
}
function validarElement(ele){
    
        if(ele<5){
            return "*Seleccione las preguntas del cuestionario minimo 5";
     
     
         }else{

             return true;
            
         }
        
    
}
function validarGroup(gru){

        if(gru<1){
           return "*Seleccione el Grupo";
        }else{
            return true;
    
        }
    
    
}
function validarFecha(xdate){
    let dateS=xdate.split('-');
    var reFecha= /\d{4}([-])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/
    let todaydatere = new Date();
        if(!reFecha.test(xdate)){
            return '*Formato de la fecha invalido';
        }else if(parseInt(dateS[0])< todaydatere.getFullYear()){
            return '*Fecha no valida';
        }else if(parseInt(dateS[1])< (todaydatere.getMonth()+1) && parseInt(dateS[0]) == todaydatere.getFullYear()){
            return '*Fecha no valida';
        }else if(parseInt(dateS[2])< todaydatere.getDate()&& parseInt(dateS[1]) == (todaydatere.getMonth()+1)){///
            return '*Fecha no valida';
        }else{
            return true;
        }
}


enviar.addEventListener('click', (e)=>{
    if(!retrono()){
        e.preventDefault(); 
    }
}, false); 