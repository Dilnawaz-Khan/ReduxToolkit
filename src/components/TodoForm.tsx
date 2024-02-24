import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import {COLORS} from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../redux-toolkit/store/store';
import {useEffect, useState} from 'react';
import {addTodo, updateTodo} from '../redux-toolkit/slices/todoSlice';
import {TodoItemInterface} from '../types';

const todoIcon = require('../assets/checklist.png');

interface TodoFormProps {
  editTodo: string | null;
  setEditTodo: (value: string | null) => void;
}

const TodoForm = ({editTodo, setEditTodo}: TodoFormProps) => {
  const dispatch = useDispatch();
  const {todos, categories} = useSelector((state: AppRootState) => state.todo);
  const [selectedCategory, setSelectedCategory] = useState('Other');
  const [todo, setTodo] = useState('');

  const toBeUpdate_todo = todos.filter(
    (item: TodoItemInterface) => item.id === editTodo,
  )[0];

  useEffect(() => {
    if (editTodo !== null) {
      setTodo(toBeUpdate_todo.todo);
      setSelectedCategory(toBeUpdate_todo.category);
    }
  }, [editTodo]);

  const handleAddTodo = () => {
    if (todo) {
      if (editTodo === null) dispatch(addTodo(todo, selectedCategory));
      else
        dispatch(
          updateTodo({
            id: toBeUpdate_todo.id,
            todo,
            category: selectedCategory,
            isCompleted: toBeUpdate_todo.isCompleted,
          }),
        );
    }
    setTodo('');
    setEditTodo(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoFormContainer}>
        <TextInput
          placeholder="Write your next task..."
          placeholderTextColor={COLORS.gray}
          style={styles.textInp}
          value={todo}
          onChangeText={setTodo}
        />
        <SelectDropdown
          data={categories}
          onSelect={(selectedItem: string) => setSelectedCategory(selectedItem)}
          defaultValue={'Other'}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
          dropdownStyle={styles.dropdownStyle}
          rowTextStyle={styles.rowTextStyle}
        />
      </View>
      <Pressable style={styles.addBtn} onPress={handleAddTodo}>
        <Image source={todoIcon} style={styles.img} />
        <Text style={styles.addBtnTxt}>
          {editTodo !== null ? 'Update' : 'Add'} Todo
        </Text>
      </Pressable>
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    gap: 10,
  },
  todoFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInp: {
    width: '70%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.secondary,
    height: 40,
    paddingHorizontal: 10,
    color: COLORS.white,
    borderRadius: 7,
  },
  buttonStyle: {
    width: '28%',
    height: 40,
    backgroundColor: COLORS.secondary,
    borderRadius: 6,
  },
  buttonTextStyle: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '800',
  },
  dropdownStyle: {
    backgroundColor: COLORS.lightBlack,
    borderRadius: 10,
  },
  rowTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '700',
  },
  addBtn: {
    paddingVertical: 15,
    width: '100%',
    borderRadius: 7,
    backgroundColor: COLORS.secondary + 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    flexDirection: 'row',
    gap: 10,
  },
  img: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  addBtnTxt: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '900',
  },
});
