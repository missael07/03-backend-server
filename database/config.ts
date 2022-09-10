import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_MONGO_URL, (err) => {
            if (err) return err;
            console.log('MongoDB connected');
        });
    } catch (error) {
        console.log(error);
    }
}

