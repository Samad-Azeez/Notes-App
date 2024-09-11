import mongoose from "mongoose";

// Schema for notes
const notesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [30, "Name cannot be more than 100 characters"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    tag: {
        type: [String],
        enum: ["work", "personal", "school", "others"],
    },
    completed: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export const notes_model = mongoose.model("Note", notesSchema);