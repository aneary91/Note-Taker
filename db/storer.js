const util = require('util');
const fs = require('fs');

const uniqid = require('uniqid');

const asyncWrite = util.promisify(fs.writeFile);
const asyncRead = util.promisify(fs.readFile);

class Storer {
    write(note) {
        return asyncWrite('db/db.json', JSON.stringify(note));
    };
    read(){
        return asyncRead('db/db.json', 'utf8');
    };


    // methods to read and write notes

    writeNote(note) {
        const { title, text } = note;
        // creating a new note that a titlte a text and a uniqid using the package uniqid
        const newNote = { title, text, id: uniqid()};
        return this.readNotes()
            .then((notes) => [...notes, newNote])
            .then((newArr) => this.write(newArr))
            .then(() => newNote);
    }

        // 
    readNotes() {
        return this.read().then(notes => {
            let notesArray;
            notesArray = [].concat(JSON.parse(notes));
            return notesArray

        })
    }
}

module.exports = new Storer();

