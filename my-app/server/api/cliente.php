<?php
include("../conexao.php");
include("../api/validacoes.php");
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
            "ativo" => 1
        ];

        $formCadastroValidado = validaFormCadastroCliente($dados);

        if(in_array(false, $formCadastroValidado, true) === true){
            $formCadastroValidado["clienteAdd"] = false;
            echo json_encode($formCadastroValidado);
            exit;
        }

        try
        {
            $query = $pdo->prepare("
                INSERT INTO 
                    cliente 
                    (nome, 
                    email,
                    login, 
                    senha,
                    ativo) 
                VALUES 
                    (?, ?, ?, ?, ?)
                ");
            $query->bindParam(1, $dados["nome"]);
            $query->bindParam(2, $dados["email"]);
            $query->bindParam(3, $dados["login"]);
            $query->bindParam(4, $dados["senha"]);
            $query->bindParam(5, $dados["ativo"]);
            $query->execute();
            $clienteAdd = $query->rowCount();
            if($clienteAdd == 1){
                $formCadastroValidado["clienteAdd"] = true;
                echo json_encode($formCadastroValidado);
                exit;    
            }
            $formCadastroValidado["clienteAdd"] = false;
            echo json_encode($formCadastroValidado);
            exit;
        }catch (PDOException $erro)
        {
            echo "Erro ao inserir cliente: ".$erro;
            exit;
        }
    }

    if($_POST["funcao"] == "editarCliente"){
        $nome = $_POST["dados"]["nome"];
        $email = $_POST["dados"]["email"];
        $login = $_POST["dados"]["login"];
        $senha = $_POST["dados"]["senha"];
        $confirmaSenha = $_POST["dados"]["confirmaSenha"];
        $idCliente = $_POST["dados"]["id"];

        try
        {
            $query = $pdo->prepare("
            UPDATE 
                cliente 
            SET 
                nome = ?, email = ?, login = ?, senha = ? 
            WHERE 
                (id = ?); 
            ");
            $query->bindParam(1, $nome);
            $query->bindParam(2, $email);
            $query->bindParam(3, $login);
            $query->bindParam(4, $senha);
            $query->bindParam(5, $idCliente);
            $query->execute();
            $clienteEditado = $query->rowCount();
            if($clienteEditado == 1){
                echo json_encode(array("clienteAlterado" => true));
                exit;    
            }
            echo json_encode(array("clienteAlterado" => false));
            exit;
        }catch(PDOException $erro)
        {
            echo "Erro ao alterar cliente: ".$erro;
        }
    }
    exit;
}
// ################################### GET ################################### 

if ($method === "GET") {

    if($_GET["funcao"] == "buscarTodosClientes"){
        try
        {
            $query = $pdo->prepare("SELECT * FROM cliente");
            $query->execute();
            $clientes = $query->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($clientes);
        }catch (PDOException $erro)
        {
            echo "Erro ao buscar cliente: ".$erro;
        }
    }

    if($_GET["funcao"] == "buscaID"){
        $id = $_GET["id"];
        try{
            $query = $pdo->prepare("SELECT * FROM cliente WHERE id = ?");
            $query->bindParam(1, $id);
            $query->execute();
            $cliente = $query->fetch(PDO::FETCH_ASSOC);
            echo json_encode($cliente);
        }catch (PDOException $erro)
        {
            echo "Erro ao buscar cliente: ".$erro;
        }
    }
    exit;
}

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
?>