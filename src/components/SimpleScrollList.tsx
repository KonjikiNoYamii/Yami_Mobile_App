import { ScrollView, View, Text } from 'react-native';
import { Style } from '../styles/style';

interface Props { items: string[]; }

export const SimpleScrollList: React.FC<Props> = ({ items }) => (
  <ScrollView style={{ flex: 1 }}>  {/* ubah ke ScrollView + flex: 1 */}
    <View style={Style.sectionWrap}>
      <Text style={Style.sectionTitle}>Overview</Text>
      {items.map((it, idx) => (
        <View key={idx} style={Style.row}>
          <Text style={Style.rowText}>{it}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);
