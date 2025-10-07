import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Fishincatchapplayout from '../../fishinCatchComponents/Fishincatchapplayout';
import { fishincatchgdsdta } from '../../fishinCatchConsts/fishincatchgdsdta';
import Fishincatchgdcard from '../../fishinCatchComponents/Fishincatchgdcard';
const { height } = Dimensions.get('window');

const Fishincatchgd = () => {
  return (
    <Fishincatchapplayout>
      <View style={styles.fishincatchcnt}>
        <Text style={styles.fishincatchtxt}>Guides</Text>
        {fishincatchgdsdta.map((card, idx) => (
          <Fishincatchgdcard card={card} key={idx} />
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

export default Fishincatchgd;
