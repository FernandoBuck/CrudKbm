//################# Validações Front-end #################

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

//################# Validações Back-end #################

// Mensagens de erro

function erroCampoVazio(nomeCampo){
    $("#div-erro-"+nomeCampo).html("Esse campo é obrigatório.")
}

function erroNomeInvalido(){
    $("#div-erro-nome").html("*Campo com caracteres inválidos.")
    
}

function erroCaracteresInvalidos(nomeCampo){
    $("#div-erro-"+nomeCampo).html("*Campo com caracteres inválidos.")
    
}

function erroEmailInvalido(){
    $("#div-erro-email").html("*Email inválido.")
}

function erroLoginInvalido(){
    $("#div-erro-login").html("*Login inválido, este campo aceita apenas letras e números separadas por pontos[.].")
}

function erroSenhasDiferentes(){
    $("#div-erro-senha").html("*As senhas devem ser iguais.")
    $("#div-erro-confirma-senha").html("*As senhas devem ser iguais.")
}

function erroSenhaInvalida(){
    $("#div-erro-senha").html("*A senha deve ter, pelo menos, 8 digitos, uma letra maiuscula, uma minuscula, um número e um carácter especial.")
}

function erroCepInvalido(){
    $("#div-erro-cep").html("*CEP inválido.")
}

function erroEstadoInvalido(){
    $("#div-erro-estado").html("*Você está de tramóia.")
}

function emailCadastrado(){
    $("#div-erro-email").html("*Email já cadastrado.")
}

function loginCadastrado(){
    $("#div-erro-login").html("*Login já cadastrado.")
}

function tentativaLoginInvalida(){
    $("#div-erro-login").html("*Login ou senha inválido.")
}

// Validação dos objetos retornados pela API

function exibeErrosFormCliente(objectDataCliente){
    
    if(!(objectDataCliente.campoNomePreenchido)){
        erroCampoVazio("nome")
    }else if(!(objectDataCliente.campoNomeValido)){
        erroNomeInvalido()
    }

    if(!(objectDataCliente.campoEmailPreenchido)){
        erroCampoVazio("email")
    }else if(!(objectDataCliente.campoEmailValido)){
        erroEmailInvalido()
    }else if(!(objectDataCliente.emailClienteDisponivel)){
        emailCadastrado()
    }
    
    if(!(objectDataCliente.campoLoginPreenchido)){
        erroCampoVazio("login")
    }else if(!(objectDataCliente.campoLoginValido)){
        erroLoginInvalido()
    }

    if((objectDataCliente.campoSenhaPreenchido) === false){
        erroCampoVazio("senha")
    }else if((objectDataCliente.campoSenhaValido) === false){
        erroSenhaInvalida()
    }else if((objectDataCliente.camposSenhasIguais) === false){
        erroSenhasDiferentes()
    }

    if((objectDataCliente.campoConfirmarSenhaPreenchido) === false){
        erroCampoVazio("confirma-senha")
    }

    if((objectDataCliente.campoCepPreenchido) === false){
        erroCampoVazio("cep")
    }else if((objectDataCliente.campoCepValido) === false){
        erroCepInvalido()
    }

    if((objectDataCliente.campoNumeroCasaPreenchido) === false){
        erroCampoVazio("numero-casa")
    }else if((objectDataCliente.campoNumeroCasaValido) === false){
        erroCaracteresInvalidos("numero-casa")
    }

    if((objectDataCliente.campoRuaPreenchido) === false){
        erroCampoVazio("rua")
    }else if((objectDataCliente.campoRuaValido) === false){
        erroCaracteresInvalidos("rua")
    }

    if((objectDataCliente.campoBairroPreenchido) === false){
        erroCampoVazio("bairro")
    }else if((objectDataCliente.campoBairroValido) === false){
        erroCaracteresInvalidos("bairro")
    }

    if((objectDataCliente.campoCidadePreenchido) === false){
        erroCampoVazio("cidade")
    }else if((objectDataCliente.campoCidadeValido) === false){
        erroCaracteresInvalidos("cidade")
    }

    if((objectDataCliente.campoEstadoPreenchido) === false){
        erroCampoVazio("estado")
    }else if((objectDataCliente.campoEstadoValido) === false){
        erroCaracteresInvalidos("estado")
    }else if((objectDataCliente.estadoExiste) === false){
        erroEstadoInvalido()
    }
}

function exibeErrosFormLogin(objectDataLogin){
    
    if((objectDataLogin.campoLoginPreenchido) === false){
        erroCampoVazio("login")
    }

    if((objectDataLogin.campoSenhaPreenchido) === false){
        erroCampoVazio("senha")
    }

    if(objectDataLogin.campoLoginPreenchido && objectDataLogin.campoSenhaPreenchido && !(objectDataLogin.loginValido)){
        tentativaLoginInvalida()
    }
}

function exibeErrosFormEditCliente(objectData){

    if((objectData.campoNomePreenchido) === false){
        erroCampoVazio("nome")
    }else if((objectData.campoNomeValido) === false){
        erroNomeInvalido()
    }

    if((objectData.campoEmailPreenchido) === false){
        erroCampoVazio("email")
    }else if((objectData.campoEmailValido) === false){
        erroEmailInvalido()
    }else if((objectData.emailClienteDisponivel) === false){
        emailCadastrado()
    }
    
    if((objectData.campoLoginPreenchido) === false){
        erroCampoVazio("login")
    }else if((objectData.campoLoginValido) === false){
        erroLoginInvalido()
    }else if((objectData.loginClienteDisponivel) === false){
        loginCadastrado()
    }

    if((objectData.campoSenhaPreenchido) === false){
        erroCampoVazio("senha")
    }else if((objectData.campoSenhaValido) === false){
        erroSenhaInvalida()
    }else if((objectData.camposSenhasIguais) === false){
        erroSenhasDiferentes()
    }

    if((objectData.campoConfirmarSenhaPreenchido) === false){
        erroCampoVazio("confirma-senha")
    }
}

function exibeErrosEditaSenha(objectData){
    if((objectData.campoSenhaPreenchido) === false){
        erroCampoVazio("senha")
    }else if((objectData.campoSenhaValido) === false){
        erroSenhaInvalida()
    }else if((objectData.camposSenhasIguais) === false){
        erroSenhasDiferentes()
    }

    if((objectData.campoConfirmarSenhaPreenchido) === false){
        erroCampoVazio("confirma-senha")
    }
}

function exibeErrosFormAdicionaEndereco(objectData, nForm){
    if((objectData.campoCepPreenchido) === false){
        erroCampoVazio(("cep-"+nForm))
    }else if((objectData.campoCepValido) === false){
        erroCepInvalido()
    }

    if((objectData.campoNumeroCasaPreenchido) === false){
        erroCampoVazio(("numero-casa-"+nForm))
    }else if((objectData.campoNumeroCasaValido) === false){
        erroCaracteresInvalidos(("numero-casa-"+nForm))
    }

    if((objectData.campoRuaPreenchido) === false){
        erroCampoVazio(("rua-"+nForm))
    }else if((objectData.campoRuaValido) === false){
        erroCaracteresInvalidos(("rua"+nForm))
    }

    if((objectData.campoBairroPreenchido) === false){
        erroCampoVazio(("bairro-"+nForm))
    }else if((objectData.campoBairroValido) === false){
        erroCaracteresInvalidos(("bairro-"+nForm))
    }

    if((objectData.campoCidadePreenchido) === false){
        erroCampoVazio(("cidade-"+nForm))
    }else if((objectData.campoCidadeValido) === false){
        erroCaracteresInvalidos(("cidade"+nForm))
    }

    if((objectData.campoEstadoPreenchido) === false){
        erroCampoVazio(("estado-"+nForm))
    }else if((objectData.campoEstadoValido) === false){
        erroCaracteresInvalidos(("estado-"+nForm))
    }else if((objectData.estadoExiste) === false){
        erroEstadoInvalido()
    }
}

function exibeErrosExcluiEndereco(objectData){
    if(objectData.umEndereco){
        alert("Você deve ter, pelo menos, um endereço cadastrado.\nCadastre um novo endereço antes de apagar este.")
    }
}