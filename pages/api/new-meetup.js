import { MongoClient } from 'mongodb';

// /api/new-meetup
// This is building an api end point that would
// communicate with the front end and take post request.
// it can be made to take any http requests like Post, Get, Patch, Delete!.

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://Victor:VictorEjike12@cluster0.tzilb.mongodb.net/meetups?retryWrites=true&w=majority',
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: 'meetup inserted!' });
  }
}

export default handler;
