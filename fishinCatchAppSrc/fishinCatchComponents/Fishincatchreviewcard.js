import { Image, StyleSheet, Text, View } from 'react-native';

const Fishincatchreviewcard = ({ card }) => {
  return (
    <View style={styles.fishincrdcnt}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Image source={card.rewpht} style={styles.fishincrdimg} />
        <Text style={styles.fishincatchtxt}>{card.rewname}</Text>
      </View>

      <View style={styles.fishinwrap}>
        {Array.from({ length: 5 }, (_, index) => {
          const starNumber = index + 1;
          return (
            <Image
              key={index}
              source={
                starNumber <= card.rewrat
                  ? require('../../assets/images/fishincatchstaract.png')
                  : require('../../assets/images/fishincatchstarin.png')
              }
            />
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
        <Text style={styles.fishincatchratetxt}>{card.rewtxt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fishincrdcnt: {
    width: '100%',
    backgroundColor: '#040C57',
    borderRadius: 32,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 27,
    marginBottom: 12,
  },
  fishincatchtxt: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  fishincatchratetxt: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    width: '95%',
  },
  fishincatchquantxt: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999999',
  },
  fishinwrap: { flexDirection: 'row', gap: 3, marginTop: 5, marginBottom: 12 },
});

export default Fishincatchreviewcard;
