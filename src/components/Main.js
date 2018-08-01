import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import actions from '../actions';
import { isVisible } from '../selectors';
import TodoItem from "./TodoItem";

class Main extends Component {

  handleDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    this.props.dragEnd({
      source: this.props.items[source.index].id,
      destination: this.props.items[destination.index].id,
    });
  };

  render() {
    const { items, visible, toggleAll, toggleItem, editItem, removeItem, updateItem } = this.props;

    return (
      <section className="main">
        <input
        className="toggle-all"
        type="checkbox"
        onChange={toggleAll}
        checked={!visible}
        />
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId="todolist">
            {(provided, snapshot) => (
              <ul ref={provided.innerRef} className="todo-list">
                { visible && items.map((item, index) =>
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}>
                        <TodoItem
                          item={item}
                          onToggleItem={toggleItem}
                          onEditItem={editItem}
                          onRemoveItem={removeItem}
                          onUpdateItem={updateItem}
                        />
                      </div>
                    )}
                  </Draggable>
                )}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    );
  }
}

Main.propTypes = {
  items: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  toggleAll: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  dragEnd: PropTypes.func.isRequired,
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
  dragEnd: (result) => dispatch(actions.dragEnd(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
