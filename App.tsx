import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';

import AppStatusBar from './src/components/AppStatusBar';
import {COLORS} from './src/constants/Colors';
import {store} from './src/redux-toolkit/store/store';
import Counter from './src/screens/Counter';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppStatusBar backgroundColor={COLORS.black} barStyle="light-content" />
        <Counter />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
