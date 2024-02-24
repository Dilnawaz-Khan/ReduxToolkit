import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';

const todoIcon = require('../assets/to-do-list.png');

const NoTodos = () => {
  return (
    <View style={styles.container}>
      <Image source={todoIcon} style={styles.icon} />
      <Text style={styles.txt}>Nothing to show... Why not add one</Text>
    </View>
  );
};

export default NoTodos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  icon: {
    width: 100,
    height: 100,
    tintColor: COLORS.gray,
  },
  txt: {
    fontSize: 18,
    color: COLORS.gray,
    fontWeight: '600',
  },
});
