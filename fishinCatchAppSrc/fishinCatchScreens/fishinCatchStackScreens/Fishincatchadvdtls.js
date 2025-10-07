import Fishincatchapplayout from '../../fishinCatchComponents/Fishincatchapplayout';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { height } = Dimensions.get('window');

const Fishincatchadvdtls = ({ route }) => {
  const card = route.params;
  const fishincatchnav = useNavigation();

  return (
    <Fishincatchapplayout>
      <Image
        source={card.fishincatchadvim}
        style={{
          width: '100%',
          height: height * 0.36,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={{ position: 'absolute', top: 68, left: 22 }}
        onPress={() => fishincatchnav.goBack()}
      >
        <Image source={require('../../../assets/images/fishincatchback.png')} />
      </TouchableOpacity>
      <View style={styles.fishincatchcnt}>
        <Text style={styles.fishincatchtxt}>{card.fishincatchadvname}</Text>
        <Text style={styles.fishincatchdesctxt}>
          {card.fishincatchadvdescr}
        </Text>
      </View>
    </Fishincatchapplayout>
  );
};

const styles = StyleSheet.create({
  fishincatchcnt: {
    padding: 16,
  },
  fishincatchtxt: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  fishincatchdesctxt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999999',
    marginBottom: 21,
  },
});

export default Fishincatchadvdtls;
