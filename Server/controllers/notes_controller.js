import { notes_model } from "../models/notes-model.js";
import 'express-async-errors'

// Get all notes ( with query parameters for filtering )
export const getNotes = async (req, res) => {
    const { name, tag, completed } = req.query;
    const queryObject = {};

    // if completed query parameter is provided, convert it to boolean and add it to the query object
    if (completed === 'true') { 
        queryObject.completed = true; 
    }else if (completed === 'false') {
        queryObject.completed = false;
    }

    // If the name query parameter is provided, add it to the query object
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    // If the tag query parameter is provided, add it to the query object
    if (tag) {
        queryObject.tag = tag;
    }

    // Log the query object to the console
    console.log(queryObject);

    const notes = await notes_model.find( queryObject ); // Get all notes

    // Throw an error if something went wrong while fetching notes
    if (!notes) {
        throw Error(`Something went wrong, unable to get notes`);
    }

    // Count the number of notes retrieved
    const nbHits = notes.length;

    // Respond with the notes and the number of hits
    res.status(200).json( { notes, nbHits } );
};


// Create a new note
export const createNote = async (req, res) => {
    // Create a new note in the database using the request body
    const notes = await notes_model.create(req.body);

    // Check if the note was created successfully; if not, throw an error
    if (!notes) {
        const { name } = req.body; // Extract the name from the request body
        throw Error(`${name} note creation failed`);
    }

    // Respond with the created note and a status of 201
    res.status(201).json(notes);
}

// Delete a single note
export const deleteNote = async (req, res) => {
    const { id: noteID } = req.params; // Get the note ID from the request parameters

    // Find and delete the note by its ID
    const notes = await notes_model.findByIdAndDelete(noteID);  
    
    // Check if the note was found and deleted; if not, throw an error
    if (!notes) {
        throw Error(`message: No notes with id: ${noteID} was found`);
    }

    // Respond with the deleted note and a status of 200
    res.status(200).json({ notes });  
};

// Delete all notes
export const clearNotes = async (req, res) => {
    // Delete all notes from the database
    const notes = await notes_model.deleteMany({});

    // Check if notes were deleted successfully; if not, throw an error
    if (!notes) {
        throw Error(`Unable to delete notes`);
    }

    // Respond with a success message and a status of 200
    return res.status(200).json({ message: "All notes deleted successfully" });
};

// Update a note by its id in the database
export const updateNote = async (req, res) => {
    const { id: noteID } = req.params;
    // Find and update the note, return the updated note with { new: true, runValidators: true }
    const notes = await notes_model.findByIdAndUpdate(noteID, req.body, { new: true, runValidators: true });

    if (!notes) {
        // If no note is found, send a 404 error
        throw Error(`message: No notes with id: ${noteID} was found`);
    }

    res.status(200).json({ notes });  // Send the updated note as the response
};