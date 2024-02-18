import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
  resetCount,
} from '../redux-toolkit/slices/counterSlices';

const resetIcon = require('../assets/reset.png');

const Counter = () => {
  const [byValue, setByValue] = useState(1);

  const {value} = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();

  const onValueChange = (value: string) => setByValue(Number(value));

  const handleIncrement = () => {
    if (byValue > 1) dispatch(incrementByAmount(byValue));
    else dispatch(increment());
  };

  const handleDecrement = () => {
    if (byValue > 1) dispatch(decrementByAmount(byValue));
    else dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(resetCount());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Toolkit</Text>
      <View style={styles.counterNResetBtnContainer}>
        <Text style={styles.counterValue}>{value}</Text>
        <Pressable onPress={handleReset}>
          <Image source={resetIcon} style={styles.resetIcon} />
        </Pressable>
      </View>

      <TextInput
        placeholder="Increment/Decrement by value"
        placeholderTextColor={'gray'}
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onValueChange}
      />

      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={handleIncrement}>
          <Text style={styles.btnText}>Increment</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleDecrement}>
          <Text style={styles.btnText}>Decrement</Text>
        </Pressable>
      </View>

      <Text style={styles.developedByDill}>Developed by Codingwith Dill</Text>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: COLORS.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 3,
  },
  counterValue: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: '900',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  btn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 7,
  },
  btnText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '800',
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  developedByDill: {
    color: COLORS.grayLight + 70,
    fontSize: 13,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  counterNResetBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resetIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.red,
  },
});
