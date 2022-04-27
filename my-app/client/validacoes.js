function validarCamposPreenchidos(){
    
    $("input").each(function(){
        if($(this).val() == ""){
            
            if( $('#div-erro-'+$(this).attr("name")) ){
			    $('#div-erro-'+$(this).attr("name")).html("*Esse campo é obrigatório");
		    }
		    
        }
    })
}