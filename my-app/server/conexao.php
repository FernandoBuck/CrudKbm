<?php
$usuario = "root";
$senha = "root123";
try{
    $pdo = new PDO('mysql:host=localhost;dbname=crudkabum', $usuario, $senha);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
}catch (PDOException $execao){
    echo "Falha na conexão com o banco de dados: ". $execao->getMessage();
}
?>