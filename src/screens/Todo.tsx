import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../redux-toolkit/store/store';
import {COLORS} from '../constants/Colors';
import TodoHeader from '../components/TodoHeader';
import TodoForm from '../components/TodoForm';
import FilterButtons from '../components/FilterButtons';
import {useEffect, useState} from 'react';
import TodoCard from '../components/TodoCard';
import {TodoItemInterface} from '../types';
import {deleteTodo, updateTodo} from '../redux-toolkit/slices/todoSlice';
import NoTodos from '../components/NoTodos';

const {width} = Dimensions.get('window');

const Todo = () => {
  const dispatch = useDispatch();
  const {todos} = useSelector((state: AppRootState) => state.todo);
  const [filteredTodos, setFilteredTodos] =
    useState<TodoItemInterface[]>(todos);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editTodo, setEditTodo] = useState<string | null>(null);

  useEffect(() => {
    if (todos.length > 0) setFilteredTodos(todos);

    if (selectedCategory !== 'All') {
      const categoryTodos = todos.filter(
        (item: TodoItemInterface) => item.category === selectedCategory,
      );
      setFilteredTodos(categoryTodos);
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, selectedCategory]);

  const handleOnEdit = (id: string) => {
    setEditTodo(id);
  };

  const handleOnDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleOnComplete = (todoItem: TodoItemInterface) => {
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
            handleOnComplete={handleOnComplete}
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
