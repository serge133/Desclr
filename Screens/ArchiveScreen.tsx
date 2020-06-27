import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import Header from '../components/Header';
import { DrawerActions, DrawerActionType } from '@react-navigation/native';
import Habit from '../components/Habit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';
import { getHabits } from '../store/actions/habit';
import * as Text from '../components/Text';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
    isFocused: () => boolean;
    navigate: (screen: string) => void;
  };
}

const HomeScreen: React.FC<Props> = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const habits = useSelector((state: RootState) => state.habit.habits);
  const inactiveHabits = habits.filter((habit) => !habit.isActive);
  const dispatch = useDispatch();

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
      >
        Archive
      </Header>
      <View style={styles.habitListContainer}>
        {inactiveHabits.length === 0 && (
          <View style={styles.noHabitsDialog}>
            <Text.Body2 style={styles.noHabitsDialogText}>
              Habits that you did not complete consistently will appear here
            </Text.Body2>
          </View>
        )}
        <FlatList
          style={styles.habitList}
          data={inactiveHabits}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={(itemData) => (
            <Habit
              id={itemData.item.id}
              value={itemData.item.value}
              description={itemData.item.description}
              streak={itemData.item.streak}
              interval={itemData.item.interval}
              expirationDate={itemData.item.expirationDate}
              todos={itemData.item.todos}
              deletionBarProgress={100}
              onEdit={() => {}}
              isActive={false}
            />
          )}
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
  noHabitsDialog: {
    width: '70%',
  },
  noHabitsDialogText: {
    textAlign: 'center',
  },
});

export default HomeScreen;
