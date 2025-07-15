import mongoose from "mongoose";

const UrlSchema= new mongoose.Schema({
    url:{
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    expire: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 60 * 1000),
        required: true
    }
},
{
    timestamps: true,
}
)

const Url = mongoose.model("Url", UrlSchema);
export default Url;
