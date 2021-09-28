import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups App</title>
        <meta
          name="description"
          content="How to make a reactive react and next-js meetups App"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  //fetch data from an API or from the file system in nodejs for example
  // fetch data from server
  // fetch data from util where you can set a local database like in your project.
  // this gives us the benefit of nexts server rendering capability.
  // it takes props object which takes the data object that you get from the database.
  // this function must return an object.
  // get static props sets the static html webpage on build time.

  // this code would get back the submitted meetups from the server!
  const client = await MongoClient.connect(
    'mongodb+srv://Victor:VictorEjike12@cluster0.tzilb.mongodb.net/meetups?retryWrites=true&w=majority',
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(), // id from mongodb
      })),
    },

    // this will always regenerate the static website every number of seconds you set here.
    revalidate: 1,
  };
}

// ###################################################

/* export async function getServerSideProps(context) {

  const req = context.req;
  const res = context.res;

  //fetch data from an API or from the file system in nodejs for example
  // fetch data from server
  // fetch data from util where you can set a local database like in your project.
  // this gives us the benefit of nexts server rendering capability.
  // it takes props object which takes the data object that you get from the database.
  // this function must return an object.
  return {
    props: {
    meetups: DUMMY_MEETUPS
    },
  };
}
 */
