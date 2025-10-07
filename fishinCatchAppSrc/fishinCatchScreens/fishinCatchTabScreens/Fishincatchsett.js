import Fishincatchapplayout from '../../fishinCatchComponents/Fishincatchapplayout';
import { useNavigation } from '@react-navigation/native';
import { useFishinCatchContext } from '../../fishinCatchStore/Fishincatchcntx';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { height } = Dimensions.get('window');

const Fishincatchsett = () => {
  const fishincatchnav = useNavigation();
  const { fishinCatchPrfDta } = useFishinCatchContext();

  return (
    <Fishincatchapplayout>
      <View style={styles.fishincatchcnt}>
        <Text style={styles.fishincatchtxt}>Settings</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          top: -height * 0.13,
        }}
      >
        <View style={styles.fishincatchprofcnt}>
          {fishinCatchPrfDta ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 25,
                gap: 15,
              }}
            >
              <Image
                source={{ uri: fishinCatchPrfDta.fishinCatchImage }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 100,
                }}
              />
              <Text style={styles.fishincatnmtxt}>
                {fishinCatchPrfDta.fishinCatchName}{' '}
                {fishinCatchPrfDta.fishinCatchSurname}
              </Text>
            </View>
          ) : (
            <View style={styles.fishincatchpickcnt}>
              <Image
                source={require('../../../assets/images/fishincatchpicker.png')}
                style={{ width: 20, height: 17 }}
              />
            </View>
          )}

          <Text style={styles.fishincatchquantxt}>Account Settings</Text>

          <TouchableOpacity
            style={styles.fishincatchwrpp}
            activeOpacity={0.8}
            onPress={() =>
              fishincatchnav.navigate('Fishincatcheditset', fishinCatchPrfDta)
            }
          >
            <Text style={styles.fishincatchratetxt}>Edit profile</Text>
            <Image
              source={require('../../../assets/images/fishincatcharr.png')}
              style={{ width: 20, height: 17 }}
            />
          </TouchableOpacity>

          <View style={styles.fishincatcline} />
          <Text style={styles.fishincatchquantxt}>More</Text>
          <View style={{ gap: 18 }}>
            {/* <TouchableOpacity
              style={styles.fishincatchwrpp}
              activeOpacity={0.8}
            >
              <Text style={styles.fishincatchratetxt}>Developer Website</Text>
              <Image
                source={require('../../../assets/images/fishincatcharr.png')}
                style={{ width: 20, height: 17 }}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.fishincatchwrpp}
              activeOpacity={0.8}
              onPress={() =>
                Linking.openURL(
                  'https://www.termsfeed.com/live/9334f55c-46db-4faa-a1c3-42ae5d720e5a',
                )
              }
            >
              <Text style={styles.fishincatchratetxt}>Privacy Policy</Text>
              <Image
                source={require('../../../assets/images/fishincatcharr.png')}
                style={{ width: 20, height: 17 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fishincatchwrpp}
              activeOpacity={0.8}
              onPress={() =>
                Linking.openURL(
                  'https://www.termsfeed.com/live/44e9f2e3-6baf-46a3-967c-b00facc45b66',
                )
              }
            >
              <Text style={styles.fishincatchratetxt}>Terms of Use</Text>
              <Image
                source={require('../../../assets/images/fishincatcharr.png')}
                style={{ width: 20, height: 17 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 80 }} />
    </Fishincatchapplayout>
  );
};

const styles = StyleSheet.create({
  fishincatchcnt: {
    paddingTop: height * 0.068,
    padding: 16,
    paddingBottom: 130,
    backgroundColor: '#061282',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  fishincatchtxt: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 31,
  },
  fishincatnmtxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  fishincatchprofcnt: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#040C57',
    borderRadius: 16,
  },
  fishincatchpickcnt: {
    width: 52,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#061282',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  fishincatchratetxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  fishincatchquantxt: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    marginBottom: 16,
  },
  fishincatcline: {
    width: '100%',
    height: 0.3,
    backgroundColor: '#CACACA',
    marginVertical: 16,
  },
  fishincatchwrpp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Fishincatchsett;
