import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import Header from '../../components/UI/Header';
import { DrawerActions, DrawerActionType } from '@react-navigation/native';
import Habit from '../../components/Core/Habit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import * as Text from '../../components/UI/Text';

import { getHabits, archiveHabit } from '../../store/actions/habit';
import { getHoursTillExpire } from '../../functions/date';
import { isUserValid } from '../../store/utility';
import { logout } from '../../store/actions/auth';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
    isFocused: () => boolean;
    navigate: (screen: string, params?: {}) => void;
  };
}

const HomeScreen: React.FC<Props> = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [_refresh, setRefresh] = useState(false);
  // const authExpirationDate = useSelector(
  //   (state: RootState) => state.auth.expirationDate
  // );
  const habits = useSelector((state: RootState) => state.habit.habits);
  const activeHabits = habits.filter((habit) => habit.isActive);
  const dispatch = useDispatch();

  // Refresh every minute for the update of get hours until expire progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prev) => !prev);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Refresh every minute will cause automatic logout when token expires
  // if (!isUserValid(authExpirationDate)) dispatch(logout());

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getHabits());
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    dispatch(getHabits());
  }, [dispatch]);

  /**
   * const hoursTillExpire = getHoursTillExpire(
              itemData.item.expirationDate
            );
            const deletionBarProgress =
              (1 - hoursTillExpire / (itemData.item.interval * 24)) * 100;

            if (hoursTillExpire <= 0) {
              dispatch(archiveHabit(itemData.item.id));
            }
   */
  return (
    <View style={styles.screen}>
      <Header
        headerLeft={{
          type: 'Ionicons',
          name: 'ios-menu',
          onPress: () =>
            props.navigation.dispatch(DrawerActions.toggleDrawer()),
        }}
        headerRight={{
          type: 'Ionicons',
          name: 'ios-add-circle-outline',
          onPress: () => props.navigation.navigate('AddingScreen'),
        }}
      >
        Desclr
      </Header>
      {activeHabits.length === 0 && (
        <View style={styles.noHabitsTextContainer}>
          <Text.Body2 style={styles.noHabitsText}>
            All your data is gone because Desclr just went through a massive
            update. Sorry for the inconvenience.
          </Text.Body2>
        </View>
      )}
      <View style={styles.habitListContainer}>
        <FlatList
          style={styles.habitList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={activeHabits}
          renderItem={(itemData) => {
            const hoursTillExpire = getHoursTillExpire(
              itemData.item.expirationDate
            );
            const deletionBarProgress =
              (1 - hoursTillExpire / (itemData.item.interval * 24)) * 100;

            if (hoursTillExpire <= 0) {
              dispatch(archiveHabit(itemData.item.id));
            }
            return (
              <Habit
                deletionBarProgress={deletionBarProgress}
                onEdit={() =>
                  props.navigation.navigate('EditingHabitScreen', {
                    habit: {
                      id: itemData.item.id,
                      value: itemData.item.value,
                      type: itemData.item.type,
                      description: itemData.item.description,
                      timer: itemData.item.timer,
                      targetTime: itemData.item.targetTime,
                      interval: itemData.item.interval,
                      todos: itemData.item.todos,
                      checklist: itemData.item.checklist,
                    },
                  })
                }
                onPress={() =>
                  props.navigation.navigate('ViewHabitScreen', {
                    habitId: itemData.item.id,
                  })
                }
                {...itemData.item}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  noHabitsTextContainer: {
    marginTop: 30,
    width: '90%',
  },
  noHabitsText: {
    textAlign: 'center',
  },
  habitListContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginTop: 12,
  },
  habitList: {
    width: '100%',
  },
});

export default HomeScreen;
