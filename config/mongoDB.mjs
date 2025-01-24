import mongoose from 'mongoose';

const mongoDB = {
    connect: async () => {
        mongoose.connect(`${process.env.MONGO_URI}?authSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.error('MongoDB connection error:', err);
        });
    }
}
export default mongoDB;