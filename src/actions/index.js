import { actionCreator, createTypes } from 'redux-action-creator';

export const types = createTypes([
  'EDIT',
  'ADD',
  'TOGGLE_VISIBLE',
  'TOGGLE_ITEM',
  'EDIT_ITEM',
  'REMOVE_ITEM',
  'UPDATE_ITEM',
  'CLEAR_COMPLETED',
  'CHUCK_NORRIS_QUOTE'
], '@@TODO');

export default {
  editNewItem: actionCreator(types.EDIT, 'text'),
  addItem: actionCreator(types.ADD, 'text'),

  toggleVisible: actionCreator(types.TOGGLE_VISIBLE),
  toggleItem: actionCreator(types.TOGGLE_ITEM, 'id'),
  editItem: actionCreator(types.EDIT_ITEM, 'id', 'text'),
  removeItem: actionCreator(types.REMOVE_ITEM, 'id'),
  updateItem: actionCreator(types.UPDATE_ITEM, 'id', 'text'),
  clearCompleted: actionCreator(types.CLEAR_COMPLETED),

  chuckNorrisQuote: actionCreator(types.CHUCK_NORRIS_QUOTE, 'text'),
};