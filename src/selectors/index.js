import { createSelector } from 'reselect';

export const getEditText = state => state.todo.edit;
export const isVisible = state => state.todo.visible;
export const getItems = state => state.todo.items;
export const getFilter = (_, props) => props.match.params.filter || '';
export const getQuote = state => state.todo.quote;

export const countOfItems = createSelector(
  getItems,
  items => items.length,
);

export const countOfCompletedItems = createSelector(
  getItems,
  items => items.filter(item => item.completed).length,
);

const filterFor = (filter) => {
  switch(filter) {
    case 'active':
      return item => !item.completed;
    case 'completed':
      return item => item.completed;
    default:
      return () => true;
  }
};

export const getFilteredItems = createSelector(
  [getItems, getFilter],
  (items, filter) => items.filter(filterFor(filter)),
);

export const getFilteredItemsCount = createSelector(
  getFilteredItems,
  items => items.length,
);