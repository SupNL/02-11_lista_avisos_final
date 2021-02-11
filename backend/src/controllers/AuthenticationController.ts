import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { compare } from 'bcrypt';
import { getRepository } from "typeorm";
import User from "../models/User";

export default {
    login(request: Request, response: Response) {
        return new Promise(resolve => {
            const { login, senha } = request.body;
        
            const userRepository = getRepository(User);

            userRepository.findOneOrFail({ login }, {
                select : ["id", "nivel", "senha"] // utilizaremos o nivel do usuario para validar certas coisas tb
            })
            .then(user => {
                return compare(senha, user.senha)
                .then(isValid => {
                    if(isValid) {
                        const token = jwt.sign({ id : user.id, nivel : user.nivel }, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, {
                            expiresIn: 7,
                        });
                        resolve(response.status(200).json({
                            token
                        }));
                    } else {
                        resolve(response.status(401).json({ message : "Credenciais incorretas" }));
                    }
                });
            })
            .catch(err => {
                resolve(response.status(401).json({ message : "Credenciais incorretas" }));
            })
        });
    }
};