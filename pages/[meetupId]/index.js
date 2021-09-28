import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetUpDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name={props.meetupData.description}
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // this function is needed only when we use the
  // get static props
  // we need this to tello next js which dynamic pages that will be needing the page that static props would generate.
  // This must return array params which is also an
  // object that takes other objects.

  const client = await MongoClient.connect(
    'mongodb+srv://Victor:VictorEjike12@cluster0.tzilb.mongodb.net/meetups?retryWrites=true&w=majority',
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // fallback would be true or false and helps in case if the entered id is not included to what that has been pre generated.
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    //   [
    //   {
    //     params: {
    //       // this meetupId comes from the dynamic file
    //       // we have and if we have more then we add
    //       // them also here with their own object.
    //       meetupId: 'm1',
    //     },
    //   },

    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // we have access to the context that has the params
  const meetupId = context.params.meetupId;
  // fetch data for single meetups
  const client = await MongoClient.connect(
    'mongodb+srv://Victor:VictorEjike12@cluster0.tzilb.mongodb.net/meetups?retryWrites=true&w=majority',
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
