import bcrypt from 'bcryptjs';
import db from '../models';

var salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordByBcryptjs = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordByBcryptjs,
                firstName: data.first_name,
                lastName: data.last_name,
                phone: data.phone,
                address: data.address,
                positionId: data.positionId,
                image: data.image,
                gender: data.gender,
                roleId: data.roleId,
            });

            resolve('ok! create new user successfully');
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.User.findOne({ 
                where: { id: userID },
                raw: true,
            });
            if(userInfo) {
                resolve(userInfo);
            } else {
                resolve([])
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //console.log(data.userId);
            let userInfo = await db.User.findOne({ 
                where: { id: data.userId },
            });
            if(userInfo) {
                userInfo.email = data.email;
                userInfo.phone = data.phone;
                userInfo.firstName = data.first_name;
                userInfo.lastName = data.last_name;
                userInfo.address = data.address;
                await userInfo.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
                console.log('Not found user');
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserById = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.User.findOne({ 
                where: { id: userID },
            });
            if(userInfo) {
                await userInfo.destroy();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
                console.log('Not found user');
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}