validaSessaoIndex()
$( document ).ready(function() {

    $("#botao-login").click(async function(e){
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
            }
        })

        if(response.loginValido){
            localStorage.setItem("hash", response.hash)
            localStorage.setItem("login", response.login)
            window.location.href = "../../client/home/home.html"
        }else{
            exibeErrosFormLogin(response)
        }
    })

    limpaCamposAoPreencher()
})