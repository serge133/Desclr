import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import Header from '../../components/Header';
import { DrawerActions, DrawerActionType } from '@react-navigation/native';
import Habit from '../../components/Habit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { getHabits, archiveHabit } from '../../store/actions/habit';
import { getHoursTillExpire } from '../../functions/date';
import * as Text from '../../components/Text';
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
  const [refresh, setRefresh] = useState(false);
  const authExpirationDate = useSelector(
    (state: RootState) => state.auth.expirationDate
  );
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
  if (!isUserValid(authExpirationDate)) {
    dispatch(logout());
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getHabits());
    }, 1000);
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
        <FlatList
          style={styles.habitList}
          data={activeHabits}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
                id={itemData.item.id}
                value={itemData.item.value}
                description={itemData.item.description}
                streak={itemData.item.streak}
                interval={itemData.item.interval}
                expirationDate={itemData.item.expirationDate}
                todos={itemData.item.todos}
                deletionBarProgress={deletionBarProgress}
                onEdit={() =>
                  props.navigation.navigate('EditingHabitScreen', {
                    habit: {
                      id: itemData.item.id,
                      value: itemData.item.value,
                      description: itemData.item.description,
                      interval: itemData.item.interval,
                      todos: itemData.item.todos,
                    },
                  })
                }
                isActive
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
  habitListContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  habitList: {
    width: '100%',
    // borderWidth: 1,
  },
});

export default HomeScreen;
