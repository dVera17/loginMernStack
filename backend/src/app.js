import express from 'express';
import { config } from "dotenv";
config();
const app = express();
app.set('host_name', process.env.HOSTNAME_SERVER);
app.set('port', process.env.PORT_SERVER);

export default app;