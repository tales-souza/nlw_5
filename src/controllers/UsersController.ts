import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

class UserController{
    async create(request: Request, response: Response) {
        try {
            const { email } = request.body;
            const usersService = new UsersService();
            const users = await usersService.create(email);
            return response.status(201).json(users);
            console.log(users)
        } catch (err) {
            return response.status(500).json({
                message: err.message
            })
        }

    }
}

export default new UserController();