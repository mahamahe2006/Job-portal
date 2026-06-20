import mongoose from "mongoose";

//function to connect database
const connectDB =async ()=>{

    mongoose.connection.on('connected',()=> console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`)


}
export default connectDB