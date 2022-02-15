import MongoStore from 'connect-mongo'
import dotenv from "dotenv"
dotenv.config();
const oneHour = 1000 * 60 * 60;
const oneDay = oneHour * 24;


// Note if the backend is using a proxy, need to use 'trust proxy'
export const sessionConfig = {
    secret: process.env.SECRET ? process.env.SECRET : "DEFAULTSECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: false,
        httpOnly: true,
        maxAge: oneDay
    }, 
    store: MongoStore.create({ 
        mongoUrl: process.env.DB_CONN_STRING,
        collectionName: 'sessions',
        ttl: oneDay,
        autoRemove: 'native',
        touchAfter: oneHour
    })
}