import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import Header from '../../components/UI/Header';
import { DrawerActions, DrawerActionType } from '@react-navigation/native';
import Habit, { HabitHiddenRowButtons } from '../../components/Core/Habit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import {
  getHabits,
  archiveHabit,
  completeHabit,
} from '../../store/actions/habit';
import { getHoursTillExpire } from '../../functions/date';
import { isUserValid } from '../../store/utility';
import { logout } from '../../store/actions/auth';
import { SwipeListView } from 'react-native-swipe-list-view';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
    isFocused: () => boolean;
    navigate: (screen: string, params?: {}) => void;
  };
}

const HomeScreen: React.FC<Props> = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const authExpirationDate = useSelector(
    (state: RootState) => state.auth.expirationDate
  );
  const habits = useSelector((state: RootState) => state.habit.habits);
  const activeHabits = habits.filter(habit => habit.isActive);
  const dispatch = useDispatch();

  // Refresh every minute for the update of get hours until expire progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(prev => !prev);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Refresh every minute will cause automatic logout when token expires
  if (!isUserValid(authExpirationDate)) dispatch(logout());

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getHabits());
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    dispatch(getHabits());
  }, [dispatch]);

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
          onPress: () => props.navigation.navigate('AddingHabitScreen'),
        }}
      >
        Desclr
      </Header>
      <View style={styles.habitListContainer}>
        <SwipeListView
          style={styles.habitList}
          data={activeHabits}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={itemData => {
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
                      requireTimer:
                        itemData.item.completeType === 'Timer' ? true : false,
                      minutes: itemData.item.minutes,
                      interval: itemData.item.interval,
                      todos: itemData.item.todos,
                    },
                  })
                }
                {...itemData.item}
              />
            );
          }}
          renderHiddenItem={(itemData, rowMap) => (
            <HabitHiddenRowButtons
              canComplete={itemData.item.todos.every(todo => todo.completed)}
              fractionCompleted={`${
                itemData.item.todos.filter(todo => todo.completed).length
              }/${itemData.item.todos.length}`}
              onComplete={() => dispatch(completeHabit(itemData.item.id))}
              onArchive={() => dispatch(archiveHabit(itemData.item.id))}
              completeType={itemData.item.completeType}
              activateTimer={() =>
                props.navigation.navigate('TimerScreen', {
                  milliseconds: itemData.item.minutesLeft * 60 * 1000,
                  habitId: itemData.item.id,
                })
              }
            />
          )}
          rightOpenValue={-100}
          leftOpenValue={100}
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
