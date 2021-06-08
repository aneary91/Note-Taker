
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

    addNote(note) {
        const { title, text } = note;
        // creating a new note that a titlte a text and a uniqid using the package uniqid
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((newArr) => this.write(newArr))
            .then(() => newNote);
    }

        // 
    getNotes() {
        return this.read().then(notes => {
            let notesArray;
            try {

                notesArray = [].concat(JSON.parse(notes));
            } catch (e) {
                notesArray = [];
            }
            return notesArray;

        })
    }
};

module.exports = new Storer();

