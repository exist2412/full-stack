import db from "../models";

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

let postCreateUser = (req, res) => {
    console.log(req.body);
    return res.send('post from user')
}

module.exports = {
    getView: getView,
    postCreateUser: postCreateUser
}