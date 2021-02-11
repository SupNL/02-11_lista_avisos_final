import { genSalt, hash } from 'bcrypt';

export const hashData = (data : string) : Promise<string> => {
    return new Promise((resolve, reject) => {
        genSalt()
        .then(salt => {
            return hash(data, salt);
        })
        .then(hashed => {
            resolve(hashed);
        })
        .catch((err) => {
            reject(err);
        });
    })
}