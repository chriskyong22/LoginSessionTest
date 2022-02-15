import express from "express";

declare module "express-session" {
    interface Session {
        username: string;
    }
}
const router = express.Router();

router.get('/', (req, res) => {
    console.log(`Logging out ${req.session.username}`)
    req.session.destroy((error) => {
        if (error) {
            res.status(500);
            console.error(error);
        } else {
            res.status(200).send('Logged Out!');
        }
    })
})

export default router;