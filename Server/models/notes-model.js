import mongoose from "mongoose";

// Define the schema for notes
const notesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,                           // Trim whitespace from the name
        maxlength: [30, "Name cannot be more than 30 characters"]
    },
    content: {
        type: String,
        required: [true, "Content is required"], // Content field is required with a custom error message
        trim: true                           // Trim whitespace from the content
    },
    tag: {
        type: [String],                       // Tag field is an array of strings
        enum: ["work", "personal", "school", "others"], // Enum specifies valid values for tags
    },
    completed: {
        type: Boolean,
        default: false                       // Default value for completed is false
    },
    pinned: {
        type: Boolean,
        default: false                       // Default value for pinned is false
    }
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Create and export the Note model based on the schema
export const notes_model = mongoose.model("Note", notesSchema);
