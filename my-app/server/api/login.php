<?php
include("../conexao.php");
include("../api/validacoes.php");
header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ###################################

if ($method === "POST") {

    if($_POST["funcao"] == "validaLogin"){
        
        $dados = [
            "login" => $_POST["dados"]["login"],
            "senha" => $_POST["dados"]["senha"]
        ];

        if(loginUsuarioDisponivel($dados["login"], $pdo)){
            try{
                $query = $pdo->prepare("SELECT login 
                                        FROM usuario 
                                        WHERE login= ? 
                                        AND senha= ?");
                $query->bindParam(1, $dados["login"]);
                $query->bindColumn(2, $dados["senha"]);
                $query->execute();
                $encontrado = $query->rowCount();
                if($encontrado == 1){
                    $sessao = criaSessaoLogado($dados["login"], $pdo);
                    echo json_encode($sessao);
                    exit;
                }
                
                exit;
            }catch(PDOException $erro){
                $dados["erroAoConsultar"] = $erro;
            }
        }elseif(loginClienteDisponivel($dados["login"], $pdo)){
            try{
                $query = $pdo->prepare("SELECT login 
                                        FROM cliente 
                                        WHERE login= ? 
                                        AND senha= ?");
                $query->bindParam(1, $dados["login"]);
                $query->bindColumn(2, $dados["senha"]);
                $query->execute();
                $encontrado = $query->rowCount();
                if($encontrado == 1){
                    echo json_encode(true);
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
        
        if(in_array(false, $validaSessao, true) === true){
            echo json_encode();
            exit;
        }
    }
}

// ################################### Banco Login ###################################

function validaSessaoAtiva($hash, $login, $timeStamp, $pdo){
    try{
        $query = $pdo->prepare("
            SELECT 
                hash, 
                timestamp, 
                login 
            FROM 
                logados 
            WHERE 
                hash= ? 
            AND 
                login= ?
            ");
        $query->bindParam(1, $hash);
        $query->bindParam(2, $login);
        $query->excute();
        if(($query->rowCount()) == 1){
            $sessao = $query->fetch(PDO::FETCH_ASSOC);
            $horasLogado =  $timeStamp - ($sessao["timestamp"]);
            if($horasLogado >= 86400){
                
            }
        }
        return false;
    }catch(PDOException $erro){
        echo "Erro ao procurar sessão: ".$erro;
        exit;
    }
}

function criaSessaoLogado($login, $pdo){

}

?>