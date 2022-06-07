validaSessao()
$( document ).ready(function() {
    const buscaTodosClientes = async function(){       
        const response = await $.ajax({
            type: "GET",
            url: '../../server/api/cliente.php?funcao=buscarTodosClientes'    
        })
        renderizaHTMLlistaClientes(response)
    }
    buscaTodosClientes()

    const renderizaHTMLlistaClientes = (response) => {
        const htmlClientes = response.map((cliente) => {
        const {id, nome, email, login} = cliente
        return `
            <tr>
                <th scope="row" id="id-idCliente-busca">${id}</th>
                <td id="id-nome-busca">${nome}</td>
                <td id="id-login-busca">${login}</td>
                <td id="id-email-busca">${email}</td>
                <td id="id-endereco-busca">---</td> 
                <td>
                    <button type="button" data-id="${id}" class="btn btn-warning btn-sm botao-editar" data-bs-toggle="modal" data-bs-target="#modal-editar-cliente">Editar</button>
                    <button type="button" data-id="${id}" class="btn btn-danger btn-sm bota-excluir">Excluir</button>
                </td>
            </tr>
        `
        })
        $("#exibe-clientes").append(htmlClientes)
        $(".botao-editar").click(buscaClienteID)
        $(".bota-excluir").click(excluiClienteID)
    }

    const buscaClienteID = async function() {
        const id = $(this).attr("data-id")

        const response = await $.ajax({
            type: "GET",
            url: `../../server/api/cliente.php?funcao=buscaID&id=${id}`,
        })

        const nomeModal = response.nome
        const emailModal = response.email
        const loginModal = response.login
        const senhaModal = response.senha
        const senhaConfirmaModal = senhaModal

        $("#id-nome-modal").val(nomeModal)
        $("#id-email-modal").val(emailModal)
        $("#id-login-modal").val(loginModal)
        $("#id-senha-modal").val(senhaModal)
        $("#id-confirma-senha-modal").val(senhaConfirmaModal)

        $("#botao-editar-cliente-modal").click(async function(e){
            e.preventDefault()
    
            const editaNomeModal = document.getElementById("id-nome-modal").value
            const editaEmailModal = document.getElementById("id-email-modal").value
            const editaLoginModal = document.getElementById("id-login-modal").value
            const editaSenhaModal = document.getElementById("id-senha-modal").value
            const editaConfirmaSenhaModal = document.getElementById("id-confirma-senha-modal").value

            const objectDataAlteraCadastroModal = {
                nome : editaNomeModal,
                email : editaEmailModal,
                login : editaLoginModal,
                senha : editaSenhaModal,
                confirmaSenha : editaConfirmaSenhaModal,
                id : id
            }

            const response = await $.ajax({
                type: "POST",
                url: "../../server/api/cliente.php",
                data: {
                    funcao : "editarCliente",
                    dados : objectDataAlteraCadastroModal
                }
            })
            if(response.clienteAlterado){
                setTimeout(location.reload(), 2000)
                return
            }
            alert("Algo deu errado!")
        })
    }

    const excluiClienteID = async function() {
        const id = $(this).attr("data-id")
        
        const response = await $.ajax({
            type: "DELETE",
            url: "../../server/api/cliente.php",
            data: {
                funcao : "excluirCliente",
                id : id
            }
        })
        if(response.clienteExcluido){
            setTimeout(location.reload(), 2000)
            return
        }
        alert("Algo deu errado!")
    }
})