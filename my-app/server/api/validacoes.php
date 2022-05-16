<?php 

function validaCampoPreenchido($valorCampo){
    if($valorCampo == "")return false;
    return true;
}

function campoNomeValido($nome){
    define("nomeRe", "/^\s*([A-Za-z]{1,}([\.,] |[-']| ))*[A-Za-z]+\.?\s*$/");
    if(preg_match(nomeRe, $nome) == 1)return true;
    return false;
}

function campoEmailValido($email){
    define("emailRe", "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/");
    if(preg_match(emailRe, $email) == 1)return true;
    return false;
}

function campoLoginValido($login){
    define("loginRe", "/^([a-zA-Z0-9])+[\.]*([a-zA-Z0-9])+$/");
    if(preg_match(loginRe, $login) == 1)return true;
    return false;
}

function campoSenhaValido($senha){
    define("senhaRe", "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,99}$/");
    if(preg_match(senhaRe, $senha) == 1)return true;
    return false;
}

function camposSenhasIguais($senha, $confirmaSenha){
    if($senha === $confirmaSenha)return true;
    return false;
}

function emailClienteDisponivel($email, $pdo){
    
    try{
        $query = $pdo->prepare("SELECT email FROM cliente WHERE email = ?");
        $query->bindParam(1, $email);
        $query->execute();
        $result = $query->rowCount();
        if($result == 1){
            return false;
        }
        return true;
    }catch(PDOException $erro)
    {
        echo "Erro ao buscar email: ".$erro;
    }
}

function validaFormCadastroCliente(array $dados, $pdo){
    $camposValidados = [
        "campoNomePreenchido"   => validaCampoPreenchido($dados["nome"]),
        "campoEmailPreenchido"  => validaCampoPreenchido($dados["email"]),
        "campoLoginPreenchido"  => validaCampoPreenchido($dados["login"]),
        "campoSenhaPreenchido"  => validaCampoPreenchido($dados["senha"]),
        "campoConfirmarSenhaPreenchido" => validaCampoPreenchido($dados["confirmarSenha"]),
        "camposSenhasIguais"    => camposSenhasIguais($dados["senha"], $dados["confirmarSenha"]),
        "campoNomeValido"       => campoNomeValido($dados["nome"]),
        "campoEmailValido"      => campoEmailValido($dados["email"]),
        "campoLoginValido"      => campoLoginValido($dados["login"]),
        "campoSenhaValido"      => campoSenhaValido($dados["senha"]),
        "campoConfirmarSenhaValido" => campoSenhaValido($dados["confirmarSenha"]),
        "emailClienteDisponivel"    => emailClienteDisponivel($dados["email"], $pdo)
    ];
    
    return $camposValidados;
}
?>