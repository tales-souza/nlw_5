import { Request, Response } from 'express'
import { settings } from 'node:cluster';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
    async create(request: Request, response: Response) {
        try {
            const { chat, username } = request.body;
            const settingsService = new SettingsService();
            const settings = await settingsService.create({ chat, username });
            return response.status(201).json(settings);
        } catch (e) {
            return response.status(500).json({
                message: e.message
            })
        }

    }

    async index(request: Request, response: Response) {
        const settingsService = new SettingsService();
        const settings = await settingsService.index();
        return response.status(200).json(settings);
    }

    async findByUsername(request: Request, response: Response) {

        const { username } = request.params; 

        const settingsService = new SettingsService();
        const settingsUsername = await settingsService.findByUsername(username);
        return response.status(200).json(settingsUsername);
    }


    async update(request: Request, response: Response) {
        const { username } = request.params;
        const { chat } = request.body;
        const settingsService = new SettingsService();
        const updateChat = await settingsService.update(username, chat);
        return response.status(201).json(updateChat);
    }
}

export default new SettingsController();