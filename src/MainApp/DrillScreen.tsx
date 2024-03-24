import {Text, View} from 'react-native';
import {Themes} from '../ui/theme/Theme';

export function DrillScreen(): React.JSX.Element {
  return (
    <View style={{flex: 1, backgroundColor: Themes.dark.background}}>
      <Text>Drill</Text>
    </View>
  );
}
