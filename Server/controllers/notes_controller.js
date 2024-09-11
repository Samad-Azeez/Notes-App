import { notes_model } from "../models/notes-model.js";
import 'express-async-errors'

// Get all notes
export const getNotes = async (req, res) => {
    const notes = await notes_model.find({});

    if (!notes) {
        throw Error(`Something went wrong, unable to get all notes`)
    }

    const nbHits = notes.length;
    res.status(200).json({notes, nbHits});
}

// Create a new note
export const createNote = async (req, res) => {
    const notes = await notes_model.create(req.body);

    if (!notes) {
        // Check if the note is not found
        const {name} = req.body
        throw Error(`${name} note creation failed`);
    }

    res.status(201).json(notes);
}

// Delete a single note
export const deleteNote = async (req, res) => {
    const { id: noteID } = req.params;
    const notes = await notes_model.findByIdAndDelete(noteID);  // Find a note by its id and delete it using the task model
    
    if (!notes) {
        // Check if the note is not found
        throw Error(`message: No task with id: ${noteID} was found`);
    }

    res.status(200).json({ notes });  // Send the deleted note in the response
};

// Delete all notes
export const clearNotes = async (req, res) => {
    const notes = await notes_model.deleteMany({});

    if(!notes){
        throw Error(`Unable to delete notes`)
    }

    return res.status(200).json({ message: "All notes deleted successfully" });
};