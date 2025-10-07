import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Fishincatchgdcard = ({ card }) => {
  const fishincatchnav = useNavigation();

  return (
    <TouchableOpacity
      style={styles.fishincrdcnt}
      activeOpacity={0.8}
      onPress={() => fishincatchnav.navigate('Fishincatchgddtls', card)}
    >
      <Image source={card.fishincatchim} style={styles.fishincrdimg} />
      <View style={{ padding: 10, paddingHorizontal: 20 }}>
        <Text style={styles.fishincatchtxt}>{card.fishincatchnm}</Text>

        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <Text style={styles.fishincatchratetxt}>{card.fishincatchrate}</Text>
          <Text style={styles.fishincatchquantxt}>{card.fishincatchleng}</Text>
          <Image source={require('../../assets/images/fishincatchstar.png')} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fishincrdcnt: {
    width: '100%',
    backgroundColor: '#040C57',
    borderRadius: 32,
    paddingBottom: 10,
    marginBottom: 20,
  },
  fishincrdimg: {
    width: '100%',
    height: 170,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
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
});

export default Fishincatchgdcard;
