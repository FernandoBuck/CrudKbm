$( document ).ready(function() 
{
    $("#id-botao-cadastro-usuario").click(async function(e)
    {
        e.preventDefault()

        const nome = document.getElementById("id-nome").value
        const email = document.getElementById("id-email").value
        const login = document.getElementById("id-login").value
        const senha = document.getElementById("id-senha").value
        const confirmaSenha = document.getElementById("id-confirmar-senha").value

        const objectDataValidaUsuarioForm = {
            camposVazios : validarCamposPreenchidos(),
            nomeValidado : validaNome(nome),
            emailValidado : validaEmail(email),
            loginValidado : validaLogin(login),
            senhasIguais : validaSenhaIguais(senha, confirmaSenha),
            senhaValidado : validaSenha(senha),
            confirmaSenhaValidado : validaSenha(confirmaSenha)
        }
        

        
        if(objectDataValidaUsuarioForm.emailValido){
            console.log("Email Valido")
        }
        if(objectDataValidaUsuarioForm.camposVazios){
            console.log("Há campos vazios")
        }
        if(objectDataValidaUsuarioForm.nomeValidado){
            console.log("Nome valido")
        }
        if(objectDataValidaUsuarioForm.loginValidado){
            console.log("Login valido")
        }
        if(objectDataValidaUsuarioForm.senhasIguais){
            console.log("Senhas iguais")
        }
        if(objectDataValidaUsuarioForm.senhaValidado){
            console.log("Senha valida")
        }
        if(objectDataValidaUsuarioForm.confirmaSenhaValidado){
            console.log("Senha de confirmação valida")
        }
        

    })

    limpaCamposAoPreencher()
})