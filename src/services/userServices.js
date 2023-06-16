import db from "../models/index";
import bcrypt, { hash } from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email','password','firstName','lastName','phone'],
                    where: {
                        email: email,
                    },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Mật khẩu đúng';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Mật khẩu không chính xác';
                    }
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Email không tồn tại';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getListUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = '';
            if (userId === 'all') {
                users = await db.User.findAll({
                    attributes: ['id','email','firstName','lastName','phone','address'],
                    raw: true,
                })
            }
            
            if (userId && userId !== 'all') {
                users = await db.User.findOne({
                    attributes: ['id','email','firstName','lastName','phone','address'],
                    where: {
                        id: userId,
                    },
                    raw: true,
                })
                
            }
            resolve(users);
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

let postCreateUserAction = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email exist
            let check = await checkEmail(data.email);
            if (check === true) {
                return resolve({
                    errCode: 1,
                    message: 'Email đã tồn tại. Vui lòng sử dụng một email khác'
                })
            } else {
                let hashPasswordByBcryptjs = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordByBcryptjs,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    address: data.address,
                    positionId: data.positionId,
                    image: data.image,
                    gender: data.gender,
                    roleId: data.roleId,
                });
                resolve({
                    errCode: 0,
                    message: 'Thêm người dùng thành công',
                });
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
            if (data.id) {
                let userInfo = await db.User.findOne({ 
                    where: { id: data.id },
                    raw: false
                });
            }
            
            if(userInfo) {
                userInfo.phone = data.phone;
                userInfo.firstName = data.first_name;
                userInfo.address = data.address;
                await userInfo.save();
                resolve({
                    errCode: 0,
                    message: 'Sửa người dùng thành công'
                });
            } else {
                resolve({
                    errCode: 0,
                    message: 'User not found'
                });
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
                raw: false
            });
            console.log(userInfo);
            if(userInfo) {
                await userInfo.destroy();
                resolve({
                    errCode: 0,
                    massage: 'Xóa người dùng thành công'
                });    
            } else {
                resolve({
                    errCode: 1,
                    massage: 'Not found user'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getListUsers: getListUsers,
    postCreateUserAction: postCreateUserAction,
    deleteUserById: deleteUserById,
    updateUser: updateUser
}