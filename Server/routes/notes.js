import express from 'express'; // Import the Express library
import { getNotes, createNote, deleteNote, clearNotes } from '../controllers/notes_controller.js'; // Import controller functions

export const notes = express.Router(); // Create a new router for handling notes

// Define routes for the base URL (/)
notes.route('/')
    .get(getNotes) // Handle GET request to fetch all notes
    .post(createNote) // Handle POST request to create a new note
    .delete(clearNotes); // Handle DELETE request to clear all notes

// Define routes for individual note operations using the note ID
notes.route('/:id')
    .delete(deleteNote); // Handle DELETE request for a specific note identified by :id
