import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetails from '../../components/meetups/MeetupDetails';

const MeetupDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={props.meetup.description} />
        <title>{props.meetup.title}</title>
      </Head>
      <MeetupDetails
        title={props.meetup.title}
        image={props.meetup.image}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </Fragment>
  );
};
//getServerSideProps
export const getStaticPaths = async () => {
  //get all the path combination
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rxejr.mongodb.net/meetupsDB?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  //some async task to fetch MeetupDetailPage
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    'mongodb+srv://mzbali:7eTgHYLrwi7kcuY0@cluster0.rxejr.mongodb.net/meetupsDB?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        address: meetup.address,
      },
    },
  };
};

export default MeetupDetailPage;
