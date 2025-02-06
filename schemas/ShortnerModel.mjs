import mongoose from "mongoose";


const schema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        validator: function (v) {
            return validator.isURL(v);
        },
        message: props => `${props.value} is not a valid URL`
    },
    shortUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const ShortnerModel = mongoose.model('Shortner', schema);

export default ShortnerModel;