import { ScrollView, View } from 'react-native';

const Fishincatchapplayout = ({ children }) => {
  return (
    <View style={{ backgroundColor: '#02062E', flex: 1 }}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default Fishincatchapplayout;
