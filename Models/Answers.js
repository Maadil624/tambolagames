import mongoose from 'mongoose';

const answersSchema = new mongoose.Schema({
    answers:Array //To get array or answers
});

export default mongoose.model('answers', answersSchema);