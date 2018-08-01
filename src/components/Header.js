import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { getEditText } from '../selectors';
import actions from '../actions';

const Header = ({ value, onKeyDown, onChange }) => (
  <header className="header">
    <h1>todos</h1>
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
      autoFocus={true}
    />
  </header>
);
Header.propTypes = {
  value: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: getEditText(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(actions.editNewItem(e.target.value)),
  onKeyDown: (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();
    dispatch(actions.addItem(uuid(), e.target.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);