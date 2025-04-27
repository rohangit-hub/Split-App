import mongoose from "mongoose"

const databaseConnection = async () => {

    try {
        const stringConnection = await mongoose.connect(`${process.env.CONNECTIONSTRING}${process.env.DATABASE}`)
        console.log(`Database is connected with cloud at --> "${stringConnection.connection.host}"`)

    } catch (error) {
        console.log(`Database cloud connection error --> ${error}`)
    }
}   

export default databaseConnection;