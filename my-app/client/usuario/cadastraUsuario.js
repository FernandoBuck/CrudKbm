$( document ).ready(function() 
{
    $("#id-botao-cadastro-usuario").click(async function(e)
    {
        e.preventDefault()

        const nome = document.getElementById("id-nome").value
        const email = document.getElementById("id-email").value
        const login = document.getElementById("id-login").value
        const senha = document.getElementById("id-senha").value
        const confirmarSenha = document.getElementById("id-confirmar-senha").value

        validarCamposPreenchidos()

    })

    $("input").change(function(){
        $('#div-erro-'+$(this).attr("name")).empty()
    })
})