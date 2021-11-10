import { Fragment } from 'react';
import classes from './MeetupDetails.module.css';

const MeetupDetails = (props) => {
  return (
    <div className={classes.details}>
      <img src={props.image} />
      <h3>{props.title}</h3>
      <h4>{props.address}</h4>
      <p>{props.description}</p>
    </div>
  );
};

export default MeetupDetails;
