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

        const objectDataUsuario = {
            nome : nome,
            email : email,
            login : login,
            senha : senha,
            confirmaSenha : confirmaSenha
        }

        const objectDataUsuarioValidado = validaFormUsuario(objectDataUsuario)
        console.log(objectDataUsuarioValidado)

        if(Object.values(objectDataUsuarioValidado).every(item => item === true)){
            const response = await $.ajax({
                type : "POST",
                url : "../../server/api/usuario.php",
                data : {
                    funcao : "cadastrar",
                    dados : objectDataUsuario
                }
            })
        }

    })

    limpaCamposAoPreencher()
})