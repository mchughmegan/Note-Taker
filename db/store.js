//store class that will lay out functions necessary for the application
//reading, writing, etc

const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//build class
class Store {
    read() {
        //read db.json and output contents in utf8
        return readFileAsync('db/db.json', 'utf8')
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                //attempt to let parsed notes equal empty array into concat parsed back into an array
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }
    addNote(note) {
        const { title, text } = note;
        if(!title || !text){
            throw new Error('note title and note text cannot be blank');
        }
        const newNote = { title, text, id: uuidv1() };
        return this.getNotes()
            .then((notes)=>[...notes, newNote])
            .then((updatedNotes)=>this.write(updatedNotes))
            .then(()=>newNote)
    }
    removeNote(id) {
        return this.getNotes()
            .then((notes)=>notes.filter((note)=>note.id !== id))
            .then((filteredNotes)=>this.write(filteredNotes))
    }
}

module.exports = new Store();