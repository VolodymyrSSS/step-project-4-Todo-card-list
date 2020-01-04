const MongoClient = require("mongodb").MongoClient;
const { newUrl, db } = require("./config");
const ObjectId = require("mongodb").ObjectId;

const testConnection = async () => {
    const client = new MongoClient(newUrl, { useNewUrlParser: true });
    await client.connect();
    console.log("db is connected!");
    client.close();
};

const addNote = async note => {
    const client = new MongoClient(newUrl, { useNewUrlParser: true });
    await client.connect();
    const notesCollection = await client.db(db).collection("notes");
    await notesCollection.insertOne(note);
    console.log("1 note was inserted!");
    client.close();
};

const getNote = async id => {
    const client = new MongoClient(newUrl, { useNewUrlParser: true });
    await client.connect();
    const notesCollection = await client.db(db).collection("notes");
    // const data = await notesCollection.find({}).toArray();
    const data = await notesCollection.findOne({ "_id": ObjectId(id) });
    client.close();
    return data;
};

const getNotes = async () => {
    try {
        const client = new MongoClient(newUrl, { useNewUrlParser: true });
        await client.connect();

        const collection = client.db(db).collection('notes');
        const data = await collection.find({}).toArray();
        client.close();
        return data;

    } catch (e) {
        throw e;
    };
};

const editNote = async (id, theme, text) => {
    try {
        const client = new MongoClient(newUrl, { useNewUrlParser: true });
        await client.connect();

        const newvalues = { $set: { "title": theme, "text": text } };
        const notesCollection = await client.db(db).collection("notes");
        await notesCollection.updateOne({ "_id": ObjectId(id) }, newvalues);
        console.log("note was edited!");
        client.close();
    } catch (e) {
        throw e;
    };
};

const deleteNote = async id => {
    try {
        const client = new MongoClient(newUrl, { useNewUrlParser: true });
        await client.connect();

        const notesCollection = await client.db(db).collection("notes");
        await notesCollection.deleteOne({ "_id": ObjectId(id) });
        console.log('Deleted one note');
        client.close();
    } catch (e) {
        throw e;
    };
};

const addList = async list => {
    try {
        const client = new MongoClient(newUrl, { useNewUrlParser: true });
        await client.connect();

        const listsCollection = client.db(db).collection("lists");
        await listsCollection.insertOne(list);
        console.log("1 list was inserted!");
        client.close();
    } catch (e) {
        throw e;
    };
};


const getList = async (id) => {
    try {
        const client = new MongoClient(newUrl, { useNewUrlParser: true });
        await client.connect();
        const listsCollection = await client.db(db).collection("lists");
        const data = await listsCollection.findOne({ "_id": ObjectId(id) });

        client.close();
        return data;
    } catch (e) {
        throw e;
    };
};

const editList = async (id, list) => {
    try {
        const client = new MongoClient(newUrl, { useNewUrlParser: true });
        await client.connect();
        const listsCollection = await client.db(db).collection("lists");
        await listsCollection.updateOne({ "_id": ObjectId(id) }, { $set: list });
        console.log("list was edited!");
        client.close();
    } catch (e) {
        throw e;
    };
};

const getLists = async () => {
    try {
        const client = new MongoClient(newUrl, { useNewUrlParser: true });
        await client.connect();

        const listsCollection = await client.db(db).collection('lists');
        const data = await listsCollection.find({}).toArray();
        client.close();
        return data;
    } catch (e) {
        throw e;
    }
};

const deleteList = async (id) => {
    try {
        const client = new MongoClient(newUrl, { useNewUrlParser: true });
        await client.connect();
        const listsCollection = await client.db(db).collection("lists");
        await listsCollection.deleteOne({ "_id": ObjectId(id) });
        console.log("delited one list!");
        client.close();
    } catch (e) {
        throw e;
    };
};

module.exports = {
    testConnection,
    addNote,
    getNote,
    editNote,
    deleteNote,
    getNotes,
    addList,
    getList,
    editList,
    deleteList,
    getLists
};