import { getCustomRepository, Repository } from "typeorm";
import { Settings } from "../entities/Settings";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    settingsRepository: Repository<Settings>;
    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository);
        const userAlreadyExists = await settingsRepository.findOne({
            username
        })
        if (userAlreadyExists) {
            throw new Error('User already exists!');
        };
        const settings = settingsRepository.create({
            chat,
            username
        })
        await settingsRepository.save(settings);
        return settings;
    }

    async index() {
        const settingsRepository = getCustomRepository(SettingsRepository);
        const settings = await settingsRepository.find()
        return settings;
    }
    
    async findByUsername(username: string){
        const settings = this.settingsRepository.findOne({
            username
        });

        return settings;
    }

 
    async update(username: string, chat: boolean) {
        const settingsRepository = getCustomRepository(SettingsRepository);

        const teste = await settingsRepository.createQueryBuilder()
            .update(Settings)
            .set({ chat })
            .where("username = :username", {
                username,
            })
            .execute();

        console.log(teste)




    }





}

export { SettingsService }