import React, { useState } from 'react';
import BucketForm from './BucketForm';

function Bucket(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  console.log(props.bucket);

  const submitUpdate = (value) => {

    props.editBucketItem(edit.id, value);
    setEdit({
      id: null,
      value: '',
      eagerness: '',
    });
  };

  // If the user is attempting to edit an item, render the bucket form with the edit variable passed as a prop
  if (edit.id) {
    return <BucketForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.bucket.map((item, index) => (
    <div className={ `bucket row ${item.completed ? "complete" : ""} ${item.eagerness}`} key={index}>
      <div key={index} onClick={function() { props.completeBucketItem(item.id) }}>
          {props.bucket[index].text}
      </div>
      <div className="icons">
        <p onClick={function(event) {
          event.preventDefault();
          setEdit({
            id: item.id,
            value: item.text,
            eagerness: item.eagerness,
          });
        }}> ✏️</p>
        <p onClick={function() { props.removeBucketItem(item.id) }}> 🗑️</p>
      </div>
    </div>
  ));
}

export default Bucket;
