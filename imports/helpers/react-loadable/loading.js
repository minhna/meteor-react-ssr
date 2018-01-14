import React from 'react';

const Loading = (props) => {
  // console.log(props);
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  }

  return null;
};

export default Loading;
