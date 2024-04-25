import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectAllDrills} from '../store/reducers/allDrillsSlice';
import {useEffect} from 'react';
import {loadAllDrills, loadDrillById} from '../services/AppDatabase';
import DrillCard from './DrillCard';
import {useAppNavigation} from '../ui/App';

export function SavedDrillsScreen(): React.JSX.Element {
  const drillsState = useAppSelector(selectAllDrills);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  useEffect(() => {
    dispatch(loadAllDrills());
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={drillsState.drills}
        keyExtractor={item => item.name.toString()}
        renderItem={({item}) => (
          <DrillCard
            drill={item}
            onPress={() => {
              dispatch(loadDrillById(item.drillId));
              navigation.navigate('ConfigureDrill');
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.dark.background,
  },
});
