import mongoose from 'mongoose';

const mongoDB = {
    connect: async () => {
        mongoose.connect(`${process.env.MONGO_URI}?authSource=admin`).then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.error('MongoDB connection error:', err);
        });
    }
}
export default mongoDB;