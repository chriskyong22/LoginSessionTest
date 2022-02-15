import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv"

export const collections: { users?: Collection, sessions?: Collection } = {}

export async function connectToDatabase() {
  dotenv.config();
  let client: MongoClient;
  if (process.env.DB_CONN_STRING) {
    client = new MongoClient(process.env.DB_CONN_STRING)
  } else {
    console.error("Missing the connection URI in .env");
    process.exit();
  }
  
  await client.connect();

  let db: Db;
  if (process.env.DB_NAME) {
    db = client.db(process.env.DB_NAME);
  } else {
    console.error("Missing database name in .env");
    process.exit();
  }
  
  let usersCollection: Collection;
  if (process.env.USERS_COLLECTION_NAME) {
    usersCollection = db.collection(process.env.USERS_COLLECTION_NAME);
  } else {
    console.error("Missing users collection name in .env")
    process.exit();
  }

  let sessionsCollection: Collection;
  if (process.env.SESSIONS_COLLECTION_NAME) {
    sessionsCollection = db.collection(process.env.SESSIONS_COLLECTION_NAME);
  } else {
    console.error("Missing sessions collection in .env");
    process.exit();
  }

  collections.sessions = sessionsCollection;
  sessionsCollection.createIndex( 
    { "username": 1 }, 
    { unique: true }
  )

  collections.users = usersCollection;
  usersCollection.createIndex( 
    { "username": 1 },
    { unique: true }
  )

  console.log(`Successfully connected to database: ${db.databaseName} and collections: ${sessionsCollection.collectionName} ${usersCollection.collectionName}`)

}
