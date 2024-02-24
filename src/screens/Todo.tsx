import {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import FilterButtons from '../components/FilterButtons';
import NoTodos from '../components/NoTodos';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import TodoHeader from '../components/TodoHeader';
import {COLORS} from '../constants/Colors';
import {TodoItemInterface} from '../types';
import {deleteTodo, updateTodo} from '../redux-toolkit/slices/todoSlice';
import {AppRootState} from '../redux-toolkit/store/store';

const {width} = Dimensions.get('window');

const Todo = () => {
  const dispatch = useDispatch();
  const {todos} = useSelector((state: AppRootState) => state.todo);
  const [filteredTodos, setFilteredTodos] =
    useState<TodoItemInterface[]>(todos);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editTodo, setEditTodo] = useState<string | null>(null);

  useEffect(() => {
    if (todos.length === 0) return;
    if (todos.length > 0) setFilteredTodos(todos);

    if (selectedCategory !== 'All') {
      let categoryTodos = todos.filter(
        (todo: TodoItemInterface) => todo.category === selectedCategory,
      );
      setFilteredTodos(categoryTodos);
    } else {
      setFilteredTodos(todos);
    }
  }, [selectedCategory, todos]);

  const handleOnEdit = (id: string) => setEditTodo(id);

  const handleOnDelete = (id: string) => {
    setFilteredTodos(prevState => prevState.filter(item => item.id !== id));
    dispatch(deleteTodo(id));
  };

  const handleOnCompleted = (todoItem: TodoItemInterface) => {
    const {isCompleted} = todoItem;
    dispatch(
      updateTodo({
        ...todoItem,
        isCompleted: !isCompleted,
      }),
    );
  };

  return (
    <View style={styles.container}>
      {todos.length > 0 && <TodoHeader />}
      <TodoForm editTodo={editTodo} setEditTodo={setEditTodo} />
      <FilterButtons
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 10}}
        renderItem={({item}) => (
          <TodoCard
            item={item}
            handleOnEdit={handleOnEdit}
            handleOnDelete={handleOnDelete}
            handleOnCompleted={handleOnCompleted}
          />
        )}
        ListEmptyComponent={() => <NoTodos />}
      />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: COLORS.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 10,
  },
});
