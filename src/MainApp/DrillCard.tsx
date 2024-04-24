import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Themes} from '../ui/theme/Theme';
import {globalStyles} from '../ui/theme/styles';

interface DrillCardProps {
  drill: {
    name: string;
  };
  onPress: () => void;
}

const DrillCard: React.FC<DrillCardProps> = props => {
  const drill = props.drill;
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.card}>
        <Text style={globalStyles.fieldHeader}>{drill.name}</Text>
        <Text style={globalStyles.validationErrorText}>Details here</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Themes.dark.buttonSurface,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default DrillCard;
