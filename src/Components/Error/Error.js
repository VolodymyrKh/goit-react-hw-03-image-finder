import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ text }) => <h2>Something is wrong: {text}</h2>;

Error.propTypes ={
    text: PropTypes.string.isRequired
}
export default Error;
