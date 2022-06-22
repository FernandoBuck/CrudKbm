<?php
include("../conexao.php");
include("../api/validacoesForms.php");
header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ################################### 

if ($method === "POST") {

    if($_POST["funcao"] == "cadastrar"){

        $dados = [
            "nome"  => $_POST["dados"]["nome"],
            "email" => $_POST["dados"]["email"],
            "login" => $_POST["dados"]["login"],
            "senha" => $_POST["dados"]["senha"],
            "confirmarSenha" => $_POST["dados"]["confirmarSenha"],
            "ativo" => "1",
            "uuid" => uniqid(rand(), true),
            "uuidEndereco" => uniqid(rand(), true),
            "cep" => $_POST["dados"]["cep"],
            "numeroCasa" => $_POST["dados"]["numeroCasa"],
            "rua"   => $_POST["dados"]["rua"],
            "bairro" => $_POST["dados"]["bairro"],
            "complemento" => $_POST["dados"]["complemento"],
            "cidade" => $_POST["dados"]["cidade"],
            "estado" => $_POST["dados"]["estado"]
        ];

        $formCadastroValidado = validaFormCadastroCliente($dados, $pdo);

        if(in_array(false, $formCadastroValidado, true) === true){
            $formCadastroValidado["clienteAdd"] = false;
            echo json_encode($formCadastroValidado);
            exit;
        }

        $dados["hashSenha"] = password_hash($dados["senha"], PASSWORD_DEFAULT);

        try
        {
            $queryCliente = $pdo->prepare("
                INSERT INTO 
                    cliente 
                        (nome, 
                        email,
                        login, 
                        senha,
                        ativo,
                        uuid) 
                VALUES 
                    (?, ?, ?, ?, ?, ?)
                ");
            $queryCliente->bindParam(1, $dados["nome"]);
            $queryCliente->bindParam(2, $dados["email"]);
            $queryCliente->bindParam(3, $dados["login"]);
            $queryCliente->bindParam(4, $dados["hashSenha"]);
            $queryCliente->bindParam(5, $dados["ativo"]);
            $queryCliente->bindParam(6, $dados["uuid"]);
            $queryCliente->execute();

            $queryEndereco = $pdo->prepare("
                INSERT INTO
                    endereco
                        (uuid, 
                        rua,
                        bairro,
                        numeroCasa,
                        estado,
                        cidade,
                        cep,
                        ativo,
                        complemento,
                        uuidCliente)
                VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $queryEndereco->bindParam(1, $dados["uuidEndereco"]);
            $queryEndereco->bindParam(2, $dados["rua"]);
            $queryEndereco->bindParam(3, $dados["bairro"]);
            $queryEndereco->bindParam(4, $dados["numeroCasa"]);
            $queryEndereco->bindParam(5, $dados["estado"]);
            $queryEndereco->bindParam(6, $dados["cidade"]);
            $queryEndereco->bindParam(7, $dados["cep"]);
            $queryEndereco->bindParam(8, $dados["ativo"]);
            $queryEndereco->bindParam(9, $dados["complemento"]);
            $queryEndereco->bindParam(10, $dados["uuid"]);
            $queryEndereco->execute();

            if( ( ( $queryCliente->rowCount() ) == 1 ) && ( $queryEndereco->rowCount() == 1 ) ){
                $formCadastroValidado["clienteAdd"] = true;
                echo json_encode($formCadastroValidado);
                exit;    
            }
            $formCadastroValidado["clienteAdd"] = false;
            echo json_encode($formCadastroValidado);
            exit;
        }catch (PDOException $erro)
        {
            echo json_encode("Erro ao inserir cliente: ".$erro);
            exit;
        }
    }

    if($_POST["funcao"] == "editarDadosCliente"){

        $dados = [
            "nome"  => $_POST["dados"]["nome"],
            "email" => $_POST["dados"]["email"],
            "login" => $_POST["dados"]["login"],
            "uuid" => $_POST["dados"]["uuid"]
        ];

        $formValidado = validaFormEditaDadosCliente($dados, $pdo);

        if(in_array(false, $formValidado, true) === true){
            $formValidado["clienteAlterado"] = false;
            echo json_encode($formValidado);
            exit;
        }

        echo json_encode(atualizaDadosCliente($dados, $pdo));
    }else

    if($_POST["funcao"] == "editarSenhaCliente"){

        $dados = [
            "senha" => $_POST["dados"]["senha"],
            "confirmaSenha" => $_POST["dados"]["confirmaSenha"],
            "uuid" => $_POST["dados"]["uuid"]
        ];

        $formValidado = validaFormAlteraSenhaCliente($dados);

        if(in_array(false, $formValidado, true) === true){
            $formValidado["senhaAlterada"] = false;
            echo json_encode($formValidado);
            exit;
        }

        $dados["hashSenha"] = password_hash($dados["senha"], PASSWORD_DEFAULT);

        echo json_encode(atualizaSenhaCliente($dados, $pdo));
    }else

    if($_POST["funcao"] == "adicionaEndereco"){

        $dados = [
            "uuidCliente" => $_POST["dados"]["uuidCliente"],
            "uuidEndereco" => uniqid(rand(), true),
            "cep" => $_POST["dados"]["cep"],
            "numeroCasa" => $_POST["dados"]["numeroCasa"],
            "rua"   => $_POST["dados"]["rua"],
            "bairro" => $_POST["dados"]["bairro"],
            "complemento" => $_POST["dados"]["complemento"],
            "cidade" => $_POST["dados"]["cidade"],
            "estado" => $_POST["dados"]["estado"],
            "ativo" => "1"
        ];

        $formCadastroValidado = validaFormAdicionaEndereco($dados);

        if(in_array(false, $formCadastroValidado, true) === true){
            $formCadastroValidado["enderecoAdd"] = false;
            echo json_encode($formCadastroValidado);
            exit;
        }

        echo json_encode(adicionaEndereco($dados, $pdo));
    }else

    if($_POST["funcao"] == "editaEndereco"){

        $dados = [
            "uuidCliente" => $_POST["dados"]["uuidCliente"],
            "uuidEndereco" => $_POST["dados"]["uuidEndereco"],
            "cep" => $_POST["dados"]["cep"],
            "numeroCasa" => $_POST["dados"]["numeroCasa"],
            "rua"   => $_POST["dados"]["rua"],
            "bairro" => $_POST["dados"]["bairro"],
            "complemento" => $_POST["dados"]["complemento"],
            "cidade" => $_POST["dados"]["cidade"],
            "estado" => $_POST["dados"]["estado"],
            "ativo" => "1"
        ];

        $formCadastroValidado = validaFormAdicionaEndereco($dados);

        if(in_array(false, $formCadastroValidado, true) === true){
            $formCadastroValidado["enderecoAlterado"] = false;
            echo json_encode($formCadastroValidado);
            exit;
        }

        echo json_encode(editaEndereco($dados, $pdo));
    }
    exit;
}else

// ################################### GET ################################### 

if ($method === "GET") {

    if($_GET["funcao"] == "buscarTodosClientes"){
        echo json_encode(buscarTodosClientes($pdo));
    }else

    if($_GET["funcao"] == "buscaUUID"){
        $uuid = $_GET["uuid"];
        echo json_encode(uuidBuscaDadosCliente($uuid, $pdo));
    }else

    if($_GET["funcao"] == "buscaEmail"){
        $email = $_GET["email"];
        try{
            $query = $pdo ->prepare("SELECT email FROM cliente WHERE email = ?");
            $query->bindParam(1, $email);
            $query->execute();
            $result = $query->rowCount();
            if($result == 1){
                echo json_encode(array("clienteCadastrado" => true));
                exit;
            }
            echo json_encode(array("clienteCadastrado" => false));
            exit;
        }catch(PDOException $erro)
        {
            echo "Erro ao buscar email: ".$erro;
        }
    }else

    if($_GET["funcao"] == "buscaEnderecosCliente"){
        $uuid = $_GET["uuid"];
        echo json_encode(uuidBuscaEnderecosCliente($uuid, $pdo));
    }

    exit;
}else

// ################################### DELETE ###################################
if ($method === "DELETE") {

    parse_str(file_get_contents("php://input"), $_DELETE);

    if($_DELETE["funcao"] == "excluirCliente"){
        $idCliente = $_DELETE["id"];
        
        try{
            $query = $pdo->prepare("DELETE FROM cliente WHERE id = ?");
            $query->bindParam(1, $idCliente);
            $query->execute();
            $clienteExcluido = $query->rowCount();
            if($clienteExcluido == 1){
                echo json_encode(array("clienteExcluido" => true));
                exit;    
            }
            echo json_encode(array("clienteExcluido" => false));
            exit;
        }catch (PDOException $erro)
        {
            echo "Erro ao buscar cliente: ".$erro;
        }
    }else

    if($_DELETE["funcao"] == "excluiEndereco"){
        $dados = [
            "uuidCliente" => $_DELETE["dados"]["uuidCliente"],
            "uuidEndereco" => $_DELETE["dados"]["uuidEndereco"]
        ];

        if(validaUmEndereco($dados, $pdo)){
            echo json_encode(array("umEndereco" => true, "enderecoExcluido" => false)); 
            return;
        }

        echo json_encode(excluiEndereco($dados, $pdo));
    }
    exit;
}

// ################################### Querys Cliente ###################################

function buscarTodosClientes($pdo){
    try{
        $query = $pdo->prepare("SELECT id, nome, email, login, uuid FROM cliente");
        $query->execute();
        $clientes = $query->fetchAll(PDO::FETCH_ASSOC);
        return $clientes;
    }catch (PDOException $erro)
    {
        return ("Erro ao buscar cliente: ".$erro);
    }
}

function uuidBuscaDadosCliente($uuid, $pdo){
    try{
        $query = $pdo->prepare("SELECT nome, email, login, ativo, uuid FROM cliente WHERE uuid = ?");
        $query->bindParam(1, $uuid);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }catch (PDOException $erro)
    {
        return ("Erro ao buscar cliente: ".$erro);
    }
}

function atualizaDadosCliente($dados, $pdo){
    try{
        $query = $pdo->prepare("
        UPDATE 
            cliente 
        SET 
            nome = ?, email = ?, login = ? 
        WHERE 
            (uuid = ?); 
        ");
        $query->bindParam(1, $dados["nome"]);
        $query->bindParam(2, $dados["email"]);
        $query->bindParam(3, $dados["login"]);
        $query->bindParam(4, $dados["uuid"]);
        $query->execute();

        if(($query->rowCount()) == 1){
            return (array("clienteAlterado" => true));
        }
        return (array("clienteAlterado" => false));
    }catch(PDOException $erro)
    {
        return ("Erro ao atualizar cliente: ".$erro);
    }
}

function atualizaSenhaCliente($dados, $pdo){
    try{
        $query = $pdo->prepare("
            UPDATE 
                cliente 
            SET 
                senha = ? 
            WHERE 
                (uuid = ?);"
        );
        $query->bindParam(1, $dados["hashSenha"]);
        $query->bindParam(2, $dados["uuid"]);
        $query->execute();

        if(($query->rowCount()) == 1){
            $dados["senhaAlterada"] = true;
            return $dados;
        }
        $dados["senhaAlterada"] = false;
        return $dados;
    }catch(PDOException $erro)
    {
        $dados["senhaAlterada"] = false;
        $dados["erro"] = $erro;
        return $dados;
    }
}

function uuidBuscaEnderecosCliente($uuid, $pdo){
    try{
        $query = $pdo->prepare("
                    SELECT 
                        uuid, rua, bairro, numeroCasa, estado, cidade, cep, ativo, complemento, uuidCliente 
                    FROM 
                        endereco
                    WHERE 
                        uuidCliente = ?
                "
        );
        $query->bindParam(1, $uuid);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }catch(PDOException $erro)
    {
        return ("Erro ao buscar endereco: ".$erro);
    }
}

function adicionaEndereco($dados, $pdo){
    try{
        $query = $pdo->prepare("
                INSERT INTO
                    endereco
                        (uuid, 
                        rua,
                        bairro,
                        numeroCasa,
                        estado,
                        cidade,
                        cep,
                        ativo,
                        complemento,
                        uuidCliente)
                VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $query->bindParam(1, $dados["uuidEndereco"]);
            $query->bindParam(2, $dados["rua"]);
            $query->bindParam(3, $dados["bairro"]);
            $query->bindParam(4, $dados["numeroCasa"]);
            $query->bindParam(5, $dados["estado"]);
            $query->bindParam(6, $dados["cidade"]);
            $query->bindParam(7, $dados["cep"]);
            $query->bindParam(8, $dados["ativo"]);
            $query->bindParam(9, $dados["complemento"]);
            $query->bindParam(10, $dados["uuidCliente"]);
            $query->execute();

            if(($query->rowCount()) == 1){
                return (array("enderecoAdd" => true));
            }
            return (array("enderecoAdd" => false));
    }catch (PDOException $erro)
    {
        return (array("erro" => $erro));
    }
}

function editaEndereco($dados, $pdo){
    try{
        $query= $pdo->prepare("
            UPDATE
                endereco
            SET
                rua = ?, 
                bairro = ?, 
                numeroCasa = ?,
                estado = ?, 
                cidade = ?, 
                cep = ?,
                complemento = ? 
            WHERE
                uuid = ?
            AND
                uuidCliente = ?
        ");
        $query->bindParam(1, $dados["rua"]);
        $query->bindParam(2, $dados["bairro"]);
        $query->bindParam(3, $dados["numeroCasa"]);
        $query->bindParam(4, $dados["estado"]);
        $query->bindParam(5, $dados["cidade"]);
        $query->bindParam(6, $dados["cep"]);
        $query->bindParam(7, $dados["complemento"]);
        $query->bindParam(8, $dados["uuidEndereco"]);
        $query->bindParam(9, $dados["uuidCliente"]);
        $query->execute();

        if(($query->rowCount()) == 1){
            return (array("enderecoAlterado" => true));
        }
        return (array("enderecoAlterado" => false));
    }catch (PDOException $erro){
        return (array(
                        "erro" => $erro,
                        "enderecoAlterado" => false
                    ));
    }
}

function excluiEndereco($dados, $pdo){
    try{
        $query = $pdo->prepare("
            DELETE FROM
                endereco
            WHERE
                uuid = ?
            AND
                uuidCliente = ?
        ");
        $query->bindParam(1, $dados["uuidEndereco"]);
        $query->bindParam(2, $dados["uuidCliente"]);
        $query->execute();

        if(($query->rowCount()) == 1)return(array("enderecoExcluido" => true));
        return(array("enderecoExcluido" => false));
    }catch (PDOException $erro){
        return (array(
                        "erro" => $erro,
                        "enderecoExcluido" => false
                    ));
    }
}
?>

