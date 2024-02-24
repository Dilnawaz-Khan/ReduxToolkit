import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {AppRootState} from '../redux-toolkit/store/store';
import {COLORS} from '../constants/Colors';

interface FilterButtonsProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const FilterButtons = ({
  selectedCategory,
  setSelectedCategory,
}: FilterButtonsProps) => {
  const {categories} = useSelector((state: AppRootState) => state.todo);
  const categoriesList = ['All', ...categories];

  const handleTabSelection = (selectedTab: string) => {
    setSelectedCategory(selectedTab);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 20}}>
        {categoriesList.map(item => (
          <Pressable
            onPress={() => handleTabSelection(item)}
            key={item}
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  selectedCategory === item
                    ? COLORS.secondary + 40
                    : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.filterBtnTxt,
                {
                  color:
                    selectedCategory === item ? COLORS.white : COLORS.secondary,
                },
              ]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterButtons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  filterBtn: {
    borderRadius: 4,
    paddingHorizontal: 19,
    paddingVertical: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.secondary,
  },
  filterBtnTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
