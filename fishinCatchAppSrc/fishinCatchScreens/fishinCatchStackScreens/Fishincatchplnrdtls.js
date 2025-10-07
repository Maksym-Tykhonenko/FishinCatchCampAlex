import Fishincatchapplayout from '../../fishinCatchComponents/Fishincatchapplayout';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useFishinCatchContext } from '../../fishinCatchStore/Fishincatchcntx';
import MapView, { Callout, Marker } from 'react-native-maps';
const { height } = Dimensions.get('window');
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Fishincatchplnrdtls = ({ route }) => {
  const card = route.params;
  const fishincatchnav = useNavigation();
  const [showFishinCatchMenu, setShowFishinCatchMenu] = useState(false);
  const [showFishinCatchMap, setShowFishinCatchMap] = useState(false);
  const [cardData, setCardData] = useState(route.params);
  const [region, setRegion] = useState({
    latitude: card.lat,
    longitude: card.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const { deleteFishinPlanCard, savedPlanners, saveFishinPlanCard } =
    useFishinCatchContext();

  useEffect(() => {
    const updatedCard = savedPlanners.find(c => c.id === route.params.id);
    if (updatedCard) setCardData(updatedCard);
  }, [savedPlanners]);

  const toggleLike = () => {
    const updatedCard = { ...cardData, liked: !cardData.liked };
    setCardData(updatedCard);
    saveFishinPlanCard(updatedCard, cardData);
  };

  return (
    <>
      {showFishinCatchMap ? (
        <View style={{}}>
          <View style={styles.fishincatchcnthdr}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowFishinCatchMap(false)}
            >
              <Image
                source={require('../../../assets/images/fishincatchbackbt.png')}
              />
            </TouchableOpacity>
            <Text style={styles.fishincatchmpttl}>{card.name}</Text>
          </View>

          <MapView
            style={{ width: '100%', height: '100%' }}
            customMapStyle={darkFishinCatchMapStyle}
            provider={Platform.OS === 'ios' ? 'google' : undefined}
            region={region}
          >
            <Marker
              coordinate={{
                latitude: card.lat,
                longitude: card.lng,
              }}
            >
              {Platform.OS === 'ios' ? (
                <Image
                  source={require('../../../assets/images/fishincatchmark.png')}
                />
              ) : null}

              <Callout tooltip>
                <View style={{ width: 300, alignItems: 'center' }}>
                  <Text style={styles.calloutText}>{card.addr}</Text>
                </View>
              </Callout>
            </Marker>
          </MapView>
          <TouchableOpacity
            style={[
              styles.fishincatchbtn,
              { position: 'absolute', bottom: 60, width: '90%', left: '5%' },
            ]}
            onPress={() => setShowFishinCatchMap(false)}
          >
            <Text style={styles.fishincatchbtntxt}>Back to card</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Fishincatchapplayout>
          <View style={styles.fishincatchcnt}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{}}
                  onPress={() => fishincatchnav.goBack()}
                >
                  <Image
                    source={require('../../../assets/images/fishincatchbk.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.fishincatchhdttl}>{card.cat}</Text>
              </View>

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{}}
                  onPress={() => setShowFishinCatchMap(true)}
                >
                  <Image
                    source={require('../../../assets/images/fishincatchlocic.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleLike}>
                  <Image
                    source={
                      cardData.liked
                        ? require('../../../assets/images/fishincatchheart.png')
                        : require('../../../assets/images/fishincatchheartout.png')
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{}}
                  onPress={() => setShowFishinCatchMenu(true)}
                >
                  <Image
                    source={require('../../../assets/images/fishincatchdts.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Image
              source={{ uri: card.img }}
              style={{
                width: '100%',
                height: height * 0.18,
                borderRadius: 32,
                marginVertical: 20,
              }}
            />

            <Text style={styles.fishincatchtxt}>{card.name}</Text>
            <Text style={styles.fishincatchdesctxt}>
              {card.fishincatchdescr}
            </Text>
            <Text style={[styles.fishincatchtxt, { fontSize: 20 }]}>
              Reviews
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <Text style={styles.fishincatchquantxt}>{card.addr}</Text>
              <Text style={styles.fishincatchquantxt}>{card.date}</Text>
            </View>

            <View style={styles.fishincatchcntchk}>
              <Text style={styles.fishincatchtxt}>Check-list</Text>
              <Text
                style={styles.fishincatchtxtdesc}
              >{`Before going fishing, it is important to make sure that you have all the necessary equipment. This will help to avoid unpleasant surprises and make your stay more comfortable.

To keep the catch fresh, use special containers that will protect it from unwanted guests such as flies or other animals.

Don't forget to bring insect repellents with you to avoid unpleasant bites and bites that can ruin your mood.`}</Text>
            </View>

            <Text style={styles.fishincatchtxt}>Description</Text>

            <Text style={styles.fishincatchtxtabt}>{card.desc}</Text>
          </View>
          {showFishinCatchMenu && (
            <>
              <View style={styles.fishincatchoverlay} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  gap: 20,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.fishincatchmencnt}
                  onPress={() => {
                    deleteFishinPlanCard(card),
                      setTimeout(() => {
                        fishincatchnav.goBack();
                      }, 300);
                  }}
                >
                  <Text style={styles.fishincatchdeltxt}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.fishincatchmendelcnt}
                  onPress={() => setShowFishinCatchMenu(false)}
                >
                  <Text style={styles.fishincatchcnctxt}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Fishincatchapplayout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fishincatchcnt: {
    padding: 16,
    paddingTop: height * 0.068,
  },
  fishincatchbtn: {
    width: '100%',
    backgroundColor: '#F7460B',
    borderRadius: 100,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 46,
  },
  fishincatchbtntxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  fishincatchtxt: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    marginTop: 5,
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
  fishincatchhdttl: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  fishincatchcntchk: {
    width: '100%',
    backgroundColor: '#040C57',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
  },
  fishincatchtxtdesc: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  fishincatchtxtabt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  fishincatchoverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fishincatchmencnt: {
    width: '90%',
    height: 56,
    backgroundColor: '#040C57',
    position: 'absolute',
    bottom: 108,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishincatchmendelcnt: {
    width: '90%',
    height: 56,
    backgroundColor: '#040C57',
    position: 'absolute',
    bottom: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishincatchcnctxt: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FDB905',
    letterSpacing: -0.4,
  },
  fishincatchdeltxt: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FF3B30',
    letterSpacing: -0.4,
  },
  fishincatchln: {
    width: '100%',
    backgroundColor: '#8080808C',
    height: 0.6,
    marginVertical: 13,
  },
  fishincatchaddbtn: {
    width: 72,
    height: 34,
    backgroundColor: '#F7460B',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  fishincatchaddbtntxt: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
  fishincatchwrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
    marginTop: 20,
  },
  fishincatchwrpr: { flexDirection: 'row', gap: 12, marginTop: 49 },
  callout: {
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 6,
    maxWidth: 300,
    alignItems: 'center',
  },
  calloutText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 20,
  },
  fishincatchmpttl: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 24,
  },
  fishincatchcnthdr: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  fishincatchcatcnt: {
    width: 100,
    height: 40,
    backgroundColor: '#061282',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});

export default Fishincatchplnrdtls;

const darkFishinCatchMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
];
