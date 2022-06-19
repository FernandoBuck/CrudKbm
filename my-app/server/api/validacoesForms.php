<?php 
// ################################### REGRAS DE PREENCHIMENTO ###################################

function validaCampoPreenchido($valorCampo){
    if($valorCampo == "")return false;
    return true;
}

function camposSenhasIguais($senha, $confirmaSenha){
    if($senha === $confirmaSenha)return true;
    return false;
}

function estadoExiste($estado){
    $estadosBrasileiros = array(
        'AC'=>'Acre',
        'AL'=>'Alagoas',
        'AP'=>'Amapá',
        'AM'=>'Amazonas',
        'BA'=>'Bahia',
        'CE'=>'Ceará',
        'DF'=>'Distrito Federal',
        'ES'=>'Espírito Santo',
        'GO'=>'Goiás',
        'MA'=>'Maranhão',
        'MT'=>'Mato Grosso',
        'MS'=>'Mato Grosso do Sul',
        'MG'=>'Minas Gerais',
        'PA'=>'Pará',
        'PB'=>'Paraíba',
        'PR'=>'Paraná',
        'PE'=>'Pernambuco',
        'PI'=>'Piauí',
        'RJ'=>'Rio de Janeiro',
        'RN'=>'Rio Grande do Norte',
        'RS'=>'Rio Grande do Sul',
        'RO'=>'Rondônia',
        'RR'=>'Roraima',
        'SC'=>'Santa Catarina',
        'SP'=>'São Paulo',
        'SE'=>'Sergipe',
        'TO'=>'Tocantins'
        );

        return in_array($estado, $estadosBrasileiros);
}

// ################################### REGEX ###################################

function campoNomeValido($nome){
    define("nomeRe", "/^\s*([A-zÀ-ÿ']{1,}([\.,] |[-']| ))*[A-zÀ-ÿ']+\.?\s*$/");
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

function campoCepValido($cep){
    define("cepRe", "/^[0-9]{8}$/");
    if(preg_match(cepRe, $cep) == 1)return true;
    return false;
}

function campoNumeroCasaValido($numeroCasa){
    define("numeroCasaRe", "/^[0-9]{0,45}$/");
    if(preg_match(numeroCasaRe, $numeroCasa))return true;
    return false;
}

// ################################### CONSULTAS ###################################

function emailClienteDisponivel($email, $pdo){
    
    try{
        $query = $pdo->prepare("SELECT email FROM cliente WHERE email = ?");
        $query->bindParam(1, $email);
        $query->execute();
        if(($query->rowCount()) == 1){
            return false;
        }
        return true;
    }catch(PDOException $erro)
    {
        echo "Erro ao buscar email: ".$erro;
    }
}

function loginClienteDisponivel($login, $pdo){
    try{
        $query = $pdo->prepare("SELECT login FROM cliente WHERE login = ?");
        $query->bindParam(1, $login);
        $query->execute();
        $result = $query->rowCount();
        if($result == 1){
            return false;
        }
        return true;
    }catch(PDOException $erro)
    {
        echo "Erro ao buscar login: ".$erro;
    }
}

function loginUsuarioDisponivel($login, $pdo){
    try{
        $query = $pdo->prepare("SELECT login FROM usuario WHERE login = ?");
        $query->bindParam(1, $login);
        $query->execute();
        $result = $query->rowCount();
        if($result == 1){
            return false;
        }
        return true;
    }catch(PDOException $erro){
        echo "Erro ao buscar login: ".$erro;
    }
}

function loginClienteAlterado($uuid, $login, $pdo){
    try{
        $query = $pdo->prepare("SELECT login FROM cliente WHERE uuid = ?");
        $query->bindParam(1, $uuid);
        $query->execute();

        if(($query->rowCount()) == 1){
            $loginCadastrado = $query->fetch(PDO::FETCH_ASSOC);
            if($login == $loginCadastrado["login"]){
                return false;
            }
            return true;
        }
        return false;
    }catch(PDOException $erro){
        return ("Erro ao buscar cliente:". $erro);
    }
}

function emailClienteAlterado($uuid, $email, $pdo){
    try{
        $query = $pdo->prepare("SELECT email FROM cliente WHERE uuid = ?");
        $query->bindParam(1, $uuid);
        $query->execute();

        if(($query->rowCount()) == 1){
            $emailCadastrado = $query->fetch(PDO::FETCH_ASSOC);
            if($email == $emailCadastrado["email"]){
                return false;
            }
            return true;
        }
        return false;
    }catch(PDOException $erro){
        return ("Erro ao buscar cliente:". $erro);
    }
}

// ################################### FORMULARIOS ###################################

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
        "emailClienteDisponivel"    => emailClienteDisponivel($dados["email"], $pdo),
        "campoCepPreenchido" => validaCampoPreenchido($dados["cep"]),
        "campoNumeroCasaPreenchido" => validaCampoPreenchido($dados["numeroCasa"]),
        "campoRuaPreenchido" => validaCampoPreenchido($dados["rua"]),
        "campoBairroPreenchido" => validaCampoPreenchido($dados["bairro"]),
        "campoCidadePreenchido" => validaCampoPreenchido($dados["cidade"]),
        "campoEstadoPreenchido" => validaCampoPreenchido($dados["estado"]),
        "campoCepValido"       => campoCepValido($dados["cep"]),
        "campoNumeroCasaValido"       => campoNumeroCasaValido($dados["numeroCasa"]),
        "campoRuaValido"       => campoNomeValido($dados["rua"]),
        "campoBairroValido"       => campoNomeValido($dados["bairro"]),
        "campoCidadeValido"       => campoNomeValido($dados["cidade"]),
        "campoEstadoValido"       => campoNomeValido($dados["estado"]),
        "estadoExiste"            => estadoExiste($dados["estado"])
    ];
    
    return $camposValidados;
}

function validaFormLogin($dados){
    $camposValidados = [
        "campoLoginPreenchido" => validaCampoPreenchido($dados["login"]),
        "campoSenhaPreenchido" => validaCampoPreenchido($dados["senha"])
    ];

    return $camposValidados;
}

function validaFormEditaDadosCliente($dados, $pdo){
    $camposValidados = [
        "campoNomePreenchido"   => validaCampoPreenchido($dados["nome"]),
        "campoEmailPreenchido"  => validaCampoPreenchido($dados["email"]),
        "campoLoginPreenchido"  => validaCampoPreenchido($dados["login"]),
        "loginClienteDisponivel" => loginClienteDisponivel($dados["login"], $pdo),
        "emailClienteDisponivel" => emailClienteDisponivel($dados["email"], $pdo),
        "campoNomeValido"       => campoNomeValido($dados["nome"]),
        "campoEmailValido"      => campoEmailValido($dados["email"]),
        "campoLoginValido"      => campoLoginValido($dados["login"])
    ];

    if(!(loginClienteAlterado($dados["uuid"], $dados["login"], $pdo))){
        $camposValidados["loginClienteDisponivel"] = true;
    }

    if(!(emailClienteAlterado($dados["uuid"], $dados["email"], $pdo))){
        $camposValidados["emailClienteDisponivel"] = true;
    }

    return $camposValidados;
}

function validaFormAlteraSenhaCliente($dados){
    $camposValidados = [
        "campoSenhaPreenchido"  => validaCampoPreenchido($dados["senha"]),
        "campoConfirmarSenhaPreenchido" => validaCampoPreenchido($dados["confirmaSenha"]),
        "camposSenhasIguais"    => camposSenhasIguais($dados["senha"], $dados["confirmaSenha"]),
        "campoSenhaValido"      => campoSenhaValido($dados["senha"]),
        "campoConfirmarSenhaValido" => campoSenhaValido($dados["confirmaSenha"])
    ];

    return $camposValidados;
}
?>