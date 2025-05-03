import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import databaseConnection from "./db/db.js"
import cors from "cors"
import {verifyUserIdAndOtp} from "./auth/verifyUserIdAndOtp.js"
import {verifyUserId} from "./auth/verifyUserId.js"


// ROUTES
import {testRoutes , login} from "./router/getUser.routes.js"
import {createUsers} from "./router/createUser.routes.js"
import {removeUsers} from "./router/deleteUser.routes.js"
import {updateUsers , patchUsers} from "./router/updateUser.routes.js"
import {userProfile} from "./router/userProfile.routes.js"
import {logout} from "./router/logoutUser.routes.js"
import {sentOtp} from "./router/sentOtp.routes.js"
import {verifyOtp} from "./router/verifyOtp.routes.js"
import {isAuthenticated} from "./router/isAuthenicated.routes.js"
import {sendResetOtp} from "./router/sendResetOtp.routes.js"
import {verifyOtpResetPass} from "./router/verifyOtpResetPass.routes.js"
import {getUserDetails} from "./router/getUserDetails.routes.js"


const app = express()
app.use(express.json())  // JSON BODY PARSER
app.use(express.urlencoded({ extended: true })) // URL PARSER
app.use(cookieParser(process.env.COOKIESSECRETKEY)) // "@123"  // COOIES PARSER
app.use(cors({Credential:true})) // CORS 


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

router.post("/createUsers", createUsers)  // Create Routes generate JWT create cookies
router.post("/login", login)  // Login Routes generate JWT create cooies
router.post("/logout", logout)  // Logout Routes remove cookies
router.post("/sentOtp", verifyUserId, sentOtp) // sent OTP for account verification
router.post("/verifyOtp", verifyUserIdAndOtp, verifyOtp) // verify OTP for account verification
router.post("/isAuthenticated", verifyUserId, isAuthenticated) // verify user is authentic or not this just return true and false and work with "sendOtpJwtTokenVerify" middleware
router.post("/sendResetOtp" , sendResetOtp) // send the reset otp
router.post("/verifyOtpResetPass" , verifyOtpResetPass) //verify the reset otp and change the password
router.post("/getUserDetails" , verifyUserId , getUserDetails) // get the user details


router.put("/updateUsers", updateUsers)  // Update Routes with JWT
router.patch("/patchUsers", patchUsers)  // Patch Routes with JWT
router.delete("/removeUsers", removeUsers)  // Delete Routes with JWT


router.post("/userProfile" ,verifyUserId, userProfile) // profile routes with JWT

