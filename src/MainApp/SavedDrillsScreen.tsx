import {
  FlatList,
  Image,
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
import {createDraftSafeSelectorCreator} from '@reduxjs/toolkit';

export function SavedDrillsScreen(): React.JSX.Element {
  const drillsState = useAppSelector(selectAllDrills);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [listOfSelectedIds, setListofSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    dispatch(loadAllDrills());
  }, []);

  return (
    <View style={[styles.container, {padding: 16}]}>
      {/* Row of action buttons */}
      <View
        style={{flexDirection: 'row', height: 40, justifyContent: 'center'}}>
        {listOfSelectedIds.length !== 0 && (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              listOfSelectedIds.forEach(idToDelete => {
                dispatch(deleteDrillById(idToDelete));
                dispatch(loadAllDrills());
                setListofSelectedIds([]);
              });
            }}>
            <Text style={globalStyles.buttonText}>
              Delete {listOfSelectedIds.length} drll
              {listOfSelectedIds.length > 1 ? 's' : ''}
            </Text>

            <Image
              style={{height: 20, width: 20, marginStart: 10}}
              source={require('../assets/delete_icon.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* List of drills */}
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
            onToggleSelected={(drillId, isSelected) => {
              setListofSelectedIds(
                isSelected
                  ? [...listOfSelectedIds, drillId]
                  : listOfSelectedIds.filter(id => id !== drillId),
              );
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
