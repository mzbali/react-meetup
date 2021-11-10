// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from 'mongodb';
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    //const { title, image, location, address } = data;
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rxejr.mongodb.net/meetupsDB?retryWrites=true&w=majority`
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Inserted Succesfully!' });
  }
};

export default handler;
