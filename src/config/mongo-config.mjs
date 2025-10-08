import mongoose from "mongoose";
import { baseConstant } from "../constants/base-constant.mjs";
import "dotenv/config"

const { MONGO_URL, MONGO_PORT, MONGO_DB, MONGO_BD_IN_USE, MONGO_ATLAS_URI } = process.env;
let MONGO_URI;


if (MONGO_BD_IN_USE == baseConstant.MONGO) {
    MONGO_URI = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;
} else {
    MONGO_URI = MONGO_ATLAS_URI;
}

export const connectMongo = async () => {
    try {
        mongoose.connect(MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 20000,
            socketTimeoutMS: 45000,
            bufferCommands: true,
            dbName: MONGO_DB,
        })
        console.log('Levanto Mongo'); //ACAAAAAAAAAAAAAAAAAA
    } catch (err) {
        console.log('Hubo un error en la conexion de mongo', err); //ACAAAAAAAAAAAAAAAAAA
        process.exit(1);
    }
}

connectMongo();