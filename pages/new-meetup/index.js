import { Fragment } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import NewMeetupFormfrom from '../../components/meetups/NewMeetupForm';

const MeetupFormPage = () => {
  const router = useRouter();
  const addMeetupForm = async (meetupData) => {
    const result = await axios.post('/api/new-meetup', meetupData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(result.data);
    router.push('/');
  };
  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Add new React meetups to expand our reach for netwoking"
        />
        <title>Add new React meetup</title>
      </Head>
      <NewMeetupFormfrom onAddMeetup={addMeetupForm} />
    </Fragment>
  );
};
export default MeetupFormPage;
