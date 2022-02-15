import crypto from "crypto"

export interface UserModel {
    username: string,
    password: string,
    email: string,
    salt?: string,
    userID?: string
}

// crypto.randomBytes(16).toString('hex'); 

export const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex'); 
}

export const generatePasswordHash = async (password: string, salt: string): Promise<String> => {
    return new Promise((resolve, error) => {
            crypto.pbkdf2(password, salt, 10000, 64, `sha512`, (err, key) => {
                if (err) {
                    error(err);
                }
                resolve(key.toString('hex'));
            })
    });
}

export const validatePassword = async (storedHash: string, storedSalt: string, password: string) => {
    let attemptHash = await generatePasswordHash(password, storedSalt);
    return storedHash === attemptHash;
}