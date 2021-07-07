const fileLoader = {}
import { mkdir, stat, write, writeFile,readFile, readFileSync } from "fs";
//O caminho do arquivo, pode ser alterado dentro do arquivo js em que o FileLoader for chamado
fileLoader.pathFile = "";



//Inicializa os arquivos e pastas
fileLoader.initialize = () => {
}

//Carrega o arquivo json
fileLoader.loadJsonFile = (path) => {
    //Usa o diretório padrão se não passado nenhum como parametro
    path = path || fileLoader.pathFile;

    var users;

    //Lê o arquivo
    users = JSON.parse(readFileSync(path));

    return users;
}


//Salva o arquivo json
fileLoader.saveJsonFile = (data, path) => {
    path = path || fileLoader.pathFile

    writeFile(path,JSON.stringify(data, null, 4),(err, data) =>{

        if (err) {
            console.log("Erro ao escrever o arquivo : \n " +  err  +  "\n -------------");
            return false
        }
    })

    return true;
}



export default fileLoader;