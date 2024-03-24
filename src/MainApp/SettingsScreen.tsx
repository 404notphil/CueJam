import {Text, View} from 'react-native';
import {Themes} from '../ui/theme/Theme';

export function ConfigureDrillScreen(): React.JSX.Element {
  return (
    <View style={{flex: 1, backgroundColor: Themes.dark.background}}>
      <Text>Configure Drill</Text>
    </View>
  );
}
