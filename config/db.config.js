import mongoose from "moongose";
import { ConfigService } from "./services/config-service";

export const connectDb = async () => {
    mongoose.connect(
        `mongodb+srv://${ConfigService.MONGO_USER}:${ConfigService.MONGO_PASS}@${
            ConfigService.MONGO_HOST}/contactsdb?retryWrites=true&w=majority`,
        {
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    );

    const db = mongoose.connection; 
    db.on("open", () => console.log("Conectado a la base de datos"));
    db.on("error", err => console.error(err.message));
}