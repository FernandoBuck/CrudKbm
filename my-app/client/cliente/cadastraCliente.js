validaSessao()
$( document ).ready(function() 
{
    limpaCamposAoPreencher()
    $("#botao-cadastro-cliente").click(async function(e){
        e.preventDefault()
        const nome = document.getElementById("id-nome").value
        const email = document.getElementById("id-email").value
        const login = document.getElementById("id-login").value
        const senha = document.getElementById("id-senha").value
        const confirmarSenha = document.getElementById("id-confirmar-senha").value
        const rua = document.getElementById("id-rua").value
        const cep = document.getElementById("id-cep").value
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
            confirmarSenha : confirmarSenha,
            rua : rua,
            cep : cep,
            bairro : bairro,
            numeroCasa : numeroCasa,
            complemento : complemento,
            cidade : cidade,
            estado : estado
        }

        await $.ajax({
            type : "POST",
            url : "../../server/api/cliente.php",
            data : {
                funcao : "cadastrar",
                dados : objectDataCadastro
            }
        }).done( function (response) {
            if(response.clienteAdd){
                setTimeout(location.reload(), 2000)
                return
            }else{
                exibeErrosFormCliente(response)
                return
            }
        })
    })

    $("#id-cep").focusout(async function(e){
        e.preventDefault()
        const cep = document.getElementById("id-cep").value

        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            dataType: 'json'
        }).done(function (res){
                $("#id-rua").val(res.logradouro);
                $("#id-complemento").val(res.complemento);
                $("#id-bairro").val(res.bairro);
                $("#id-cidade").val(res.localidade);
                $("#id-estado").val(res.uf);
                $("#id-numero-casa").focus();
        }).fail(function (){
            erroCepInvalido()
        })
    })
})