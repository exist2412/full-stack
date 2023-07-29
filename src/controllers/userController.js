import userServices from '../services/userServices';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Vui lòng nhập vào',
        })
    }

    let userData = await userServices.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let getListUsers = async (req, res) => {
    let id = req.query.id; // single, many
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            listUsers: []
        })
    }
    let listUsers = await userServices.getListUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        listUsers
    })
}

let postCreateUser = async (req, res) => {
    let result = await userServices.postCreateUserAction(req.body);
    return res.status(200).json({
        result
    });
}

let postEditUser = async (req, res) => {
    let message = await userServices.updateUser(req.body);
    return res.status(200).json(message);
}

let postDeleteUser = async (req, res) => {
    let message = await userServices.deleteUserById(req.body.id);
    return res.status(200).json(message);
}

let getPermission = async (req, res) => {
    try {
        let permission = await userServices.getPermissionService(req.query.type);
        return res.status(200).json(permission);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            Massage: 'Lỗi'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    getListUsers: getListUsers,
    postCreateUser: postCreateUser,
    postEditUser: postEditUser,
    postDeleteUser: postDeleteUser,
    getPermission: getPermission
}