const express = require("express")
const { dbConnect } = require("./db/dbConnect")
const { userModel } = require("./model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authMiddleware = require("./middleware")
const cors = require("cors")


const app = express()
const PORT = 5000
const hostName = "127.0.0.5"

app.use(express.json())
// app.use(cors())
// app.use(cors({origin:"*"}))
app.use(cors({
    origin: 'http://localhost:5174'
}));


app.get("/", (req, res) => {
    console.log(req.method, req.url) // when page is re-freshed/ re-load
    res.send("<h1>Hello, I am Server</h1>")
})

app.post("/register", async(req, res) => {
    // console.log(req.method, req.url)
    const user = req.body 
    // console.log(user)
    const { email, password, confirmPassword } = user
    if(email) {
        const existingUser = await userModel.findOne({ email })
        if(existingUser) {
            return res.status(400).send("User Already Exist, Please Login") 
         }
    }
    if(password !== confirmPassword) {
        return res.status(400).send("Passwords are not matching")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)


    let newUserData = new userModel({
        ...user,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
    })

    try {
        await newUserData.save()
        res.status(201).send("Registered Successfully Completed, Data stored in db")

    }
    catch(err) {
        res.status(500).send("Error while Storing data in DB");
    }

})


app.post("/login", async(req,res) => {
    data = req.body
    // console.log(data);
    const {email, password} = data

    try {
        let existingUser = await userModel.findOne({ email })
        if(!existingUser) {
            return res.status(404).send("User Not Found, Please Register")
        }
        else{
            let isMatched = await bcrypt.compare(password,existingUser.password)
            // console.log(isMatched);
            if(!isMatched) {
                return res.status(400).send("Passwords are not matching")
            }
            else {
                let token = jwt.sign(existingUser._id.toString(), "Pranavi")
                return res.status(200).send({ token })
            }
        }
    }
    catch(err) {
        res.status(500).send("Something went to wrong " + err.message)
    }
}) 




//token verification
app.get("/getuser", async(req,res) => {
    console.log(req.headers.authorization);
    let token = req?.headers?.authorization?.split(" ")?.[1]
// or 
   // let token = req.headers.authorization.slice(7)
    console.log(token);

    let userId = jwt.verify(token, "Pranavi")
    // console.log(userId);
    if(!userId) {
        return res.status(400).send({message: "Token is not Valid"})
    }
    else {
        let user = await userModel.findById(userId).select("-_id -password -confirmPassword -__v")
        console.log(user);
        if(user) {
            return res.status(200).send(user)
        }
        else {
            return res.status(404).send({message: "User not found"})
        }
    }
})



app.get("/myprofile", authMiddleware, async(req,res)=> {
    try{
        // let userId = jwt.verify(token, "Pranavi")
        let userId = req.user
        let existingUser = await userModel.findById(userId)
        if(!existingUser) {
            return res.status(400).send("User not found")
        }
        return res.json(existingUser)
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Invalid Token" + err)
    }
})



app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`)
    dbConnect()
})

