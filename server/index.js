import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import { testRoutes, getUsers, createUsers, updateUsers, patchUsers, removeUsers } from "./router/router.js"
import databaseConnection from "./db/db.js"

const app = express()
app.use(express.json())  // JSON BODY PARSER
app.use(express.urlencoded({ extended: true })) // URL PARSER
app.use(cookieParser(process.env.COOKIESSECRETKEY)) // "@123"  // COOIES PARSER
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
router.get("/testRoutes", testRoutes)  // Home Routes
router.get("/getUsers", getUsers)  // Home Routes
router.post("/createUsers", createUsers)  // Create Routes
router.put("/updateUsers", updateUsers)  // Update Routes
router.patch("/patchUsers", patchUsers)  // Patch Routes
router.delete("/removeUsers", removeUsers)  // Delete Routes

