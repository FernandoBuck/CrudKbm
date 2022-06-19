validaSessao()
$( document ).ready(function() {

    limpaCamposAoPreencher()
    const buscaTodosClientes = async function(){       
        await $.ajax({
            type: "GET",
            url: '../../server/api/cliente.php?funcao=buscarTodosClientes'    
        }).done( function (response) {

            const buscaClienteID = async function() {
                const uuid = $(this).attr("data-uuid")
        
                const response = await $.ajax({
                    type: "GET",
                    url: `../../server/api/cliente.php?funcao=buscaUUID&uuid=${uuid}`,
                }).done( function (response) {
                    $('#div-erro-'+$(this).attr("name")).empty()
                    $("#id-nome-modal").val(response.nome)
                    $("#id-email-modal").val(response.email)
                    $("#id-login-modal").val(response.login)
                    $("#id-botao-editar-cliente-modal").attr("data-uuid", response.uuid)
                    $("#id-botao-editar-senha-modal").attr("data-uuid", response.uuid)
                })
            }

            const htmlClientes = response.map((cliente) => {
                const {id, nome, email, login, uuid} = cliente
                return `
                    <tr>
                        <th scope="row" id="id-idCliente-busca">${id}</th>
                        <td id="id-nome-busca">${nome}</td>
                        <td id="id-login-busca">${login}</td>
                        <td id="id-email-busca">${email}</td>
                        <td>
                            <button type="button" data-id="${id}" class="btn btn-primary btn-sm botao-enderecos">Endereços</button>
                            <button type="button" id="id-modal-editar" data-uuid="${uuid}" class="btn btn-warning btn-sm botao-editar" data-bs-toggle="modal" data-bs-target="#modal-editar-cliente">Editar</button>
                            <button type="button" data-id="${id}" class="btn btn-danger btn-sm botao-excluir">Excluir</button>
                        </td>
                    </tr>
                `
            })
            $("#exibe-clientes").append(htmlClientes)
            $(".botao-editar").click(buscaClienteID)
            $(".botao-excluir").click(excluiClienteID)
        })
    }
    buscaTodosClientes()

    $("#id-botao-editar-cliente-modal").click(async function(e){
        e.preventDefault()

        const editaNomeModal = document.getElementById("id-nome-modal").value
        const editaEmailModal = document.getElementById("id-email-modal").value
        const editaLoginModal = document.getElementById("id-login-modal").value
        const editaUuidModal = $(this).attr("data-uuid")

        const objectDataAlteraCadastroModal = {
            nome : editaNomeModal,
            email : editaEmailModal,
            login : editaLoginModal,
            uuid : editaUuidModal
        }

        await $.ajax({
            type: "POST",
            url: "../../server/api/cliente.php",
            data: {
                funcao : "editarDadosCliente",
                dados : objectDataAlteraCadastroModal
            }
        }).done( function (response) {
            if(response.clienteAlterado){
                setTimeout(location.reload(), 1000)
                return
            }else{
                exibeErrosFormEditCliente(response)
                return
            }
        }).fail( function () {
            alert("Algo deu errado!")
        })
        
        
    })

    $("#id-botao-editar-senha-modal").click(async function(e){
        e.preventDefault()

        const editaSenhaModal = document.getElementById("id-senha-modal").value
        const editaConfirmaSenhaModal = document.getElementById("id-confirma-senha-modal").value
        const editaUuidModal = $(this).attr("data-uuid")

        const objectDataAlteraSenhaModal = {
            senha : editaSenhaModal,
            confirmaSenha : editaConfirmaSenhaModal,
            uuid : editaUuidModal
        }

        await $.ajax({
            type: "POST",
            url: "../../server/api/cliente.php",
            data: {
                funcao : "editarSenhaCliente",
                dados : objectDataAlteraSenhaModal
            }
        }).done(function (response) {
            if(response.senhaAlterada){
                setTimeout(location.reload(), 2000)
                return
            }
            exibeErrosEditaSenha(response)
            return
        }).fail( function (){
            alert("Algo deu errado!")
        })
    })

    const excluiClienteID = async function() {
        const id = $(this).attr("data-id")
        
        await $.ajax({
            type: "DELETE",
            url: "../../server/api/cliente.php",
            data: {
                funcao : "excluirCliente",
                id : id
            }
        }).done(function (response){
            if(response.clienteExcluido){
                setTimeout(location.reload(), 2000)
                return
            }
            alert("Algo deu errado!")
        })
    }
})