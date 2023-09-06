import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Item = {
  value: string;
  id: string;
  checked: boolean;
};

type ItemState = {
  toDoList: Item[];
  filter: string;
};

const initialState: ItemState = {
  toDoList: [],
  filter: 'all',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    addManyItems(state, action: PayloadAction<Item[]>) {
      state.toDoList = action.payload;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.toDoList.push(action.payload);
    },
    onTodoItemChecked: (state, action: PayloadAction<Item>) => {
      state.toDoList = state.toDoList.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return action.payload;
      });
    },
    onChangeValue: (state, action: PayloadAction<Item>) => {
      state.toDoList = state.toDoList.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return action.payload;
      });
    },
    onTodoItemRemove: (state, action: PayloadAction<string>) => {
      state.toDoList = state.toDoList.filter(
        item => item.id !== action.payload,
      );
    },
    onClearComplited: state => {
      state.toDoList = state.toDoList.filter(item => !item.checked);
    },

    onToogleCheck: state => {
      const isCheckedItem = Boolean(state.toDoList.find(item => !item.checked));
      state.toDoList = state.toDoList.map(item => {
        return {...item, checked: isCheckedItem};
      });
    },
    setTodoItem(state, action: PayloadAction<Item>) {
      state.toDoList = state.toDoList.map(e => {
        if (e.id !== action.payload.id) {
          return e;
        }
        return action.payload;
      });
    },

    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addItem,
  onTodoItemChecked,
  onTodoItemRemove,
  onClearComplited,
  onToogleCheck,
  onChangeValue,
  setFilter,
  addManyItems,
} = todoSlice.actions;

export default todoSlice.reducer;
