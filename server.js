const express = require("express")
const { dbConnect } = require("./db/dbConnect")
const { userModel } = require("./model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authMiddleware = require("./middleware")

const multer = require("multer")
const path = require("path")

const app = express()

app.use(express.json())

// Import cors package
const cors = require("cors");

// Configure CORS middleware
// app.use(cors({
//     origin: 'http://localhost:5174', // Allow requests from this origin
//     credentials: true // Allow sending cookies from client to server
// }));

app.use(cors())
// app.use(cors({origin:"*"}))
// app.use(cors({
//     origin: 'http://localhost:5174'
// }));


const PORT = 5000
const hostName = "127.0.0.5"



// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })  
  const upload = multer({ storage: storage }) 




app.get("/", (req, res) => {
    console.log(req.method, req.url) // when page is re-freshed/ re-load
    res.send("<h1>Hello, I am Server</h1>")
})

app.post("/register",upload.single("photo"), async(req, res) => {
    try {
        // console.log(req.method, req.url)
        const user = req.body 
        console.log(user)
        const { email, password, confirmPassword } = user

// Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email })
        if(existingUser) {
            return res.status(400).send("User Already Exist, Please Login")         
        }
// Check if passwords match
        if(password !== confirmPassword) {
            return res.status(400).send("Passwords are not matching")
        }
// Hash passwords
        const hashedPassword = await bcrypt.hash(password, 10)
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)
        
// Check if file was uploaded
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }        
// Create new user object
        let newUserData = new userModel({
            ...user,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            photo: req.file.path // Assuming multer saves file path to req.file.path

        })
// Save user to the database
        await newUserData.save()
        res.status(201).send("Registered Successfully Completed, Data stored in db")
    }
    catch(err) {
        console.error("Error while storing data in DB:", err);
// // Delete uploaded file if registration fails
        // if (req.file) {
        //     fs.unlink(req.file.path, (err) => {
        //         if (err) {
        //             console.error("Error deleting file:", err);
        //         }
        //     });
        // }
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




// // multer config
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })  
//   const upload = multer({ storage: storage }) 

//   app.post('/json', (req,res) => {
//     console.log(req.body);
//     res.status(200).send({message: "Data Received" })
// })

app.post('/form', upload.single("photo"), (req,res) => {
    console.log(req.body);
    res.send("Data Received using multer in form data")
})




app.listen(PORT, hostName, () => {
    console.log(`server running at http://${hostName}:${PORT}`)
    dbConnect()
})

