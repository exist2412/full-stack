import express from "express";
import homeController from "../controllers/homeController";
import crudController from "../controllers/crudController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", homeController.getHomePage);

    router.get("/users", (req, res) => {
        return res.send("Hello world user");
    });

    router.get("/crud", crudController.getView);
    router.post("/post-create-user", crudController.postCreateUser);
    

    return app.use("/", router)
}

module.exports = initWebRoutes;