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
                        (rua,
                        bairro,
                        numeroCasa,
                        estado,
                        cidade,
                        cep,
                        ativo,
                        complemento,
                        uuidCliente)
                VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $queryEndereco->bindParam(1, $dados["rua"]);
            $queryEndereco->bindParam(2, $dados["bairro"]);
            $queryEndereco->bindParam(3, $dados["numeroCasa"]);
            $queryEndereco->bindParam(4, $dados["estado"]);
            $queryEndereco->bindParam(5, $dados["cidade"]);
            $queryEndereco->bindParam(6, $dados["cep"]);
            $queryEndereco->bindParam(7, $dados["ativo"]);
            $queryEndereco->bindParam(8, $dados["complemento"]);
            $queryEndereco->bindParam(9, $dados["uuid"]);
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

?>

