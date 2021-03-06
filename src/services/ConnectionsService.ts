import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'


interface IconnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}


class ConnectionsService {

    private connectionsRepository: Repository<Connection>

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }


    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepository.findOne({
          user_id,
        });
    
        return connection;
      }
    

    async create({ socket_id, user_id, admin_id, id }: IconnectionCreate) {

        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });
        await this.connectionsRepository.save(connection);

        return connection;
    }

    async findAllWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where : { admin_id: null},
            relations: ["user"], 
        });

        return connections;

    }

}

export { ConnectionsService }