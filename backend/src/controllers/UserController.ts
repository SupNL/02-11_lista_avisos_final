import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { hashData } from '../services/HashService';
import * as Yup from 'yup';

export default {
    index(req : Request, res : Response) : Promise<Response> {
        const userRepository = getRepository(User);
        return new Promise((resolve) => {
            userRepository.find().then(users => {
                resolve(res.json(users));
            })
        })
    },

    show(req : Request, res : Response) : Promise<Response> {
        const { id } = req.params;
        const userRepository = getRepository(User);
        return new Promise((resolve, reject) => {
            userRepository.findOneOrFail(id).then(user => {
                resolve(res.json(user));
            }).catch(err => {
                reject(err);
            })
        })
    },

    create(req : Request, res : Response) : Promise<Response> {
        const { nome, login, senha, nivel } = req.body;

        const data = {
            nome, login, senha, nivel
        }

        const schema = Yup.object().shape({
            nome : Yup.string().required(),
            login : Yup.string().required(),
            senha : Yup.string().required(),
            nivel : Yup.mixed().oneOf(["comum", "admin"]).nullable()
        })

        return new Promise((resolve, reject) => {
            schema.validate(data, {
                abortEarly : false
            }).then(() => {
                // hash na senha, utilizei o bcrypt para isso
                return hashData(senha)
            })
            .then(hashed => {
                const userRepository = getRepository(User);
                const user = userRepository.create({
                    nome, 
                    login,
                    senha : hashed,
                    nivel
                });
                return userRepository.save(user);
            })
            .then(user => {
                const {senha, ...semSenha} = user;
                resolve(res.status(201).json(semSenha));
            })
            .catch(err => {
                err.ormTable = "user";
                reject(err);
            }) 
        })
    },
}