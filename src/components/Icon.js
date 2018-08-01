import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon }) => (
  <div className="icon" dangerouslySetInnerHTML={{__html: icon }} />
);
Icon.propTypes = {
  icon: PropTypes.string,
};
Icon.defaultProps = {
  icon: null,
};

export default Icon;
