import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../actions';
import { countOfItems, countOfCompletedItems } from '../selectors';

const filterOptions = {
  All: '',
  Active: 'active',
  Completed: 'completed',
};

export const Footer = ({ itemCount, totalCount, hasCompletedItems, filter, onClearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{itemCount} / {totalCount}</strong> {`item${totalCount > 1 ? 's' : ''}`}
    </span>
    <ul className="filters">
      {Object.entries(filterOptions).map(([name, path]) => (
        <li key={name}>
          <a href={`#/${path}`} className={classNames({ selected: filter === path })}>{name}</a>
        </li>
      ))}
    </ul>
    {hasCompletedItems &&
      <button
        className="clear-completed"
        onClick={onClearCompleted}>Clear completed</button>
    }
  </footer>
);
Footer.propTypes = {
  itemCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  hasCompletedItems: PropTypes.bool.isRequired,
  filter: PropTypes.string,
  onClearCompleted: PropTypes.func.isRequired,
};
Footer.defaultProps = {
  filter: '',
};

const mapStateToProps = (state, props) => ({
  itemCount: props.itemCount,
  totalCount: countOfItems(state),
  hasCompletedItems: countOfCompletedItems(state) > 0,
  filter: props.filter,
});

const mapDispatchToProps = dispatch => ({
  onClearCompleted: () => dispatch(actions.clearCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
