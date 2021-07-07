import Express from "express";
import usersManager from "./Components/usersManager.js";
import fileLoader from "./Components/fileLoader.js";

const serverApp = Express();
//Pra receber os dados json
serverApp.use(Express.json());

//define o caminho 
fileLoader.pathFile = "data/data.json"

//Carrega a classe que gerencia os usuarios
const users = new usersManager(fileLoader.loadJsonFile());


//Listar todos os usuarios
serverApp.get("/api/v1/users", (req,res) => {

    //Retorna um json com todos os usuarios
      res.json(  
        users.listUsers()
        );
})

//Listar um único usuario
serverApp.get("/api/v1/users/:user_id", (req,res) => {

    //Retorna um json com o usuario
    res.json(  
        users.getUserById(req.params.user_id)
        );
})

//Criar um unico usuario
serverApp.post("/api/v1/users", (req, res) => {
    
    //Adiciona um novo usuario
    users.addUser(req.body.email, req.body.senha);
    
    //Cria o objeto json para ser salvo
    var usersJson = {
        users : users.listUsers()
    }

    //Salva no arquivo, se bem sucedido retorna 200 (ok) se não retorna 500(erro no servidor)
    if(fileLoader.saveJsonFile(users)) res.sendStatus(200)
    else res.sendStatus(500)
})


//Deletar um usuario especifíco
serverApp.delete("/api/v1/users/:user_id", (req,res) => {
        users.deleteUser(req.params.user_id);

        var usersJson = {
            users : users.listUsers()
        }
    
        //Salva no arquivo, se bem sucedido retorna 200 (ok) se não retorna 500(erro no servidor)
        if(fileLoader.saveJsonFile(users)) res.sendStatus(200)
        else res.sendStatus(500)
})

//Deletar todos os usuarios
serverApp.delete("/api/v1/users", () => {
    users.deleteAllUsers()
   fileLoader.saveJsonFile({
       users : []
   })
})

//Alterar um usuario
serverApp.put("/api/v1/users/:user_id", () => {
    users.alterUser(req.body.id,req.body.email,req.body.senha);
    var usersJson = {
        users : users.listUsers()
    }

    //Salva no arquivo, se bem sucedido retorna 200 (ok) se não retorna 500(erro no servidor)
    if(fileLoader.saveJsonFile(users)) res.sendStatus(200)
    else res.sendStatus(500)
})



var port = process.env.PORT || 8080;

serverApp.listen(port, () => console.log("Listening on port" + port));