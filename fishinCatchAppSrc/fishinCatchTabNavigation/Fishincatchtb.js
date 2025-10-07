import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text } from 'react-native';
import Fishincatchplan from '../fishinCatchScreens/fishinCatchTabScreens/Fishincatchplan';
import Fishincatchgd from '../fishinCatchScreens/fishinCatchTabScreens/Fishincatchgd';
import Fishincatchadv from '../fishinCatchScreens/fishinCatchTabScreens/Fishincatchadv';
import Fishincatchsett from '../fishinCatchScreens/fishinCatchTabScreens/Fishincatchsett';

const FishincatchTabNav = createBottomTabNavigator();

const Fishincatchtb = () => {
  return (
    <FishincatchTabNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.fishinttb,
        tabBarActiveTintColor: '#FDB905',
        tabBarLabelPosition: 'beside-icon',
      }}
    >
      <FishincatchTabNav.Screen
        name="Planner"
        component={Fishincatchplan}
        tabBarShowLabel
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/fishinapln.png')}
              tintColor={color}
            />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text
                style={{
                  color,
                  marginLeft: 8,
                  fontWeight: '600',
                  fontSize: 12,
                }}
              >
                Planner
              </Text>
            ) : null,
        }}
      />
      <FishincatchTabNav.Screen
        name="Guides"
        component={Fishincatchgd}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/fishinagd.png')}
              tintColor={color}
            />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text
                style={{
                  color,
                  marginLeft: 8,
                  fontWeight: '600',
                  fontSize: 12,
                }}
              >
                Guides
              </Text>
            ) : null,
        }}
      />
      <FishincatchTabNav.Screen
        name="Advices"
        component={Fishincatchadv}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/fishinadv.png')}
              tintColor={color}
            />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text
                style={{
                  color,
                  marginLeft: 8,
                  fontWeight: '600',
                  fontSize: 12,
                }}
              >
                Advices
              </Text>
            ) : null,
        }}
      />
      <FishincatchTabNav.Screen
        name="Settings"
        component={Fishincatchsett}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/fishinsett.png')}
              tintColor={color}
            />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text
                style={{
                  color,
                  marginLeft: 8,
                  fontWeight: '600',
                  fontSize: 12,
                }}
              >
                Settings
              </Text>
            ) : null,
        }}
      />
    </FishincatchTabNav.Navigator>
  );
};

const styles = StyleSheet.create({
  fishinttb: {
    elevation: 0,
    backgroundColor: '#040C57',
    paddingTop: 26,
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 24,
    borderTopWidth: 0,
    height: 118,
  },
});

export default Fishincatchtb;
