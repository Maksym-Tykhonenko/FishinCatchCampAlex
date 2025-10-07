import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFishinCatchContext } from '../fishinCatchStore/Fishincatchcntx';

const Fishincatchplannercard = ({ card }) => {
  const fishincatchnav = useNavigation();
  const { saveFishinPlanCard } = useFishinCatchContext();

  const toggleLike = () => {
    const updatedCard = { ...card, liked: !card.liked };
    saveFishinPlanCard(updatedCard, card);
  };

  return (
    <TouchableOpacity
      style={styles.fishincrdcnt}
      activeOpacity={0.8}
      onPress={() => fishincatchnav.navigate('Fishincatchplnrdtls', card)}
    >
      <Image source={{ uri: card.img }} style={styles.fishincrdimg} />
      <View
        style={{
          padding: 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={styles.fishincatchtxt}>{card.name}</Text>
          <Text style={styles.fishincatchquantxt}>{card.date}</Text>
        </View>
        <TouchableOpacity onPress={toggleLike} style={{ marginRight: 10 }}>
          <Image
            source={
              card.liked
                ? require('../../assets/images/fishincatchheart.png')
                : require('../../assets/images/fishincatchlkoucrd.png')
            }
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
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
});

export default Fishincatchplannercard;
