import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import testConnection from "./config/connectDB";
import cors from 'cors';

require('dotenv').config();

let app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
testConnection();

let port = process.env.PORT || 8080;
// Port === underfind => port = 6969

app.listen(port, ()=> {
    console.log('Backend NodeJs ' + port)
})