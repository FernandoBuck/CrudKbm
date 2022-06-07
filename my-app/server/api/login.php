<?php
require("../conexao.php");
require("../api/validacoesForms.php");
require("../api/manipulaSessoes.php");
header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ###################################

if ($method === "POST") {

    if($_POST["funcao"] == "validaLogin"){
        
        $dados = [
            "login" => $_POST["dados"]["login"],
            "senha" => $_POST["dados"]["senha"]
        ];

        $objectDataLogin = validaFormLogin($dados);

        //Requer que todos sejam true
        if(in_array(false, $objectDataLogin, true) === true){
            $objectDataLogin["loginValido"] = false;
            echo json_encode($objectDataLogin);
            exit;
        }

        try{
            $query = $pdo->prepare("SELECT login 
                                    FROM usuario 
                                    WHERE login= ? 
                                    AND senha= ?");
            $query->bindParam(1, $dados["login"]);
            $query->bindParam(2, $dados["senha"]);
            $query->execute();
            if(($query->rowCount()) == 1){
                $objectDataLogin = criaSessaoLogado($dados["login"], $pdo);
                echo json_encode($objectDataLogin);
                exit;
            }
            $objectDataLogin["loginValido"] = false;
            echo json_encode($objectDataLogin);
        }catch(PDOException $erro){
            $objectDataLogin["loginValido"] = false;
            $objectDataLogin["erro"] = $erro;
            echo json_encode($objectDataLogin);
        }
    }
}

// ################################### GET ###################################

if ($method === "GET") {
    
    if($_GET["funcao"] == "validaSessao"){
        $dados = [
            "login" => $_GET["login"],
            "hash" => $_GET["hash"],
            "timeStamp" => time()
        ];
        
        $validaSessao = validaSessaoAtiva($dados["login"], $dados["hash"], $dados["timeStamp"], $pdo);
        echo json_encode($validaSessao);
    }
}

?>