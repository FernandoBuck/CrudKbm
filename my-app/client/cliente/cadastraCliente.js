$( document ).ready(function() 
{
    $("#botao-cadastro-cliente").click(async function(e)
    {
        e.preventDefault()
        const nome = document.getElementById("id-nome").value
        const email = document.getElementById("id-email").value
        const login = document.getElementById("id-login").value
        const senha = document.getElementById("id-senha").value
        const confirmarSenha = document.getElementById("id-confirmar-senha").value
        const rua = document.getElementById("id-rua").value
        const bairro = document.getElementById("id-bairro").value
        const numeroCasa = document.getElementById("id-numero-casa").value
        const complemento = document.getElementById("id-complemento").value
        const cidade = document.getElementById("id-cidade").value
        const estado = document.getElementById("id-estado").value

        const objectDataCadastro = {
            nome : nome,
            email : email,
            login : login,
            senha : senha,
            rua : rua,
            bairro : bairro,
            numeroCasa : numeroCasa,
            complemento : complemento,
            cidade : cidade,
            estado : estado
        }

        const response = await $.ajax({
            type : "POST",
            url : "../../server/api/cliente.php",
            data : {
                funcao : "cadastrar",
                dados : objectDataCadastro
            }
        })
        if(response.clienteAdd){
            setTimeout(location.reload(), 2000)
            return
        }
        alert("Algo deu errado!")
    })
})