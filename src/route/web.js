import express from "express";
import homeController from "../controllers/homeController";
import crudController from "../controllers/crudController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", homeController.getHomePage);

    router.get("/users", (req, res) => {
        return res.send("Hello world user");
    });

    router.get("/crud", crudController.getView);
    router.post("/post-create-user", crudController.postCreateUser);

    router.get("/update-user", crudController.editUser);
    router.post("/post-update-user", crudController.postUpdateUser);

    router.get("/delete-user", crudController.deleteUser);


    //api
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-list-users", userController.getListUsers);
    router.post("/api/create-user", userController.postCreateUser);
    router.put("/api/edit-user", userController.postEditUser);
    router.get("/api/delete-user", userController.postDeleteUser);

    return app.use("/", router)
}

module.exports = initWebRoutes;