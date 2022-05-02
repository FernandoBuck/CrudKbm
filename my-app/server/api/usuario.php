<?php
include("../conexao.php");
header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ################################### 

if ($method === "POST") {

    if($_POST["funcao"] == "cadastrar"){
        $nome = $_POST["dados"]["nome"];
        $email = $_POST["dados"]["email"];
        $login = $_POST["dados"]["login"];
        $senha = $_POST["dados"]["senha"];
        $confirmaSenha = $_POST["dados"]["confirmaSenha"];
        $ativo = 1;
        $permissa = 1;

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
            $query->bindParam(1, $login);
            $query->bindParam(2, $senha);
            $query->bindParam(3, $email);
            $query->bindParam(4, $permissa);
            $query->bindParam(5, $ativo);
            $query->bindParam(6, $nome);
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
}


?>