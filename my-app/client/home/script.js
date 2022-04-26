$( document ).ready(function() 
{
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
            url: '../controller/api.php',
            data: {
              funcao : "login",
              dados : objectDataLogin
            },
        })
    })
})