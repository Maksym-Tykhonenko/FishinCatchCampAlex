import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Fishincatchadvcard = ({ card }) => {
  const fishincatchnav = useNavigation();

  return (
    <View style={styles.fishincrdcnt}>
      <Image source={card.fishincatchadvim} style={styles.fishincrdimg} />

      <TouchableOpacity
        style={styles.fishincatchttlcnt}
        activeOpacity={0.8}
        onPress={() => fishincatchnav.navigate('Fishincatchadvdtls', card)}
      >
        <Text style={styles.fishincatchtxt}>{card.fishincatchadvname}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fishincrdcnt: {
    width: '100%',
    backgroundColor: '#040C57',
    borderRadius: 32,
    alignItems: 'center',
    marginBottom: 21,
  },
  fishincrdimg: {
    width: '100%',
    height: 222,
    borderRadius: 32,
  },
  fishincatchtxt: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
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
  fishincatchttlcnt: {
    padding: 10,
    paddingHorizontal: 20,
    width: '90%',
    position: 'absolute',
    backgroundColor: '#040C57',
    borderRadius: 100,
    alignItems: 'center',
    bottom: 14,
  },
});

export default Fishincatchadvcard;
