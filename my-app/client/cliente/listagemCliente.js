validaSessao()
$( document ).ready(function() {

    var modalEndereco = document.getElementById("modal-editar-endereco")
    var botaoNovoEndereco = document.getElementById("id-botao-novo-endereco")
    let contaEndereco = 0
    limpaCamposAoPreencher()

    const buscaTodosClientes = async function(){       
        await $.ajax({
            type: "GET",
            url: '../../server/api/cliente.php?funcao=buscarTodosClientes'    
        }).done( function (response) {

            const buscaClienteID = async function() {
                const uuid = $(this).attr("data-uuid")
        
                await $.ajax({
                    type: "GET",
                    url: `../../server/api/cliente.php?funcao=buscaUUID&uuid=${uuid}`
                }).done( function (response) {
                    $('#div-erro-'+$(this).attr("name")).empty()
                    $("#id-nome-modal").val(response.nome)
                    $("#id-email-modal").val(response.email)
                    $("#id-login-modal").val(response.login)
                    $("#id-botao-editar-cliente-modal").attr("data-uuid", response.uuid)
                    $("#id-botao-editar-senha-modal").attr("data-uuid", response.uuid)
                })
            }

            const buscaEnderecos = async function() {
                const uuid = $(this).attr("data-uuid")

                const editaEndereco = async function(){
                    const uuidEndereco = $(this).attr("data-uuid-endereco")
                    const contaEndereco = $(this).attr("data-conta-endereco")
                    const uuidCliente = $(this).attr("data-uuid-cliente")
                
                    const rua = document.getElementById(`id-rua-${contaEndereco}`).value
                    const cep = document.getElementById(`id-cep-${contaEndereco}`).value
                    const bairro = document.getElementById(`id-bairro-${contaEndereco}`).value
                    const numeroCasa = document.getElementById(`id-numero-casa-${contaEndereco}`).value
                    const complemento = document.getElementById(`id-complemento-${contaEndereco}`).value
                    const cidade = document.getElementById(`id-cidade-${contaEndereco}`).value
                    const estado = document.getElementById(`id-estado-${contaEndereco}`).value

                    const objectDataAlteraEndereco = {
                        rua: rua,
                        cep: cep,
                        bairro: bairro,
                        numeroCasa: numeroCasa,
                        complemento: complemento,
                        cidade: cidade,
                        estado: estado,
                        uuidEndereco: uuidEndereco,
                        uuidCliente: uuidCliente
                    }

                    await $.ajax({
                        type: "POST",
                        url: "../../server/api/cliente.php",
                        data: {
                            funcao: "editaEndereco",
                            dados: objectDataAlteraEndereco
                        }
                    }).done( function (response) {
                        if(response.enderecoAlterado){
                            setTimeout(location.reload(), 1000)
                            return
                        }
                        exibeErrosFormAdicionaEndereco(response, contaEndereco)
                        return
                    })
                }

                const excluiEndereco = async function() {
                    const uuidEndereco = $(this).attr("data-uuid-endereco")
                    const uuidCliente = $(this).attr("data-uuid-cliente")

                    const objectDataExcluiEndereco = {
                        uuidCliente: uuidCliente,
                        uuidEndereco: uuidEndereco
                    }

                    await $.ajax({
                        type: "DELETE",
                        url:"../../server/api/cliente.php",
                        data: {
                            funcao: "excluiEndereco",
                            dados: objectDataExcluiEndereco
                        }
                    }).done( function (response) {
                        if(response.enderecoExcluido){
                            setTimeout(location.reload(), 1000)
                            return
                        }
                        exibeErrosExcluiEndereco(response)
                        return
                    })
                }

                await $.ajax({
                    type: "GET",
                    url: `../../server/api/cliente.php?funcao=buscaEnderecosCliente&uuid=${uuid}`
                }).done( function (response) {
                    response.map((endereco) => {
                        contaEndereco += 1
                        const {uuid, rua, bairro, numeroCasa, estado, cidade, cep, ativo, complemento, uuidCliente} = endereco
                        $("#dados-endereco").append(`
                            <div class="mb-3 col-6">
                                <label for="id-cep" class="form-label">CEP:</label>
                                <input type="email" class="form-control" name="cep" id="id-cep-${contaEndereco}" value="${cep}"/>
                                <div id="div-erro-cep-${contaEndereco}" class="class-div-erro"></div>
                            </div>
                            <div class="mb-3 col-6">
                                <label for="id-numero-casa" class="form-label">Nº da casa:</label>
                                <input class="form-control" name="numero-casa" id="id-numero-casa-${contaEndereco}" value="${numeroCasa}"/>
                                <div id="div-erro-numero-casa-${contaEndereco}" class="class-div-erro"></div>
                            </div>
                            <div class="mb-3">
                                <label for="id-rua" class="form-label">Rua:</label>
                                <input type="email" class="form-control" name="rua" id="id-rua-${contaEndereco}" value="${rua}"/>
                                <div id="div-erro-rua-${contaEndereco}" class="class-div-erro"></div>
                            </div>
                            <div class="mb-3">
                                <label for="id-bairro" class="form-label">Bairro:</label>
                                <input class="form-control" name="bairro" id="id-bairro-${contaEndereco}" value="${bairro}"/>
                                <div id="div-erro-bairro-${contaEndereco}" class="class-div-erro"></div>
                            </div>
                            <div class="mb-3">
                                <label for="id-complemento" class="form-label">Complemento:</label>
                                <input class="form-control" name="completo-casa" id="id-complemento-${contaEndereco}" value="${complemento}"/>
                                <div id="div-erro-complemento-casa-${contaEndereco}" class="class-div-erro"></div>
                            </div>
                            <div class="mb-3 col-6">
                                <label for="id-cidade" class="form-label">Cidade:</label>
                                <input class="form-control" name="cidade" id="id-cidade-${contaEndereco}" value="${cidade}"/>
                                <div id="div-erro-cidade-${contaEndereco}" class="class-div-erro"></div>
                            </div>
                            <div class="mb-3 col-6">
                                <label for="id-estado" class="form-label">Estado:</label>
                                <select class="form-select estado-select" name="estado" id="id-estado-${contaEndereco}" name="estado">
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                                <div id="div-erro-estado-${contaEndereco}" class="class-div-erro"></div>
                            </div>
                            <div class="d-flex flex-row-reverse ">
                                    <button type="button" class="btn btn-primary botao-editar-endereco" data-uuid-endereco="${uuid}" data-uuid-cliente="${uuidCliente}" data-conta-endereco="${contaEndereco}">Editar</button>
                                    <button type="button" class="btn btn-danger botao-excluir-endereco" data-uuid-endereco="${uuid}" data-uuid-cliente="${uuidCliente}" data-conta-endereco="${contaEndereco}">Excluir</button>
                            </div>
                            <hr class="dropdown-divider">
                        `)

                        $(".estado-select").val(estado)
                        $("#id-botao-novo-endereco").attr("data-uuid", uuidCliente)
                        
                        return
                    })

                    $(".botao-editar-endereco").click(editaEndereco)
                    $(".botao-excluir-endereco").click(excluiEndereco)
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
                            <button type="button" data-uuid="${uuid}" class="btn btn-primary btn-sm botao-enderecos" data-bs-toggle="modal" data-bs-target="#modal-editar-endereco"">Endereços</button>
                            <button type="button" id="id-modal-editar" data-uuid="${uuid}" class="btn btn-warning btn-sm botao-editar" data-bs-toggle="modal" data-bs-target="#modal-editar-cliente">Editar</button>
                            <button type="button" data-id="${id}" class="btn btn-danger btn-sm botao-excluir">Excluir</button>
                        </td>
                    </tr>
                `
            })
            $("#exibe-clientes").append(htmlClientes)
            $(".botao-editar").click(buscaClienteID)
            $(".botao-enderecos").click(buscaEnderecos)
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

    modalEndereco.addEventListener('hidden.bs.modal', function () {
        contaEndereco = 0
        $("#dados-endereco").empty()
        $("#novo-endereco").empty()
    })

    botaoNovoEndereco.addEventListener("click", function() {
        contaEndereco += 1
        const uuidCliente = $(this).attr("data-uuid")

        const cancelaModalAddEndereco = function (){
            const enderecoN = $(this).attr("data-endereco")
            
            $(`#id-div-novo-endereco-${enderecoN}`).empty()
        }

        const adicionaEndereco = async function(e){
            e.preventDefault()
            const enderecoN = $(this).attr("data-endereco")

            const rua = document.getElementById(`id-rua-${enderecoN}`).value
            const cep = document.getElementById(`id-cep-${enderecoN}`).value
            const bairro = document.getElementById(`id-bairro-${enderecoN}`).value
            const numeroCasa = document.getElementById(`id-numero-casa-${enderecoN}`).value
            const complemento = document.getElementById(`id-complemento-${enderecoN}`).value
            const cidade = document.getElementById(`id-cidade-${enderecoN}`).value
            const estado = document.getElementById(`id-estado-${enderecoN}`).value

            const objectDataNovoEndereco = {
                rua : rua,
                cep : cep,
                bairro : bairro,
                numeroCasa : numeroCasa,
                complemento : complemento,
                cidade : cidade,
                estado : estado,
                uuidCliente : uuidCliente
            }

            await $.ajax({
                type: "POST",
                url: "../../server/api/cliente.php",
                data: {
                    funcao: "adicionaEndereco",
                    dados: objectDataNovoEndereco
                }
            }).done( function (response) {
                if(response.enderecoAdd){
                    setTimeout(location.reload(), 2000)
                    return
                }else{
                    exibeErrosFormAdicionaEndereco(response, enderecoN)
                    return
                }
            })
        }

        const completaCep = async function(e){
            e.preventDefault()
            const enderecoN = $(this).attr("data-endereco")
            const cep = document.getElementById(`id-cep-${enderecoN}`).value
            console.log(cep)
    
            await $.ajax({
                url: `https://viacep.com.br/ws/${cep}/json/`,
                dataType: 'json'
            }).done(function (res){
                    $(`#id-rua-${enderecoN}`).val(res.logradouro);
                    $(`#id-complemento-${enderecoN}`).val(res.complemento);
                    $(`#id-bairro-${enderecoN}`).val(res.bairro);
                    $(`#id-cidade-${enderecoN}`).val(res.localidade);
                    $(`#id-estado-${enderecoN}`).val(res.uf);
                    $(`#id-numero-casa-${enderecoN}`).focus();
            }).fail(function (){
                erroCepInvalido()
            })
        }

        $("#novo-endereco").append(`
                            <div id="id-div-novo-endereco-${contaEndereco}" class="col-md-12 row g-3">
                                <div class="mb-3 col-6">
                                    <label for="id-cep" class="form-label">CEP:</label>
                                    <input class="form-control input-cep" name="cep" id="id-cep-${contaEndereco}" data-endereco="${contaEndereco}"/>
                                    <div id="div-erro-cep-${contaEndereco}" class="class-div-erro"></div>
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="id-numero-casa" class="form-label">Nº da casa:</label>
                                    <input class="form-control" name="numero-casa" id="id-numero-casa-${contaEndereco}"/>
                                    <div id="div-erro-numero-casa-${contaEndereco}" class="class-div-erro"></div>
                                </div>
                                <div class="mb-3">
                                    <label for="id-rua" class="form-label">Rua:</label>
                                    <input class="form-control" name="rua" id="id-rua-${contaEndereco}"/>
                                    <div id="div-erro-rua-${contaEndereco}" class="class-div-erro"></div>
                                </div>
                                <div class="mb-3">
                                    <label for="id-bairro" class="form-label">Bairro:</label>
                                    <input class="form-control" name="bairro" id="id-bairro-${contaEndereco}"/>
                                    <div id="div-erro-bairro-${contaEndereco}" class="class-div-erro"></div>
                                </div>
                                <div class="mb-3">
                                    <label for="id-complemento" class="form-label">Complemento:</label>
                                    <input class="form-control" name="completo-casa" id="id-complemento-${contaEndereco}"/>
                                    <div id="div-erro-complemento-casa-${contaEndereco}" class="class-div-erro"></div>
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="id-cidade" class="form-label">Cidade:</label>
                                    <input class="form-control" name="cidade" id="id-cidade-${contaEndereco}"/>
                                    <div id="div-erro-cidade-${contaEndereco}" class="class-div-erro"></div>
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="id-estado" class="form-label">Estado:</label>
                                    <select class="form-select" name="estado" id="id-estado-${contaEndereco}" name="estado">
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                    </select>
                                    <div id="div-erro-estado-${contaEndereco}" class="class-div-erro"></div>
                                </div>
                                <div class="d-flex flex-row-reverse ">
                                        <button type="button" class="btn btn-primary botao-adicionar" data-endereco="${contaEndereco}">Adicionar</button>
                                        <button type="button" class="btn btn-danger botao-cancelar" data-endereco="${contaEndereco}">Cancelar</button>
                                </div>
                                <hr class="dropdown-divider">
                            </div>
                        `)

                        $(".botao-cancelar").click(cancelaModalAddEndereco)
                        $(".botao-adicionar").click(adicionaEndereco)
                        $(".input-cep").focusout(completaCep)
    })
})