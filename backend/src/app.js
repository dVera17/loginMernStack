import express from 'express';
import { config } from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routerAuth from './routes/auth.routes.js';
config();

const corsOptions = {
    origin: 'http://127.1.1.0:5011',
    optionsSuccessStatus: 200
}

const app = express();
app.set('host_name', process.env.HOSTNAME_SERVER);
app.set('port', process.env.PORT_SERVER);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/auth', routerAuth);

export default app;