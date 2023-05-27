import db from "../models";

let getHomePage = async (req, res) => {
    
    try {
        let data = await db.User.findAll({
            raw: true,
        });
        
        return res.render('homepage.ejs', {
            data:data
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getHomePage: getHomePage,
}