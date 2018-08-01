import { actionCreator, createTypes } from 'redux-action-creator';

export const types = createTypes([
  'EDIT',
  'ADD',
  'TOGGLE_VISIBLE',
  'TOGGLE_ITEM',
  'EDIT_ITEM',
  'REMOVE_ITEM',
  'UPDATE_ITEM',
  'UPDATE_ITEM_ICON',
  'CLEAR_COMPLETED',
  'DRAG_END',
], '@@TODO');

export default {
  editNewItem: actionCreator(types.EDIT, 'text'),
  addItem: actionCreator(types.ADD, 'id', 'text'),

  toggleVisible: actionCreator(types.TOGGLE_VISIBLE),
  toggleItem: actionCreator(types.TOGGLE_ITEM, 'id'),
  editItem: actionCreator(types.EDIT_ITEM, 'id', 'text'),
  removeItem: actionCreator(types.REMOVE_ITEM, 'id'),
  updateItem: actionCreator(types.UPDATE_ITEM, 'id', 'text'),
  updateItemIcon: actionCreator(types.UPDATE_ITEM_ICON, 'id', 'icon'),
  clearCompleted: actionCreator(types.CLEAR_COMPLETED),
  dragEnd: actionCreator(types.DRAG_END, 'result'),
};