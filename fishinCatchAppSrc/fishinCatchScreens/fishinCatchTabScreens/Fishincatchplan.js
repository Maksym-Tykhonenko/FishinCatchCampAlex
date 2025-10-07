import Fishincatchapplayout from '../../fishinCatchComponents/Fishincatchapplayout';
import { useCallback, useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFishinCatchContext } from '../../fishinCatchStore/Fishincatchcntx';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import Fishincatchplannercard from '../../fishinCatchComponents/Fishincatchplannercard';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
const { height } = Dimensions.get('window');
Geocoder.init('AIzaSyDU9BVwbP1PaxH77r2WhYIunL23CLo0_Mw', { language: 'en' });
const fishincatchcat = ['Fishing', 'Camps', 'Shops'];

const fishincatchmapstyle = [
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

const Fishincatchplan = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(250);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isFishinCrdVisible, setIsFishinCrdVisible] = useState(false);
  const [currFishinCardIdx, setCurrFishinCardIdx] = useState(0);
  const [filteredFishinCatchCat, setFilteredFishinCatchCat] = useState(null);
  const [searchFishinText, setSearchFishinText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const inputRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const { getFishinPlanCards, saveFishinPlanCard, savedPlanners } =
    useFishinCatchContext();
  const [fishinCatchName, setFishinCatchName] = useState('');
  const [fishinCatchDate, setFishinCatchDate] = useState('');
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [fishinCatchAddress, setFishinCatchAddress] = useState('');
  const [selectedFishinCat, setSelectedFishinCat] = useState('Fishing');
  const [fishinCatchDescr, setFishinCatchDescr] = useState('');
  const [selectedFishinImage, setSelectedFishinImage] = useState('');
  const [displayedCards, setDisplayedCards] = useState([]);
  const [showFishinCalendar, setShowFishinCalendar] = useState(false);

  useEffect(() => {
    getFishinPlanCards();
  }, []);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  useEffect(() => {
    if (showLikedOnly) {
      setDisplayedCards(savedPlanners.filter(c => c.liked));
    } else {
      setDisplayedCards(savedPlanners);
    }
  }, [showLikedOnly, savedPlanners]);

  let fishinpickeroptions = {
    storageOptions: {
      path: 'image',
      maxHeight: 700,
      maxWidth: 700,
    },
  };

  const fishinCatchImagePicker = () => {
    launchImageLibrary(fishinpickeroptions, response => {
      if (response.didCancel) return;

      setSelectedFishinImage(response.assets[0].uri);
    });
  };

  useEffect(() => {
    getAddress(region.latitude, region.longitude);
  }, []);

  const getAddress = async (lat, lng) => {
    try {
      const json = await Geocoder.from(lat, lng);
      const components = json.results[0].address_components;

      const street =
        components.find(comp => comp.types.includes('route'))?.long_name || '';
      const number =
        components.find(comp => comp.types.includes('street_number'))
          ?.long_name || '';
      const city =
        components.find(comp => comp.types.includes('locality'))?.long_name ||
        '';

      const addressStr = [street, number, city].filter(Boolean).join(', ');
      setFishinCatchAddress(addressStr);
    } catch (error) {
      console.warn(error);
    }
  };

  // useEffect(() => {
  //   const showSub = Keyboard.addListener('keyboardDidShow', e => {
  //     setKeyboardVisible(true);
  //     setKeyboardHeight(e.endCoordinates.height);
  //   });

  //   const hideSub = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardVisible(false);
  //     setKeyboardHeight(250);
  //   });

  //   return () => {
  //     showSub.remove();
  //     hideSub.remove();
  //   };
  // }, []);

  const handleSaveFishinCardDta = () => {
    const newFishinCard = {
      id: Date.now().toString(),
      name: fishinCatchName,
      date: fishinCatchDate,
      addr: fishinCatchAddress,
      cat: selectedFishinCat,
      desc: fishinCatchDescr,
      img: selectedFishinImage,
      lat: region.latitude,
      lng: region.longitude,
    };

    saveFishinPlanCard(newFishinCard);
    setIsFishinCrdVisible(false);
    setCurrFishinCardIdx(0);
    setFishinCatchName('');
    setFishinCatchDate('');
    setFishinCatchAddress('');
    setSelectedFishinCat('Fishing');
    setFishinCatchDescr('');
    setSelectedFishinImage('');
  };

  useEffect(() => {
    const filtered = savedPlanners.filter(card => {
      const matchesCategory =
        !filteredFishinCatchCat || card.cat === filteredFishinCatchCat;
      const matchesSearch =
        !searchFishinText ||
        card.name.toLowerCase().includes(searchFishinText.toLowerCase());
      const matchesLiked = !showLikedOnly || card.liked;
      const matchesDate = !selectedDate || card.date === selectedDate;

      return matchesCategory && matchesSearch && matchesLiked && matchesDate;
    });

    setDisplayedCards(filtered);
  }, [
    savedPlanners,
    filteredFishinCatchCat,
    searchFishinText,
    showLikedOnly,
    selectedDate,
  ]);

  const formatDate = dateString => {
    return moment(dateString).format('DD.MM.YYYY');
  };

  return (
    <>
      {showFishinCalendar ? (
        <View
          style={{ backgroundColor: '#02062E', flex: 1, paddingBottom: 180 }}
        >
          <View style={styles.fishincatchcnt}>
            <TouchableOpacity
              onPress={() => setShowFishinCalendar(false)}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <Text style={styles.fishincatchdt}>2025</Text>
                <View>
                  <Image
                    source={require('../../../assets/images/fishincatcharrr.png')}
                  />
                </View>
              </View>

              <View>
                <Image
                  source={require('../../../assets/images/fishincatchselcal.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          <CalendarList
            nestedScrollEnabled={false}
            monthFormat="MMMM"
            showSixWeeks={true}
            hideArrows={true}
            hideExtraDays={true}
            current={moment().format('YYYY-MM-DD')}
            pastScrollRange={1}
            futureScrollRange={1}
            pagingEnabled={false}
            showScrollIndicator={false}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: '#ffffff',
              todayTextColor: '#FFC20E',
              textDisabledColor: '#dd99ee',
              arrowColor: '#fff',
              indicatorColor: '#fff',
              dayTextColor: '#fff',
              monthTextColor: '#ffffff',
              textMonthFontSize: 16,
              textMonthFontWeight: '700',
              textDayFontSize: 13,
              textDayFontWeight: '600',
            }}
            onDayPress={day => {
              const formattedDate = formatDate(day.dateString);
              setSelectedDate(formattedDate);
              setShowFishinCalendar(false);
            }}
          />
        </View>
      ) : (
        <>
          {currFishinCardIdx === 3 ? (
            <View style={{}}>
              <View style={styles.fishincatchcnthdr}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setCurrFishinCardIdx(currFishinCardIdx - 1)}
                >
                  <Image
                    source={require('../../../assets/images/fishincatchbackbt.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.fishincatchmpttl}>Put a label</Text>
              </View>

              <MapView
                style={{ width: '100%', height: '100%' }}
                customMapStyle={fishincatchmapstyle}
                provider={Platform.OS === 'ios' ? 'google' : undefined}
                region={region}
                onPress={e => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  setRegion({ ...region, latitude, longitude });
                  getAddress(latitude, longitude);
                }}
              >
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                >
                  {Platform.OS === 'ios' ? (
                    <Image
                      source={require('../../../assets/images/fishincatchmark.png')}
                    />
                  ) : null}

                  <Callout tooltip>
                    <View style={{ width: 300, alignItems: 'center' }}>
                      <Text style={styles.calloutText}>
                        {fishinCatchAddress || 'Loading...'}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              </MapView>
              <TouchableOpacity
                style={[
                  styles.fishincatchbtn,
                  {
                    position: 'absolute',
                    bottom: 140,
                    width: '90%',
                    left: '5%',
                  },
                ]}
                onPress={() => setCurrFishinCardIdx(currFishinCardIdx + 1)}
              >
                <Text style={styles.fishincatchbtntxt}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Fishincatchapplayout>
              <View style={{ flex: 1, paddingBottom: 130 }}>
                <View style={styles.fishincatchcnt}>
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity
                      onPress={() => setShowLikedOnly(!showLikedOnly)}
                    >
                      <Image
                        source={
                          showLikedOnly
                            ? require('../../../assets/images/fishincatchheadliked.png')
                            : require('../../../assets/images/fishincatchlike.png')
                        }
                      />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                      <TextInput
                        placeholder="Search"
                        style={styles.fishininpt}
                        value={searchFishinText}
                        onChangeText={setSearchFishinText}
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                      />
                      <Image
                        source={require('../../../assets/images/fishincatchsearch.png')}
                        style={styles.fishincatchserc}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => setShowFishinCalendar(true)}
                    >
                      <Image
                        source={require('../../../assets/images/fishincatchcal.png')}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 12,
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}
                  >
                    {fishincatchcat.map((cat, index) => (
                      <TouchableOpacity
                        onPress={() =>
                          setFilteredFishinCatchCat(prev =>
                            prev === cat ? null : cat,
                          )
                        }
                        key={index}
                        activeOpacity={0.6}
                        style={[
                          styles.fishincatchcatcnthd,
                          filteredFishinCatchCat === cat && {
                            backgroundColor: '#F7460B',
                          },
                        ]}
                      >
                        <Text style={{ color: '#fff' }}>{cat}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{ paddingHorizontal: 16 }}>
                  {displayedCards.length === 0 ? (
                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                      <Image
                        source={require('../../../assets/images/fishincatchfshemp.png')}
                      />
                      {savedPlanners.length === 0 ? (
                        <Text style={styles.fishincatchempttxt}>
                          There are no any plans yet
                        </Text>
                      ) : (
                        <Text style={styles.fishincatchempttxt}>
                          {`There are no results
for your search`}
                        </Text>
                      )}

                      <TouchableOpacity
                        style={styles.fishincatchaddbtn}
                        activeOpacity={0.7}
                        onPress={() => {
                          setIsFishinCrdVisible(true);
                        }}
                      >
                        <Image
                          source={require('../../../assets/images/fishincatchcadd.png')}
                        />
                        <Text style={styles.fishincatchaddbtntxt}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.fishincatchwrp}>
                      <Text style={styles.fishincatchtl}>Plans</Text>
                      <TouchableOpacity
                        style={styles.fishincatchaddbtn}
                        activeOpacity={0.7}
                        onPress={() => {
                          setIsFishinCrdVisible(true);
                        }}
                      >
                        <Image
                          source={require('../../../assets/images/fishincatchcadd.png')}
                        />
                        <Text style={styles.fishincatchaddbtntxt}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {displayedCards.map((card, idx) => (
                    <Fishincatchplannercard card={card} key={idx} />
                  ))}
                </View>

                {isFishinCrdVisible && (
                  <>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setIsFishinCrdVisible(false), Keyboard.dismiss();
                      }}
                    >
                      <View style={styles.fishincatchoverlay} />
                    </TouchableWithoutFeedback>

                    <View
                      style={[
                        styles.fishincatchcrd,
                        { bottom: keyboardHeight },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text style={styles.fishincatchcrdttl}>New card</Text>

                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => setIsFishinCrdVisible(false)}
                        >
                          <Image
                            source={require('../../../assets/images/fishincatchclose.png')}
                          />
                        </TouchableOpacity>
                      </View>

                      {currFishinCardIdx === 0 && (
                        <>
                          <Text style={styles.fishincatchcrdtxt}>Title</Text>
                          <TextInput
                            ref={inputRef}
                            placeholder="Where do like to go?"
                            value={fishinCatchName}
                            maxLength={15}
                            onChangeText={setFishinCatchName}
                            style={styles.fishincrdinpt}
                            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                          />
                          <TouchableOpacity
                            activeOpacity={0.8}
                            disabled={!fishinCatchName}
                            style={styles.fishincatchbtn}
                            onPress={() =>
                              setCurrFishinCardIdx(currFishinCardIdx + 1)
                            }
                          >
                            <Text style={styles.fishincatchbtntxt}>Next</Text>
                          </TouchableOpacity>
                        </>
                      )}

                      {currFishinCardIdx === 1 && (
                        <>
                          <Text style={styles.fishincatchcrdtxt}>Date</Text>
                          <TextInput
                            ref={inputRef}
                            placeholder="DD.MM.YYYY"
                            value={fishinCatchDate}
                            onChangeText={setFishinCatchDate}
                            style={styles.fishincrdinpt}
                            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                          />

                          <View style={styles.fishincatchwrpr}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() =>
                                setCurrFishinCardIdx(currFishinCardIdx - 1)
                              }
                            >
                              <Image
                                source={require('../../../assets/images/fishincatchbackbt.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              disabled={!fishinCatchDate}
                              onPress={() =>
                                setCurrFishinCardIdx(currFishinCardIdx + 1)
                              }
                              style={[
                                styles.fishincatchbtn,
                                { marginTop: 0, width: '82%' },
                              ]}
                            >
                              <Text style={styles.fishincatchbtntxt}>Next</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}

                      {currFishinCardIdx === 2 && (
                        <>
                          <Text style={styles.fishincatchcrdtxt}>Address</Text>

                          <View style={{ flexDirection: 'row', gap: 12 }}>
                            <View style={{ flex: 1 }}>
                              <TextInput
                                ref={inputRef}
                                placeholder="Write or tag on map"
                                value={fishinCatchAddress}
                                onChangeText={setFishinCatchAddress}
                                style={styles.fishincrdinpt}
                                placeholderTextColor={
                                  'rgba(255, 255, 255, 0.5)'
                                }
                              />
                            </View>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() =>
                                setCurrFishinCardIdx(currFishinCardIdx + 1)
                              }
                            >
                              <Image
                                source={require('../../../assets/images/fishincatchmap.png')}
                              />
                            </TouchableOpacity>
                          </View>

                          <View style={styles.fishincatchwrpr}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() =>
                                setCurrFishinCardIdx(currFishinCardIdx - 1)
                              }
                            >
                              <Image
                                source={require('../../../assets/images/fishincatchbackbt.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => setCurrFishinCardIdx(4)}
                              style={[
                                styles.fishincatchbtn,
                                { marginTop: 0, width: '82%' },
                              ]}
                            >
                              <Text style={styles.fishincatchbtntxt}>Next</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}

                      {currFishinCardIdx === 4 && (
                        <>
                          <Text style={styles.fishincatchcrdtxt}>Category</Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 12,
                              flexWrap: 'wrap',
                            }}
                          >
                            {fishincatchcat.map((cat, index) => (
                              <TouchableOpacity
                                onPress={() => setSelectedFishinCat(cat)}
                                disabled={!selectedFishinCat}
                                key={index}
                                activeOpacity={0.6}
                                style={[
                                  styles.fishincatchcatcnt,
                                  selectedFishinCat === cat && {
                                    backgroundColor: '#F7460B',
                                  },
                                ]}
                              >
                                <Text style={{ color: '#fff' }}>{cat}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>

                          <View style={styles.fishincatchwrpr}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => setCurrFishinCardIdx(2)}
                            >
                              <Image
                                source={require('../../../assets/images/fishincatchbackbt.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() =>
                                setCurrFishinCardIdx(currFishinCardIdx + 1)
                              }
                              style={[
                                styles.fishincatchbtn,
                                { marginTop: 0, width: '82%' },
                              ]}
                            >
                              <Text style={styles.fishincatchbtntxt}>Next</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}

                      {currFishinCardIdx === 5 && (
                        <>
                          <Text style={styles.fishincatchcrdtxt}>
                            Description
                          </Text>
                          <TextInput
                            ref={inputRef}
                            placeholder="Some comments"
                            value={fishinCatchDescr}
                            textAlignVertical="top"
                            onChangeText={setFishinCatchDescr}
                            multiline
                            style={[
                              styles.fishincrdinpt,
                              { height: 100, borderRadius: 24, paddingTop: 20 },
                            ]}
                            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                          />

                          <View style={styles.fishincatchwrpr}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() =>
                                setCurrFishinCardIdx(currFishinCardIdx - 1)
                              }
                            >
                              <Image
                                source={require('../../../assets/images/fishincatchbackbt.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              disabled={!fishinCatchDescr}
                              activeOpacity={0.8}
                              onPress={() =>
                                setCurrFishinCardIdx(currFishinCardIdx + 1)
                              }
                              style={[
                                styles.fishincatchbtn,
                                { marginTop: 0, width: '82%' },
                              ]}
                            >
                              <Text style={styles.fishincatchbtntxt}>Next</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}

                      {currFishinCardIdx === 6 && (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 36,
                            }}
                          >
                            <Text
                              style={[
                                styles.fishincatchcrdtxt,
                                { marginTop: 0, marginBottom: 0 },
                              ]}
                            >
                              Photo
                            </Text>

                            <TouchableOpacity
                              style={styles.fishincatchaddbtn}
                              activeOpacity={0.7}
                              onPress={() => {
                                fishinCatchImagePicker();
                              }}
                            >
                              <Image
                                source={require('../../../assets/images/fishincatchcadd.png')}
                              />
                              <Text style={styles.fishincatchaddbtntxt}>
                                Add
                              </Text>
                            </TouchableOpacity>
                          </View>

                          <View style={styles.fishincatchwrpr}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() =>
                                setCurrFishinCardIdx(currFishinCardIdx - 1)
                              }
                            >
                              <Image
                                source={require('../../../assets/images/fishincatchbackbt.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => handleSaveFishinCardDta()}
                              disabled={!selectedFishinImage}
                              style={[
                                styles.fishincatchbtn,
                                { marginTop: 0, width: '82%' },
                              ]}
                            >
                              <Text style={styles.fishincatchbtntxt}>
                                Finish
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </View>
                  </>
                )}
              </View>
            </Fishincatchapplayout>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fishincatchcnt: {
    paddingTop: height * 0.063,
    padding: 16,
    backgroundColor: '#040C57',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  fishincatchtxt: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 31,
  },
  fishincatchtl: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  fishininpt: {
    width: '100%',
    height: 44,
    backgroundColor: '#061282',
    borderRadius: 100,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingLeft: 35,
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  fishincatchserc: {
    position: 'absolute',
    top: 15,
    left: 13,
  },
  fishincatchoverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fishincatchcrd: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#040C57',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderRadius: 32,
    paddingTop: 24,
    padding: 20,
    paddingBottom: 24,
  },
  fishincatchcrdttl: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
  },
  fishincatchempttxt: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  fishincatchcrdtxt: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    marginTop: 30,
  },
  fishincrdinpt: {
    width: '100%',
    height: 52,
    backgroundColor: '#061282',
    borderRadius: 100,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
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
  fishincatchcatcnthd: {
    width: 108,
    height: 28,
    backgroundColor: '#061282',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fishincatchdt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 32,
  },
});

export default Fishincatchplan;
