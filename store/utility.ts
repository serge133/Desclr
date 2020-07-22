import { getMinutesTillExpire } from '../functions/date';
import { AsyncStorage } from 'react-native';

export const isUserValid = (authExpiryDate: string): boolean => {
  if (getMinutesTillExpire(authExpiryDate) <= 0) {
    return false;
  }
  return true;
};

export const saveCredentialsToStorage = (
  token: string,
  userId: string,
  expirationDate: string
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate,
    })
  );
};
