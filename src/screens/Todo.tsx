import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../constants/Colors';
import {useSelector} from 'react-redux';
import TodoHeader from '../components/TodoHeader';
import FilterButtons from '../components/FilterButtons';
import TodoForm from '../components/TodoForm';
import {useEffect, useState} from 'react';
import TodoCard from '../components/TodoCard';
import NoTodos from '../components/NoTodos';

const {width} = Dimensions.get('window');

const Todo = () => {
  const {todos} = useSelector((state: any) => state.todo);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editTodo, setEditTodo] = useState<string | null>(null);

  useEffect(() => {
    if (todos.length === 0) return;
    if (todos.length > 0) setFilteredTodos(todos);

    if (selectedCategory !== 'All') {
      let categoryTodos = todos.filter(
        (todo: any) => todo.category === selectedCategory,
      );
      setFilteredTodos(categoryTodos);
    } else {
      setFilteredTodos(todos);
    }
  }, [selectedCategory, todos]);

  const handleOnEdit = (id: string) => setEditTodo(id);

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
          <TodoCard item={item} handleOnEdit={handleOnEdit} />
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
