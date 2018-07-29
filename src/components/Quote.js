import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { quote } from '../selectors';

const Quote = ({ text }) => (
  <div className="quote">
    {text}
  </div>
);
Quote.propTypes = {
  text: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  text: quote(state) || '',
});

export default connect(mapStateToProps)(Quote);
