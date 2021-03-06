validaSessao()
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
        
        if(Object.values(objectDataUsuarioValidado).every(item => item === true)){
            const response = await $.ajax({
                type : "POST",
                url : "../../server/api/usuario.php",
                data : {
                    funcao : "cadastrar",
                    dados : objectDataUsuario
                }
            })
            if(response.usuarioAdd){
                setTimeout(location.reload(), 2000)
                return
            }
            alert("Algo deu errado!")
        }
        

    })

    limpaCamposAoPreencher()
})