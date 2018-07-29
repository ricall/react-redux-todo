import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import { isVisible } from '../selectors';
import TodoItem from "./TodoItem";

const Main = ({ items, visible, filter, toggleAll, toggleItem, editItem, removeItem, updateItem }) => (
  <section className="main">
    <input
      className="toggle-all"
      type="checkbox"
      onChange={toggleAll}
      checked={!visible}
    />
    { visible && <ul className="todo-list">
      {items.map(item =>
        <TodoItem
          key={item.id}
          item={item}
          onToggleItem={toggleItem}
          onEditItem={editItem}
          onRemoveItem={removeItem}
          onUpdateItem={updateItem}
        />
      )}
    </ul>}
  </section>
);

Main.propTypes = {
  items: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  toggleAll: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  items: props.items,
  visible: isVisible(state),
});

const mapDispatchToProps = dispatch => ({
  toggleAll: () => dispatch(actions.toggleVisible()),
  toggleItem: (id) => dispatch(actions.toggleItem(id)),
  editItem: (id, text) => dispatch(actions.editItem(id, text)),
  removeItem: (id) => dispatch(actions.removeItem(id)),
  updateItem: (id, text) => dispatch(actions.updateItem(id, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
