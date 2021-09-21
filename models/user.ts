import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: false },
    email: { type: String },
    image: { type: String },
    emailVerified: { type: Date, required: false }
});

export default mongoose.model('User', userSchema);
