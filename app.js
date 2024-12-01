import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import MainRouter from './routes/index.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";




//Create Server
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/v1', MainRouter);

const PORT = config.PORT;


//Database Connection
mongoose.connect(config.DATABASE_URL, { readPreference: 'secondaryPreferred' })
    .then(() => console.log(`Mongodb Connected`))
    .catch((err) => console.error(`Mongodb Connection Erro - ${err}`))

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server Listening on port ${PORT}`)
})

