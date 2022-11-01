<?php
include("../conexao.php");
header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ################################### 

if ($method === "POST") {

    if($_POST["funcao"] == "cadastrar"){

        $dados = [
            "nome"      => $_POST["dados"]["nome"],
            "email"     => $_POST["dados"]["email"],
            "login"     => $_POST["dados"]["login"],
            "senha"     => $_POST["dados"]["senha"],
            "confirmaSenha" => $_POST["dados"]["confirmaSenha"],
            "ativo"     => 1,
            "permissao"  => 1
        ];
        
        $formValidado = validaFormCadastroUsuario($dados, $pdo);

        if(in_array(false, $formValidado, true) === true){
            $formValidado["clienteAdd"] = false;
            echo json_encode($formValidado);
            exit;
        }

        $dados["hashSenha"] = password_hash($dados["senha"], PASSWORD_DEFAULT);

        try
        {
            $query = $pdo->prepare("
                INSERT INTO 
                    usuario 
                    (login, 
                    senha,
                    email, 
                    permissao,
                    ativo,
                    nome) 
                VALUES 
                    (?, ?, ?, ?, ?, ?)
                ");
            $query->bindParam(1, $dados["login"]);
            $query->bindParam(2, $dados["hashSenha"]);
            $query->bindParam(3, $dados["email"]);
            $query->bindParam(4, $dados["permissao"]);
            $query->bindParam(5, $dados["ativo"]);
            $query->bindParam(6, $dados["nome"]);
            $query->execute();
            $usuarioAdd = $query->rowCount();
            if($usuarioAdd == 1){
                echo json_encode(array("usuarioAdd" => true));
                exit;    
            }
            echo json_encode(array("usuarioAdd" => false));
            exit;
        }catch (PDOException $erro)
        {
            echo "Erro ao inserir usuario: ".$erro;
            exit;
        }
    }

    if($_POST["funcao"] == "editarUsuario"){
        $nome = $_POST["dados"]["nome"];
        $email = $_POST["dados"]["email"];
        $login = $_POST["dados"]["login"];
        $senha = $_POST["dados"]["senha"];
        $confirmaSenha = $_POST["dados"]["confirmaSenha"];
        $idUsuario = $_POST["dados"]["id"];

        try
        {
            $query = $pdo->prepare("
            UPDATE 
                usuario 
            SET 
                nome = ?, email = ?, login = ?, senha = ? 
            WHERE 
                (id = ?); 
            ");
            $query->bindParam(1, $nome);
            $query->bindParam(2, $email);
            $query->bindParam(3, $login);
            $query->bindParam(4, $senha);
            $query->bindParam(5, $idUsuario);
            $query->execute();
            $usuarioEditado = $query->rowCount();
            if($usuarioEditado == 1){
                echo json_encode(array("usuarioAlterado" => true));
                exit;    
            }
            echo json_encode(array("usuarioAlterado" => false));
            exit;
        }catch(PDOException $erro)
        {
            echo "Erro ao alterar usuario: ".$erro;
        }
    }
    exit;
}else

// ################################### GET ###################################

if ($method === "GET") {
    if($_GET["funcao"] == "buscarTodosUsuarios"){
        try
        {
            $query = $pdo->prepare("SELECT * FROM usuario");
            $query->execute();
            $usuarios = $query->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($usuarios);
        }catch (PDOException $erro)
        {
            echo "Erro ao buscar usuario: ".$erro;
        }
    }

    if($_GET["funcao"] == "buscaID"){
        $id = $_GET["id"];
        try{
            $query = $pdo->prepare("SELECT * FROM usuario WHERE id = ?");
            $query->bindParam(1, $id);
            $query->execute();
            $usuario = $query->fetch(PDO::FETCH_ASSOC);
            echo json_encode($usuario);
        }catch (PDOException $erro)
        {
            echo "Erro ao buscar usuario: ".$erro;
        }
    }
    exit;
}

// ################################### DELETE ###################################

if ($method === "DELETE") {

    parse_str(file_get_contents("php://input"), $_DELETE);

    if($_DELETE["funcao"] == "excluirUsuario"){
        $idUsuario = $_DELETE["id"];
        
        try{
            $query = $pdo->prepare("DELETE FROM usuario WHERE id = ?");
            $query->bindParam(1, $idUsuario);
            $query->execute();
            $usuarioExcluido = $query->rowCount();
            if($usuarioExcluido == 1){
                echo json_encode(array("usuarioExcluido" => true));
                exit;    
            }
            echo json_encode(array("usuarioExcluido" => false));
            exit;
        }catch (PDOException $erro)
        {
            echo "Erro ao buscar usuario: ".$erro;
        }
    }
    exit;
}
?>
?>