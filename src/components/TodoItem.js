import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.editRef = createRef()
  }

  componentDidUpdate(prevProps) {
    const prevEditing = prevProps.item.editing;
    const editing = this.props.item.editing;

    if (!prevEditing && editing) {
      const node = this.editRef.current;
      node.focus();
      node.setSelectionRange(0, node.value.length);
    }
  }

  render() {
    const { item, onToggleItem, onEditItem, onRemoveItem, onUpdateItem} = this.props;
    const { id, completed, editing, title, editText } = item;
    return (
      <li className={classNames({
        completed: completed,
        editing: editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => onToggleItem(id)}
          />
          <label onDoubleClick={() => onEditItem(id)}>
            {title}
          </label>
          <button className="destroy" onClick={() => onRemoveItem(id)} />
        </div>
        <input
          ref={this.editRef}
          className="edit"
          value={editText || ''}
          onBlur={e => onUpdateItem(id, e.target.value)}
          onChange={e => onEditItem(id, e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode !== 13) {
              return;
            }
            onUpdateItem(id, e.target.value);
          }}
        />
      </li>
    );
  }
}
TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  onToggleItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
};

export default TodoItem;
