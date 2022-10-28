//require express and store
const router = require('express').Router();
const store = require('../db/store');

//reads db.json file using getNotes function in store.js and returns saved notes
router.get ('/notes', (req, res)=>{
    store
        .getNotes()
        .then((notes)=>{
            return res.json(notes);
        })
        .catch((err)=>res.status(500).json(err))
});

//receives new note using addNote function in store, adds to db.json file, and returns to client
router.post ('/notes', (req,res)=>{
    store
        .addNote(req.body)
        .then((note)=>res.json(note))
        .catch((err)=>res.status(500).json(err))
});


//reads db.json files, deletes note with specific id, then rewrites the notes to the db.json file
router.delete ('/notes/:id', (req, res)=>{
    store
        .removeNote(req.params.id)
        .then(()=>res.json({ ok:true }))
        .catch((err)=>res.status(500).json(err))
});

module.exports =router;