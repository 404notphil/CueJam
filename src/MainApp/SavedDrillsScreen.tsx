import {Text, View} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectAllDrills} from '../store/reducers/allDrillsSlice';
import {useEffect} from 'react';
import {loadAllDrills} from '../services/AppDatabase';

export function SavedDrillsScreen(): React.JSX.Element {
  const drillsState = useAppSelector(selectAllDrills);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAllDrills());
    console.log('12345 loading drills');
  }, []);

  useEffect(() => {
    drillsState.drills.forEach(item => {
      console.log('12345 name = ' + item.name);
    });
  }, [drillsState]);

  return (
    <View style={{flex: 1, backgroundColor: Themes.dark.background}}>
      <Text>Saved Drills</Text>
    </View>
  );
}
