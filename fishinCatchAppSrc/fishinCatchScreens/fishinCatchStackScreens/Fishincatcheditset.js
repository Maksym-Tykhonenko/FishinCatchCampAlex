import Fishincatchapplayout from '../../fishinCatchComponents/Fishincatchapplayout';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFishinCatchContext } from '../../fishinCatchStore/Fishincatchcntx';
const { height } = Dimensions.get('window');

const Fishincatcheditset = ({ route }) => {
  const fishinedit = route.params;

  const { setFishinCatchPrfDta } = useFishinCatchContext();
  const [fishinCatchImage, setFishinCatchImage] = useState(
    fishinedit?.fishinCatchImage || '',
  );
  const [fishinCatchName, setFishinCatchName] = useState(
    fishinedit?.fishinCatchName || '',
  );
  const [fishinCatchSurname, setFishinCatchSurname] = useState(
    fishinedit?.fishinCatchSurname || '',
  );
  const fishincatchnav = useNavigation();

  let fishincatchpickeroptions = {
    storageOptions: {
      path: 'image',
      maxHeight: 700,
      maxWidth: 700,
    },
  };

  const fishinCatchImagePicker = () => {
    launchImageLibrary(fishincatchpickeroptions, response => {
      if (response.didCancel) return;

      setFishinCatchImage(response.assets[0].uri);
    });
  };

  const saveFishinCatchPrf = () => {
    const newProf = { fishinCatchImage, fishinCatchName, fishinCatchSurname };

    setFishinCatchPrfDta(newProf);
    setTimeout(() => {
      fishincatchnav.goBack();
    }, 300);
  };

  const isFishinCmplt =
    fishinCatchImage && fishinCatchName && fishinCatchSurname;

  return (
    <Fishincatchapplayout>
      <View style={styles.fishincatchcnt}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity onPress={() => fishincatchnav.goBack()}>
            <Image
              source={require('../../../assets/images/fishincatchback.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => saveFishinCatchPrf()}>
            <Text
              style={[
                styles.fishincatchratetxt,
                isFishinCmplt && { opacity: 1 },
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: 6 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.fishincatchpickcnt}
            onPress={() => fishinCatchImagePicker()}
          >
            {fishinCatchImage ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: fishinCatchImage }}
                  style={{ width: 145, height: 145, borderRadius: 100 }}
                />
                <Image
                  source={require('../../../assets/images/fishincatchpicker.png')}
                  style={{ position: 'absolute' }}
                />
              </View>
            ) : (
              <Image
                source={require('../../../assets/images/fishincatchpicker.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 36 }}>
        <TextInput
          placeholder="Name"
          value={fishinCatchName}
          onChangeText={setFishinCatchName}
          maxLength={15}
          style={styles.fishininpt}
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
        />
        <TextInput
          placeholder="Surname"
          value={fishinCatchSurname}
          maxLength={15}
          onChangeText={setFishinCatchSurname}
          style={[styles.fishininpt, { marginBottom: 40 }]}
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
        />
      </View>
    </Fishincatchapplayout>
  );
};

const styles = StyleSheet.create({
  fishincatchcnt: {
    paddingTop: height * 0.068,
    padding: 16,
    paddingBottom: 27,
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
  fishincatchprofcnt: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#040C57',
    borderRadius: 16,
  },
  fishincatchpickcnt: {
    width: 145,
    height: 145,
    borderRadius: 100,
    backgroundColor: '#040C57',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fishincatchratetxt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.5,
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
  fishininpt: {
    width: '100%',
    height: 52,
    backgroundColor: '#040C57',
    borderRadius: 100,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});

export default Fishincatcheditset;
