const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send("Token not found");
        }

        const userId = jwt.verify(token, "Pranavi");
        if (!userId) {
            return res.status(401).send("Invalid token");
        }

        req.user = userId; // Set the user ID in the request object
        next(); // Call next middleware
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

module.exports = authMiddleware;





// const userModel = mongoose.model("user", userSchema)

// module.exports = { userModel }
// const jwt = require("jsonwebtoken");

// module.exports = async function(req, res, next) {
//     try {
//         console.log(req.headers.authorization);
//         let token = req?.headers?.authorization?.split(" ")?.[1]
//         // or 
//            // let token = req.headers.authorization.slice(7)
//             console.log(token);
//     //    let token = req.header("x-token");
//         if(!token) {

//     //     return res.status(400).send("Token Not Found");
//     //    }
       
//             let userId = jwt.verify(token, "Pranavi")
//             if(!userId) {
//                 return res.status(400).send({message: "Token is not Valid"})
//             }
//             else {
//                 let user = await userModel.findById(userId)
//                 if(user) {
//                     return res.status(200).send(user)
//                 }
//                 else {
//                     return res.status(404).send({message: "User not found"})
//                 }
//             }
//             next()
//         }
//     }
//     catch(err) {
//         console.log(err);
//         return res.status(500).send("Server Error")
//     }
// }
