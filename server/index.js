import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import databaseConnection from "./db/db.js"
import cors from "cors"
import {jwtTokenVerify} from "./auth/auth.js"


// ROUTES
import {testRoutes , login} from "./router/getUser.routes.js"
import {createUsers} from "./router/createUser.routes.js"
import {removeUsers} from "./router/deleteUser.routes.js"
import {updateUsers , patchUsers} from "./router/updateUser.routes.js"
import {userProfile} from "./router/userProfile.routes.js"

const app = express()
app.use(express.json())  // JSON BODY PARSER
app.use(express.urlencoded({ extended: true })) // URL PARSER
app.use(cookieParser(process.env.COOKIESSECRETKEY)) // "@123"  // COOIES PARSER
app.use(cors()) // CORS


// EXPRESS ROUTER
const router = express.Router()
app.use("/api/v1", router)



// DATABASE CONNECTION AND AFTER THAT SERVER LISTEN
databaseConnection()
    .then(() => {

        // APP LISTEN
        app.listen(process.env.PORT || 3030, () => {
            console.log(`Server is listening on --> http://localhost:${process.env.PORT}/api/v1`)
        })

    }).catch((error)=>{
        console.log(`Server connection error --> ${error}`)
    })


    
// ROUTES 
router.get("/testRoutes", testRoutes)  // Test Home Routes

router.post("/login", login)  // Login Routes generate JWT
router.post("/createUsers", createUsers)  // Create Routes generate JWT

router.post("/userProfile" ,jwtTokenVerify, userProfile) // profile routes with JWT
router.put("/updateUsers", updateUsers)  // Update Routes with JWT
router.patch("/patchUsers", patchUsers)  // Patch Routes with JWT
router.delete("/removeUsers", removeUsers)  // Delete Routes with JWT

