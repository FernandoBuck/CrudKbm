<?php

function validaSessaoAtiva($login, $hash, $timeStamp, $pdo){
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
            ");
        $query->bindParam(1, $hash);
        $query->bindParam(2, $login);
        $query->execute();
        if(($query->rowCount()) == 1){
            $sessao = $query->fetch(PDO::FETCH_ASSOC);
            $segundosLogado =  $timeStamp - ($sessao["timestamp"]);
            if($segundosLogado >= umDiaEmSegundos){
                deletaSessaoLogado($hash, $pdo);
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
        $query->execute();
        if(($query->rowCount()) == 1){
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

function deletaSessaoLogado($hash, $pdo){
    try{
        $query = $pdo->prepare("
            DELETE FROM 
                sessoesativas
            WHERE
                hash= ?
            ");
            $query->bindParam($hash);
            $query->execute();
            if(($query->rowCount()) == 1){
                return true;
            }
            return false;
    }catch(PDOException $erro){
        echo "Erro ao excluir sessão: ".$erro;
        return false;
    }
}

?>