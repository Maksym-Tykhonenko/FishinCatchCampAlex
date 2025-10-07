import Fishincatchapplayout from '../../fishinCatchComponents/Fishincatchapplayout';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Fishincatchreviewcard from '../../fishinCatchComponents/Fishincatchreviewcard';
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');

const Fishincatchgddtls = ({ route }) => {
  const card = route.params;
  const fishincatchnav = useNavigation();

  return (
    <Fishincatchapplayout>
      <Image
        source={card.fishincatchim}
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
        <Text style={styles.fishincatchtxt}>{card.fishincatchnm}</Text>
        <Text style={styles.fishincatchdesctxt}>{card.fishincatchdescr}</Text>
        <Text style={[styles.fishincatchtxt, { fontSize: 20 }]}>Reviews</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Text style={styles.fishincatchratetxt}>{card.fishincatchrate}</Text>
          <Text style={styles.fishincatchquantxt}>{card.fishincatchleng}</Text>
          <Image
            source={require('../../../assets/images/fishincatchstar.png')}
          />
        </View>
        {card.fishincatchreviews.map((selcard, idx) => (
          <Fishincatchreviewcard card={selcard} key={idx} />
        ))}
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
  fishincatchratetxt: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  fishincatchquantxt: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999999',
  },
});

export default Fishincatchgddtls;
