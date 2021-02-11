import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import Post from "../models/Post";
import { NivelUsuario } from "../models/User";
import postView from "../views/post-view";
import { AuthorizationError } from "../errors/handler";

export default {
    index(req : Request, res : Response) : Promise<Response> {
        // deve haver diferença entre os posts aprovados e os não aprovados
        // portanto vamos fazer uma query custom com o querybuilder
        const postRepository = getRepository(Post);
        let approved = true;

        if(
            req.query.approved == "false" 
            && res.locals.authUser.nivel == NivelUsuario.ADMIN
        ) // procurar por posts não aprovados, apenas admins
            approved = false;

        // incluir imagens na pesquisa do post
        return new Promise(resolve => {
            postRepository.find({
                relations : ["images"],
                where : {
                    approved
                },
                order : {
                    date : "DESC"
                }
            }).then(posts => {
                resolve(res.json(postView.renderMany(posts)));
            });
        });
    },

    show(req : Request, res : Response) : Promise<Response> {
        const { id } = req.params;
        const postRepository = getRepository(Post);

        return new Promise((resolve, reject) => {
            postRepository.findOneOrFail(id, {
                relations: ["images"]
            }).then(post => {
                resolve(res.json(postView.render(post)));
            }).catch(err => {
                reject(err);
            })
        })
    },

    create(req : Request, res : Response) : Promise<Response> {
        const { message, type } = req.body;

        const postRepository = getRepository(Post);

        const requestImages = req.files as Express.Multer.File[];

        console.log(requestImages);

        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            message,
            images,
            type
        }

        // validar com o seguinte schema
        const schema = Yup.object().shape({
            message : Yup.string().required(),
            images : Yup.array().max(5),
            type : Yup.string().oneOf(["suggestion", "criticism", "compliment"]).required(),
        })

        return new Promise((resolve, reject) => {
            schema.validate(data, {
                abortEarly : false
            }).then(() => {
                const post = postRepository.create(data);
                postRepository.save(post).then(post => {
                    resolve(res.status(201).json(postView.render(post)));
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            })
        });
    },

    update(req : Request, res : Response) : Promise<Response> {
        // apenas moderadores podem aprovar
        const { nivel } = res.locals.authUser;
        const { id } = req.params;

        return new Promise((resolve, reject) => {
            if(nivel != NivelUsuario.ADMIN){
                reject(new AuthorizationError());
            } else {
                const postRepository = getRepository(Post);
                postRepository.findOneOrFail(id)
                .then(post => {
                    post.approved = true;
                    return postRepository.save(post);
                })
                .then(post => {
                    resolve(res.status(200).json(post));
                })
                .catch(err => {
                    reject(err);
                })
            }
        })
    },

    // geralmente quando o post não é aceito, ele será removido
    remove(req : Request, res : Response) : Promise<Response> {
        const { nivel } = res.locals.authUser;
        const { id } = req.params;
        
        return new Promise((resolve, reject) => {
            if(nivel != NivelUsuario.ADMIN){
                reject(new AuthorizationError());
            } else {
                const postRepository = getRepository(Post);
                postRepository.delete({
                    id : Number(id)
                })
                .then(deleteResult => {
                    if(deleteResult.affected && deleteResult.affected > 0)
                        resolve(res.status(204).send());
                    else
                        resolve(res.status(404).send());
                })
            }
        })
    }
};