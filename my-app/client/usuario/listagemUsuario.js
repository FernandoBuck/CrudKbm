$( document ).ready(function() {
    const buscaTodosUsuarios = async function(){       
        const response = await $.ajax({
            type: "GET",
            url: '../../server/api/usuario.php?funcao=buscarTodosUsuarios'    
        })
        console.log(response)
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
            //$(".botao-editar").click(buscaUsuarioID)
            //$(".bota-excluir").click(excluiUsuarioID)
    }
})