export const editText = state => state.todo.edit;

export const isVisible = state => state.todo.visible;

export const countOfItems = state => state.todo.items.length;
export const countOfCompletedItems = state => state.todo.items.filter(item => item.completed).length;

export const filterFromProps = props => props.match.params.filter;

const filterOn = (filter) => {
  switch(filter) {
    case 'active':
      return item => !item.completed;
    case 'completed':
      return item => item.completed;
    default:
      return () => true;
  }
};
export const filteredItems = (state, filter) => state.todo.items.filter(filterOn(filter));

export const quote = state => state.todo.quote;
