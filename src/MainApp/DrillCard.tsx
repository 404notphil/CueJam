import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import {globalStyles} from '../ui/theme/styles';
import CheckBox from '@react-native-community/checkbox';
import EditIcon from '../assets/EditIcon';
import PlayIcon from '../assets/PlayIcon';
import {useAppDispatch} from '../store/hooks';
import {loadDrillById} from '../services/AppDatabase';
import {useAppNavigation} from '../ui/App';

interface DrillCardProps {
  drill: {
    name: string;
    id: number;
  };
  details: string;
  onPress: () => void;
  onToggleSelected: (drillId: number, isSelected: boolean) => void;
}

const DrillCard: React.FC<DrillCardProps> = props => {
  const drill = props.drill;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  return (
    <View style={[styles.card]}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={{flex: 1}} onPress={props.onPress}>
          <View>
            <Text style={[globalStyles.fieldHeader, {marginTop: 0}]}>
              {drill.name}
            </Text>
            <Text style={globalStyles.infoText}>{props.details}</Text>
          </View>
        </TouchableOpacity>
        <CheckBox
          style={{margin: 16}}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => {
            setToggleCheckBox(newValue);
            props.onToggleSelected(drill.id, newValue);
          }}
        />
      </View>
      <View
        style={{
          paddingTop: 5,
          flexDirection: 'row',
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(loadDrillById(drill.id));
            navigation.navigate('Drill');
          }}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <PlayIcon
            size={20}
            style={{justifyContent: 'center', marginEnd: 8}}
          />
          <Text style={styles.cardButtonText}>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(loadDrillById(drill.id));
            navigation.navigate('ConfigureDrill');
          }}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <EditIcon
            size={20}
            style={{justifyContent: 'center', marginEnd: 8}}
          />
          <Text style={styles.cardButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Themes.dark.buttonSurface,
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardButtonText: {
    fontSize: 25,
    marginBottom: 3,
    color: Themes.dark.actionText,
    fontWeight: '600',
    fontFamily: 'arciform',
  },
});

export default DrillCard;
