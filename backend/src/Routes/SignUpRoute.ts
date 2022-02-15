import express, { Request, Response } from "express";
import { generateSalt, UserModel, generatePasswordHash } from "../Models/User";
import { MongoServerError } from "mongodb"
import { validateEmail, validatePassword, validateUsername } from "../Utilities/validation"
import { collections } from "../Services/databaseService"
const router = express.Router();

router.use(express.json())

router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    // 1) Input validation (no blank emails, passwords with length > 3)
    if (req.body) {
        const user: UserModel = req.body;
        if (validateUsername(user.username) &&
                validatePassword(user.password) &&
                validateEmail(user.email)) {
                console.log(user);
                if (collections.users) {
                    try {
                        // 2) Attempt to insert into DB (if exist, send error to user)

                        const salt = generateSalt();
                        const passwordHash = await generatePasswordHash(user.password, salt);
                        const result = await collections.users.insertOne({
                            username: user.username,
                            password: passwordHash,
                            salt: salt,
                            email: user.email
                        })

                        result 
                            ? res.status(201).send(`Inserted user with ID ${result.insertedId}`)
                            : res.status(500).send(`Could not insert the user`);
                        
                    } catch (error) {
                        if (error instanceof MongoServerError) {
                            if (error.code == 11000) {
                                res.status(409).send('Username already exists');
                            }
                        }
                    } 
                }
            } else {
                res.status(400).send('Invalid format.')
            }
    } else {
        res.status(400).send(`Payload cannot be empty.`);
    }
})

export default router;