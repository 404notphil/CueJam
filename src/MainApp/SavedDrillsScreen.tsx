import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectAllDrills} from '../store/reducers/allDrillsSlice';
import {useEffect, useState} from 'react';
import {
  deleteDrillById,
  loadAllDrills,
  loadDrillById,
} from '../services/AppDatabase';
import DrillCard from './DrillCard';
import {useAppNavigation} from '../ui/App';
import {globalStyles} from '../ui/theme/styles';

export function SavedDrillsScreen(): React.JSX.Element {
  const drillsState = useAppSelector(selectAllDrills);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [listOfSelectedIds, setListofSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    dispatch(loadAllDrills());
  }, []);

  return (
    <View style={styles.container}>
      {/* Row of action buttons */}
      <View style={{flexDirection: 'row', height: 100}}>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            listOfSelectedIds.forEach(idToDelete => {
              dispatch(deleteDrillById(idToDelete));
              dispatch(loadAllDrills());
            });
          }}>
          <Text style={globalStyles.buttonText}>
            Delete {listOfSelectedIds.length} drlls
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={drillsState.drills}
        keyExtractor={item => item.drillId.toString()}
        renderItem={({item}) => (
          <DrillCard
            drill={{name: item.name, id: item.drillId}}
            onPress={() => {
              dispatch(loadDrillById(item.drillId));
              navigation.navigate('ConfigureDrill');
            }}
            onSelect={drillId => {
              setListofSelectedIds([...listOfSelectedIds, drillId]);
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
