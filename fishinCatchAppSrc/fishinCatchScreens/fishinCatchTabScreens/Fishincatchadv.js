import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Fishincatchapplayout from '../../fishinCatchComponents/Fishincatchapplayout';
import { fishincatchadvdta } from '../../fishinCatchConsts/fishincatchadvdta';
import Fishincatchadvcard from '../../fishinCatchComponents/Fishincatchadvcard';

const { height } = Dimensions.get('window');

const Fishincatchadv = () => {
  return (
    <Fishincatchapplayout>
      <View style={styles.fishincatchcnt}>
        <Text style={styles.fishincatchtxt}>Advices</Text>
        {fishincatchadvdta.map((card, idx) => (
          <Fishincatchadvcard card={card} key={idx} />
        ))}
      </View>
    </Fishincatchapplayout>
  );
};

const styles = StyleSheet.create({
  fishincatchcnt: {
    paddingTop: height * 0.068,
    padding: 16,
    paddingBottom: 130,
  },
  fishincatchtxt: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 31,
  },
});

export default Fishincatchadv;
