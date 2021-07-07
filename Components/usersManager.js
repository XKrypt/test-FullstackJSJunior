class usersManager {
    constructor(users) {
        this.users = users.users;
        console.log(this.users)
    }

    addUser(email, senha) {
        const id = this.users.length
        let newUser = {
            id: id,
            email: email,
            senha: senha
        }
        this.users.push(newUser)
    }

    alterUser(id, email, senha) {
        for (let index = 0; index < this.users.length; index++) {
            let element = this.users[index];
            if (element.id == id) {

                element.email = email;
                element.senha = senha;

                this.users[index] = element;
            }


        }
    }


    deleteUser(id) {
        var newUsers = this.users.filter((value) => {
            return value.id != id;
        })

        this.users = newUsers;
    }

    deleteAllUsers() {
        this.users = []
    }

    listUsers() {
        return this.users;
    }

    getUserById(id) {
        var user;

        //Faz um loop pelos usuarios
        this.users.forEach(element => {
            if (element.id == id) {
                user = element;
            }
        });

        //checa se o usuario foi encontrado
        if (user == undefined || user == null) {
            return "Não encontrado"
        } else {

            //Retorna o usuario
            return user;
        }

    }
}

export default usersManager;