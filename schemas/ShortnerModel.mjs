import mongoose from "mongoose";


const schema = new mongoose.Schema({
    url: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const ShortnerModel = mongoose.model('Shortner', schema);

export default ShortnerModel;