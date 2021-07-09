const fileLoader = {}
import { constants } from "buffer";
import { Console } from "console";
import { mkdir, writeFile, readFileSync, fstat, access, writeFileSync, accessSync, mkdirSync } from "fs";
//O caminho do arquivo, pode ser alterado dentro do arquivo js em que o FileLoader for chamado
fileLoader.pathFile = "";



//Inicializa os arquivos e pastas
fileLoader.initialize = () => {

     try{

         accessSync(fileLoader.pathFile);
         console.log("Arquivo existe");
     }catch(err){
   

                console.log("Arquivo não existe, criando..");

                try{
                    mkdirSync(fileLoader.pathFile.substring(0, fileLoader.pathFile.lastIndexOf("/")))
                }catch{}
                
                writeFileSync(fileLoader.pathFile,JSON.stringify({users:[]}));

      
        }

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