import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {deleteTodo, updateTodo} from '../redux-toolkit/slices/todoSlice';

const editIcon = require('../assets/edit.png');
const deleteIcon = require('../assets/trash.png');

const TodoCard = ({item, handleOnEdit}: any) => {
  const dispatch = useDispatch();
  const isCompleted = item.isCompleted;

  const handleOnCompleted = () => {
    dispatch(
      updateTodo({
        ...item,
        isCompleted: !item.isCompleted,
      }),
    );
  };

  const handleOnDelete = () => {
    dispatch(deleteTodo(item.id));
  };

  const handleOnEditClick = () => handleOnEdit(item.id);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleOnCompleted}
        style={[
          styles.markCompleteBtn,
          {
            borderColor: isCompleted ? COLORS.success : COLORS.secondary,
            backgroundColor: isCompleted ? COLORS.success : 'transparent',
          },
        ]}
      />
      <Text numberOfLines={2} style={styles.todoTxt}>
        {item.todo}
      </Text>
      <View style={styles.editDeleteBtnContainer}>
        <Pressable onPress={handleOnEditClick}>
          <Image
            resizeMode="contain"
            source={editIcon}
            style={styles.editIcon}
          />
        </Pressable>
        <Pressable onPress={handleOnDelete}>
          <Image
            resizeMode="contain"
            source={deleteIcon}
            style={styles.deleteIcon}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightBlack,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  markCompleteBtn: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  todoTxt: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '900',
    width: '65%',
    textAlign: 'left',
  },
  editDeleteBtnContainer: {
    height: '100%',
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingLeft: 5,
    gap: 10,
  },
  editIcon: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
  deleteIcon: {
    height: 25,
    width: 25,
    tintColor: COLORS.secondary,
  },
});
