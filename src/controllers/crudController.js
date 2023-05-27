import db from "../models";
import CRUDServices, { createNewUser } from "../services/CRUDServices";

let getView = async (req, res) => {
    
    try {
        // let data = await db.User.findAll();
        return res.render('crud/create.ejs', {
            //data:JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let postCreateUser = async (req, res) => {
    await CRUDServices.createNewUser(req.body);
    return res.send('post from user')
}

let postUpdateUser = async (req, res) => {
    let allUsers = await CRUDServices.updateUser(req.body);
    return res.render('homepage.ejs', {
        data: allUsers
    });
}

let editUser = async (req, res) => {
    let userID = req.query.id;
    
    let getUserInfoById = await CRUDServices.getUserInfoById(userID);
    return res.render('crud/update.ejs', {
        getUserInfoById: getUserInfoById,
    })
}

let deleteUser = async (req, res) => {
    let userID = req.query.id;
    let allUsers = await CRUDServices.deleteUserById(userID);
    return res.render('homepage.ejs', {
        data: allUsers
    });
}

module.exports = {
    getView: getView,
    postCreateUser: postCreateUser,
    editUser: editUser,
    postUpdateUser: postUpdateUser,
    deleteUser: deleteUser,
}