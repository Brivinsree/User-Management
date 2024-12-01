import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: Number, required: true },
    user_pic: { type: String },
    created_at: { type: Date, requried: true, default: Date.now },
    updated_at: { type: Date },
    created_by: { type: String, required: true },
    updated_by: { type: String }
})

const modelData = mongoose.model('userdetails', UserSchema);
export default modelData;