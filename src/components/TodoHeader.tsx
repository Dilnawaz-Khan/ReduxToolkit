import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';
import {useSelector} from 'react-redux';
import {AppRootState} from '../redux-toolkit/store/store';
import {TodoItemInterface} from '../types';

const TodoHeader = () => {
  const {todos} = useSelector((state: AppRootState) => state.todo);

  const allTodos = todos.length;
  const completedTodos = todos.filter(
    (todo: TodoItemInterface) => todo.isCompleted,
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.todoHeaderTextContainer}>
        <Text style={styles.todoDoneTxt}>Todo Done</Text>
        <Text style={styles.keepItUpTxt}>Keep it up</Text>
      </View>
      <View style={styles.statsCircleContainer}>
        <Text style={styles.statsTxt}>
          {completedTodos}/{allTodos}
        </Text>
      </View>
    </View>
  );
};

export default TodoHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 7,
    borderColor: COLORS.grayLight,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 35,
  },
  todoHeaderTextContainer: {
    marginTop: 10,
  },
  todoDoneTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  keepItUpTxt: {
    fontSize: 15,
    color: COLORS.gray,
  },
  statsCircleContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.black,
    letterSpacing: 3,
  },
});
