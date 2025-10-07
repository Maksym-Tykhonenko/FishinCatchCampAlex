import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useFishinCatchContext = () => {
  return useContext(StoreContext);
};

export const FishinCatchCntxProvider = ({ children }) => {
  const [savedPlanners, setSavedPlanners] = useState([]);
  const [fishinCatchPrfDta, setFishinCatchPrfDta] = useState(null);

  const saveFishinPlanCard = async (data, edit) => {
    try {
      const storedFishinCrd = await AsyncStorage.getItem('fishincatchplanners');
      let notes = storedFishinCrd !== null ? JSON.parse(storedFishinCrd) : [];

      let updatedNotes;

      if (edit?.id) {
        updatedNotes = notes.map(log => (log.id === edit.id ? data : log));
      } else {
        updatedNotes = [...notes, data];
      }

      await AsyncStorage.setItem(
        'fishincatchplanners',
        JSON.stringify(updatedNotes),
      );

      setSavedPlanners(updatedNotes);
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getFishinPlanCards = async () => {
    try {
      const savedData = await AsyncStorage.getItem('fishincatchplanners');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedPlanners(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFishinPlanCard = async selectedPlace => {
    const jsonValue = await AsyncStorage.getItem('fishincatchplanners');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedPlace.id);

    setSavedPlanners(filtered);
    await AsyncStorage.setItem('fishincatchplanners', JSON.stringify(filtered));
  };

  const fishincatchcntxvalue = {
    deleteFishinPlanCard,
    getFishinPlanCards,
    saveFishinPlanCard,
    savedPlanners,
    setFishinCatchPrfDta,
    fishinCatchPrfDta,
  };

  return (
    <StoreContext.Provider value={fishincatchcntxvalue}>
      {children}
    </StoreContext.Provider>
  );
};
