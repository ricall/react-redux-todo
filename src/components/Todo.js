import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterFromProps, filteredItems } from '../selectors';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Quote from './Quote';

const Todo = ({ filter, items, itemCount }) => {
  return (
    <div>
      <Header />
      <Main filter={filter} items={items} />
      <Footer filter={filter} itemCount={itemCount} />
      <Quote />
    </div>
  )
};
Todo.propTypes = {
  filter: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state, props) => {
  const filter = filterFromProps(props);
  const items = filteredItems(state, filter);

  return {
    filter: props.match.params.filter || '',
    items,
    itemCount: items.length
  }
};

export default connect(mapStateToProps)(Todo);
