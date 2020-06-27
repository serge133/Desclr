// * All these use Date().toLocaleString();

export const getHoursTillExpire = (expirationDate: string): number => {
  return Math.round(
    (new Date(expirationDate).getTime() - new Date().getTime()) / 3600000
  );
};

export const getMinutesTillExpire = (expirationDate: string): number => {
  return Math.round(
    (new Date(expirationDate).getTime() - new Date().getTime()) / 60000
  );
};

export const addDaysToTodaysDate = (days: number): string => {
  const daysToMilliseconds = days * 86400000;

  return new Date(new Date().getTime() + daysToMilliseconds).toLocaleString();
};
