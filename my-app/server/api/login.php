<?php
include("../conexao.php");
include("../api/validacoesForms.php");
include("../api/manipulaSessoes.php");
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

        if(loginUsuarioDisponivel($dados["login"], $pdo)){
            try{
                $query = $pdo->prepare("SELECT login 
                                        FROM usuario 
                                        WHERE login= ? 
                                        AND senha= ?");
                $query->bindParam(1, $dados["login"]);
                $query->bindColumn(2, $dados["senha"]);
                $query->execute();
                if(($query->rowCount()) == 1){
                    $sessao = criaSessaoLogado($dados["login"], $pdo);
                    echo json_encode($sessao);
                    exit;
                }
                
                exit;
            }catch(PDOException $erro){
                $dados["erroAoConsultar"] = $erro;
            }
        }
    }
}else

// ################################### GET ###################################

if ($method === "GET") {
    
    if($_GET["funcao"] == "validaSessao"){
        $dados = [
            "login" => $_GET["dados"]["login"],
            "hash" => $_GET["dados"]["hash"],
            "timeStamp" => time()
        ];
        
        $validaSessao = validaSessaoAtiva($dados["login"], $dados["hash"], $dados["timeStamp"], $pdo);
        
        //if(in_array(false, $validaSessao, true) === true){
        //    echo json_encode();
        //    exit;
        //}
    }
}

?>