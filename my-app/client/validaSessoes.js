function validaLocalStorage() {
    if((localStorage.getItem("login") == null) || (localStorage.getItem("hash") == null) ||
        (localStorage.getItem("login") == "") || (localStorage.getItem("hash") == "")){
            localStorage.clear()
            return false
    }
    return true
}

async function validaSessao() {

    if(!validaLocalStorage()){
        window.location.href = "../../client/home/index.html"
    }

    objectData = {
        login : localStorage.getItem("login"),
        hash : localStorage.getItem("hash")
    }

    return await $.ajax({
        type: "GET",
        url: `../../server/api/login.php?funcao=validaSessao&login=${objectData.login}&hash=${objectData.hash}`,
    }).done(function (res){
        if(!res){
            localStorage.clear()
            window.location.href = "../../client/home/index.html"    
        }
    }).fail(function (){
        localStorage.clear()
        window.location.href = "../../client/erro.html"
    })
    
}

async function validaSessaoIndex() {

    objectData = {
        login : localStorage.getItem("login"),
        hash : localStorage.getItem("hash")
    }

    return await $.ajax({
        type: "GET",
        url: `../../server/api/login.php?funcao=validaSessao&login=${objectData.login}&hash=${objectData.hash}`,
    }).done(function (res){
        if(res){
            window.location.href = "../../client/home/home.html"    
        }
    }).fail(function (){
        localStorage.clear()
        window.location.href = "../../client/erro.html"
    })
}