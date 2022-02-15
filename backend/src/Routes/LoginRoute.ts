import express, { Request, Response } from "express";
import { validatePassword, validateUsername } from "../Utilities/validation"
import { UserModel, validatePassword as verifyPasswordHash } from "../Models/User"
import { collections } from "../Services/databaseService"

declare module "express-session" {
    interface Session {
        username: string;
    }
}

const router = express.Router();

router.use(express.json())


router.post('/', async (req: Request, res: Response) => {
    // 1) Retrieve the user from DB (mongodb)
    if (req.body) {
        if (collections.users) {
            let user: {
                username: string, 
                password: string
            }  = req.body;

            if (validateUsername(user.username) &&
                    validatePassword(user.password)) {
                
                try {
                    let result = (await collections.users.findOne({ username: user.username})) as UserModel | null
                    if (result && result.salt) {
                        if (await verifyPasswordHash(result.password, result.salt, user.password)) {
                            // set token session now.
                            req.session.username = result.username;
                            console.log("Saved the session");
                            console.log(`Session ID ${req.sessionID}`);
                            res.status(201).send(req.sessionID);
                        } else {
                            res.status(400).send('Invalid Password');
                        }
                        
                    } else {
                        res.status(404).send(`${user.username} does not exist.`)
                    }

                } catch (error) {
                    console.error(error);
                    res.status(500);
                }

            } else {
                res.status(404).send('Invalid username or password');
            }
        }
    } else {
        res.status(400).send('Cannot have empty body. (Include your username and password)')
    }
    res.status(500).end();
    // 2) Hash the password 
    // 3) Verify the password hash 
    // 4) Create a session token 
    // 5) Store session token into an redis database
    // 6) Send the session token back to client in form of cookie (with HTTP headers set)
})

export default router;