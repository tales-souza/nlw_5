import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UserRepository";

class UsersService {

    async create (email: string){

        const usersRepositoty = getCustomRepository(UsersRepository);
        // verificar se email já existe
        const userAlreadyExist = await usersRepositoty.findOne({
            email
        });

        console.log(userAlreadyExist)

        if(userAlreadyExist){
            return userAlreadyExist;
        }
        const users = usersRepositoty.create({
            email
        })
        await usersRepositoty.save(users);
        return users;
    }
    
}

export { UsersService }