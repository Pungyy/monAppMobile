import { View } from 'react-native';
import Chronometer from '@/components/Chronometer';

export default function ChronometerTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Chronometer />
    </View>
  );
}
