$( document ).ready(function() 
{

    loginCredential = localStorage.getItem("loginCredential")


    $("#botao-login").click(async function(e)
    {
        e.preventDefault()

        const login = document.getElementById("id-login").value
        const senha = document.getElementById("id-senha").value

        const objectDataLogin = {
            login : login,
            senha : senha
        }

        const response = await $.ajax
        ({
            type: 'POST',
            url: '../../server/api/login.php',
            data: {
                funcao : "validaLogin",
                dados : objectDataLogin
            },
        })

        if(response.loginValido){
            //header somewhere
        }else{
            exibeErrosFormLogin(response)
        }
    })
    limpaCamposAoPreencher()
})