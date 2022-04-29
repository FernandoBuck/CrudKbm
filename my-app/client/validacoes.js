function validarCamposPreenchidos(){
    
    haCampoVazio = false

    $("input").each(function(){
        if($(this).val() == ""){
            haCampoVazio = true
            if( $('#div-erro-'+$(this).attr("name")) ){
			    $('#div-erro-'+$(this).attr("name")).html("*Esse campo é obrigatório.")
                
		    }
        }
    })
    return haCampoVazio
}

function limpaCamposAoPreencher(){
    $("input").change(function(){
        $('#div-erro-'+$(this).attr("name")).empty()
    })
}

function validaEmail(email){
    const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(emailRe.test(email)){
        return true
    }
    return false
}

function validaNome(nome){
    const nomeRe = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))*[A-Za-z]+\.?\s*$/
    if(nomeRe.test(nome)){
        return true
    }
    return false
}

function validaLogin(login){
    const loginRe = /^([a-zA-Z0-9])+[\.]*([a-zA-Z0-9])+$/
    if(loginRe.test(login)){
        return true
    }
    else return false
}

function validaSenhaIguais(senha, confirmaSenha){
    if(senha == confirmaSenha){
        return true
    }
    return false
}

function validaSenha(senha){
    const senhaRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    if(senhaRe.test(senha)){
        return true
    }
    return false
}