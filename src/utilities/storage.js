import AsyncStorage from '@react-native-async-storage/async-storage';
import { merge } from './helpers';

export const blankSettings = {
  validated: true,
};

const validateSettings = (data) => {
  try {
    const parsedData = typeof data === 'object' ? data : JSON.parse(data);

    if (!parsedData || typeof parsedData !== 'object') {
      return blankSettings;
    }
    return merge(parsedData, blankSettings);
  } catch (error) {
    return blankSettings;
  }
};

export async function persistData(key, data) {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error('Error saving data');
  }
}

export async function fetchData(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    throw new Error('Error retrieving data');
  }
}

export const getSettings = () =>
  fetchData('LiskSettings')
    .then((data) => validateSettings(data))
    .catch(() => blankSettings);

export const storeSettings = (settings) =>
  persistData('LiskSettings', settings)
    .then((data) => validateSettings(data))
    .catch(() => blankSettings);
