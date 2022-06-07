validaSessao()
$( document ).ready(function() {
    const buscaTodosUsuarios = async function(){       
        const response = await $.ajax({
            type: "GET",
            url: '../../server/api/usuario.php?funcao=buscarTodosUsuarios'    
        })
        renderizaHTMLlistaUsuarios(response)
    }
    buscaTodosUsuarios()

    const renderizaHTMLlistaUsuarios = (response) => {
        const htmlUsuarios = response.map((usuario) => {
            const {id, nome, email, login} = usuario
            return `
                <tr>
                    <th scope="row" id="id-idUsuario-busca">${id}</th>
                    <td id="id-nome-busca">${nome}</td>
                    <td id="id-login-busca">${login}</td>
                    <td id="id-email-busca">${email}</td>
                    <td>
                        <button type="button" data-id="${id}" class="btn btn-warning btn-sm botao-editar" data-bs-toggle="modal" data-bs-target="#modal-editar-usuario">Editar</button>
                        <button type="button" data-id="${id}" class="btn btn-danger btn-sm bota-excluir">Excluir</button>
                    </td>
                </tr>
            `
            })
            $("#exibe-usuarios").append(htmlUsuarios)
            $(".botao-editar").click(buscaUsuarioID)
            $(".bota-excluir").click(excluiUsuarioID)
    }

    const buscaUsuarioID = async function() {
        const id = $(this).attr("data-id")

        const response = await $.ajax({
            type: "GET",
            url: `../../server/api/usuario.php?funcao=buscaID&id=${id}`,
        })
        console.log(response)
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

        $("#botao-editar-usuario-modal").click(async function(e){
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
                url: "../../server/api/usuario.php",
                data: {
                    funcao : "editarUsuario",
                    dados : objectDataAlteraCadastroModal
                }
            })
            if(response.usuarioAlterado){
                setTimeout(location.reload(), 2000)
                return
            }
            alert("Algo deu errado!")
        })
    }

    const excluiUsuarioID = async function() {
        const id = $(this).attr("data-id")
        
        const response = await $.ajax({
            type: "DELETE",
            url: "../../server/api/usuario.php",
            data: {
                funcao : "excluirUsuario",
                id : id
            }
        })
        if(response.usuarioExcluido){
            setTimeout(location.reload(), 2000)
            return
        }
        alert("Algo deu errado!")
    }
})