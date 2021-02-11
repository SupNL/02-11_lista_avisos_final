import { ErrorRequestHandler, query } from "express";
import { ValidationError } from "yup";
import { QueryFailedError } from "typeorm"
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

export class AuthorizationError extends Error {}

interface ValidationErrors {
    [key : string] : string[]
}

interface QueryError extends Error {
    code : string;
    ormTable : string; // em qual tabela deu o erro
}

const errorHandler : ErrorRequestHandler = (error, req, res, next) => {
    console.error("-----ERROR HANDLER-----");
    console.error(error.message);
    console.error(error);
    if(error instanceof ValidationError) {
        let errors : ValidationErrors = {};

        error.inner.forEach((err : any) => {
            errors[err.path] = err.errors;
        });
        res.status(400).json({ message : "Validation failed", errors });
    } else if (error instanceof EntityNotFoundError) {
        res.status(404).json({ message : error.message });
    } else if (error instanceof QueryFailedError) {
        let queryError = error as QueryError;
        let message = "";
        switch(queryError.code){
            case 'ER_DUP_ENTRY':
                if(queryError.ormTable == "user")
                    message = "Usuário já existente. Escolha outro login";
                else
                    message = "Conteúdo já existente";
                res.status(409).json({ message });
                break;
            default:
                res.status(500).json({ message : "Internal server error" });
                break;
        }
        
    } else if (error instanceof AuthorizationError) {
        res.status(403).json({ message : "Unauthorized access" });
    } else {
        res.status(500).json({ message : "Internal server error" });
    }
    
};

export default errorHandler;