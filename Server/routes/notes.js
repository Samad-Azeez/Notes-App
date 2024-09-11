import express from 'express';
import { getNotes, createNote, deleteNote, clearNotes } from '../controllers/notes_controller.js';
export const notes = express.Router();

notes.route('/')
    .get(getNotes)
    .post(createNote)
    .delete(clearNotes)

notes.route('/:id')
    .delete(deleteNote)