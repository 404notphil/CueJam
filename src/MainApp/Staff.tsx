import Pentagram from './Pentagram';
import WholeNote from './WholeNote';
import {globalStyles} from '../ui/theme/styles';
import {View} from 'react-native';

export function Staff(): React.JSX.Element {
  return (
    <View style={{flexDirection: 'row', position: 'absolute'}}>
      <View
        style={[
          {
            padding: 0,
            position: 'relative',
            borderWidth: 1,
            borderColor: 'white',
          },
        ]}>
        <Pentagram width={100} height={150} lineSpacing={22} />
        <WholeNote
          style={{
            transform: [{scale: 0.3}],
            position: 'absolute',
            top: 10,
            left: 10,
          }}
        />
        <WholeNote
          style={{
            transform: [{scale: 0.32}],
            position: 'absolute',
            top: 32,
            left: 10,
          }}
        />
        <WholeNote
          style={{
            transform: [{scale: 0.32}],
            position: 'absolute',
            top: 54,
            left: 10,
          }}
        />
        <WholeNote
          style={{
            transform: [{scale: 0.32}],
            position: 'absolute',
            top: 66,
            left: -15,
          }}
        />
      </View>
      <View style={[{padding: 0, position: 'relative'}]}>
        <Pentagram width={200} height={100} lineSpacing={22} />
        <WholeNote
          style={{
            transform: [{scale: 0.3}],
            position: 'absolute',
            top: 10,
            left: 10,
          }}
        />
        <WholeNote
          style={{
            transform: [{scale: 0.32}],
            position: 'absolute',
            top: 32,
            left: 10,
          }}
        />
        <WholeNote
          style={{
            transform: [{scale: 0.32}],
            position: 'absolute',
            top: 54,
            left: 10,
          }}
        />
        <WholeNote
          style={{
            transform: [{scale: 0.32}],
            position: 'absolute',
            top: 66,
            left: -15,
          }}
        />
      </View>
    </View>
  );
}
