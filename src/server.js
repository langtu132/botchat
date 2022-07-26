import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRouters from "./routes/web";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// config view engine
viewEngine(app);

// config web routers
webRouters(app);


let port = process.env.PORT || 8080;

app.listen(port, () => {
         console.log("App is runing at the port" + port);
});