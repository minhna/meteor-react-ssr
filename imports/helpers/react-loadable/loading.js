import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
  const {
    error, timedOut, pastDelay, retry,
  } = props;
  if (error) {
    return (
      <div>
        {`Error! ${error.message || ''} `}
        <button type="button" onClick={() => { retry(); }}>Retry</button>
      </div>
    );
  }
  if (timedOut) {
    return <div>Taking a long time...</div>;
  }
  if (pastDelay) {
    return <div>Loading...</div>;
  }

  return null;
};

Loading.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  retry: PropTypes.func,
};

Loading.defaultProps = {
  error: null,
  timedOut: false,
  pastDelay: false,
  retry: () => {},
};

export default Loading;
