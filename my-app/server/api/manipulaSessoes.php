<?php

function validaSessaoAtiva($hash, $login, $timeStamp, $pdo){
    define("umDiaEmSegundos", 86400);
    try{
        $query = $pdo->prepare("
            SELECT 
                hash, 
                timestamp, 
                login 
            FROM 
                sessoesativas 
            WHERE 
                hash= ? 
            AND 
                login= ?
            LIMIT 1
            ");
        $query->bindParam(1, $hash);
        $query->bindParam(2, $login);
        $query->excute();
        if(($query->rowCount()) == 1){
            $sessao = $query->fetch(PDO::FETCH_ASSOC);
            $horasLogado =  $timeStamp - ($sessao["timestamp"]);
            if($horasLogado >= umDiaEmSegundos){
                deletaSessaoLogado($login, $pdo);
                return false;
            }
            return true;
        }
        return false;
    }catch(PDOException $erro){
        echo "Erro ao procurar sessão: ".$erro;
        return false;
    }
}

function criaSessaoLogado($login, $pdo){
    $timeStamp = time();
    $hash = hash("whirlpool", $login . time(), false);
    try{
        $query = $pdo->prepare("
                    INSERT INTO 
                        sessoesativas 
                            (hash, 
                            timestamp, 
                            login) 
                        VALUES 
                            (?,
                            ?,
                            ?)"
                    );
        $query->bindParam(1, $hash);
        $query->bindParam(2, $timeStamp);
        $query->bindParam(3, $login);
        $query->excute();
        if(($query->rowCount() == 1)){
            $sessao = [
                "loginValido"   => true,
                "hash"          => $hash,
                "login"         => $login
            ];
            return $sessao;
        }
        $sessao = ["loginValido" => false];
        return $sessao;
    }catch(PDOException $erro){
        $sessao = ["loginValido" => false];
        $sessao["erro"] = $erro;
        return $sessao;
    }
}

function deletaSessaoLogado($login, $pdo){
    try{
        $query = $pdo->prepare("
            DELETE FROM 
                sessoesativas
            WHERE
                login= ?
            ");
            $query->bindParam($login);
            $query->execute();
            if(($query->rowCount()) == 1){
                return true;
            }
            return false;
    }catch(PDOException $erro){
        echo "Erro ao procurar sessão: ".$erro;
        return false;
    }
}

?>