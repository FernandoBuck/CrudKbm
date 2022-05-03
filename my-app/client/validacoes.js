function validarCampoPreenchido(nomeCampo, valorCampo){
    if(valorCampo == ""){
        $("#div-erro-"+nomeCampo).html("Esse campo é obrigatório.")
        return false
    }
    return true
}

function limpaCamposAoPreencher(){
    $("input").change(function(){
        $('#div-erro-'+$(this).attr("name")).empty()
    })
}

function validaNomeRe(nome){
    const nomeRe = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))*[A-Za-z]+\.?\s*$/
    if(nomeRe.test(nome)){
        return true
    }
    $("#div-erro-nome").html("*Campo com caracteres inválidos.")
    return false
}

function validaEmailRe(email){
    const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(emailRe.test(email)){
        return true
    }
    $("#div-erro-email").html("*Email inválido.")
    return false
}

function validaLoginRe(login){
    const loginRe = /^([a-zA-Z0-9])+[\.]*([a-zA-Z0-9])+$/
    if(loginRe.test(login)){
        return true
    }
    $("#div-erro-login").html("*Login inválido, este campo aceita apenas letras e números separadas por pontos[.].")
    return false
}

function validaSenhaIguais(senha, confirmaSenha){
    if(senha == confirmaSenha){
        return true
    }
    $("#div-erro-senha").html("*As senhas devem ser iguais.")
    $("#div-erro-confirma-senha").html("*As senhas devem ser iguais.")
    return false
}

function validaSenhaRe(senha){
    const senhaRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,99}$/
    if(senhaRe.test(senha)){
        return true
    }
    $("#div-erro-senha").html("*A senha deve ter, pelo menos, 8 digitos, uma letra maiuscula, uma minuscula, um número e um carácter especial.")
    return false
}

function validaFormUsuario(objectDataUsuario){
    
    const objectDataUsuarioValidado = {
        campoNomePreenchido : validarCampoPreenchido("nome", objectDataUsuario.nome),
        campoEmailPreenchido : validarCampoPreenchido("email", objectDataUsuario.email),
        campoLoginPreenchido : validarCampoPreenchido("login", objectDataUsuario.login),
        campoSenhaPreenchido : validarCampoPreenchido("senha", objectDataUsuario.senha),
        campoConfirmaSenhaPreenchido : validarCampoPreenchido("confirma-senha", objectDataUsuario.confirmaSenha)
    }

    if(objectDataUsuarioValidado.campoNomePreenchido){
        objectDataUsuarioValidado.campoNomeRe = validaNomeRe(objectDataUsuario.nome) 
    }
    
    if(objectDataUsuarioValidado.campoEmailPreenchido){
        objectDataUsuarioValidado.campoEmailRe = validaEmailRe(objectDataUsuario.email)
    }

    if(objectDataUsuarioValidado.campoLoginPreenchido){
        objectDataUsuarioValidado.campoLoginRe = validaLoginRe(objectDataUsuario.login)
    }

    if(objectDataUsuarioValidado.campoSenhaPreenchido && objectDataUsuarioValidado.campoConfirmaSenhaPreenchido){
        objectDataUsuarioValidado.camposSenhasIguais = validaSenhaIguais(objectDataUsuario.senha, objectDataUsuario.confirmaSenha) 

        if(objectDataUsuarioValidado.camposSenhasIguais){
            objectDataUsuarioValidado.campoSenhaRe = validaSenhaRe(objectDataUsuario.senha)
        }
    }

    return objectDataUsuarioValidado
}

function validaFormCliente(objectDataCliente){

    const objectDataClienteValidado = {
        campoNomePreenchido : validarCampoPreenchido("nome", objectDataCliente.nome),
        campoEmailPreenchido : validarCampoPreenchido("email", objectDataCliente.email),
        campoLoginPreenchido : validarCampoPreenchido("login", objectDataCliente.login),
        campoSenhaPreenchido : validarCampoPreenchido("senha", objectDataCliente.senha),
        campoConfirmaSenhaPreenchido : validarCampoPreenchido("confirma-senha", objectDataCliente.confirmarSenha)
    }

    if(objectDataClienteValidado.campoNomePreenchido){
        objectDataClienteValidado.campoNomeRe = validaNomeRe(objectDataCliente.nome) 
    }
    
    if(objectDataClienteValidado.campoEmailPreenchido){
        objectDataClienteValidado.campoEmailRe = validaEmailRe(objectDataCliente.email)
    }

    if(objectDataClienteValidado.campoLoginPreenchido){
        objectDataClienteValidado.campoLoginRe = validaLoginRe(objectDataCliente.login)
    }

    if(objectDataClienteValidado.campoSenhaPreenchido && objectDataClienteValidado.campoConfirmaSenhaPreenchido){
        objectDataClienteValidado.camposSenhasIguais = validaSenhaIguais(objectDataCliente.senha, objectDataCliente.confirmarSenha) 

        if(objectDataClienteValidado.camposSenhasIguais){
            objectDataClienteValidado.campoSenhaRe = validaSenhaRe(objectDataCliente.senha)
        }
    }

    return objectDataClienteValidado
}