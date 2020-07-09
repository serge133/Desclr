import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import Header from '../components/Header';
import { DrawerActions, DrawerActionType } from '@react-navigation/native';
import Habit, { ArchivedHabitHiddenRowButtons } from '../components/Habit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';
import { getHabits, repostHabit, deleteHabit } from '../store/actions/habit';
import * as Text from '../components/Text';
import { SwipeListView } from 'react-native-swipe-list-view';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
    isFocused: () => boolean;
    navigate: (screen: string) => void;
  };
}

const HomeScreen: React.FC<Props> = props => {
  const [refreshing, setRefreshing] = useState(false);
  const habits = useSelector((state: RootState) => state.habit.habits);
  const inactiveHabits = habits.filter(habit => !habit.isActive);
  const dispatch = useDispatch();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // setTimeout(() => {
    //   dispatch(getHabits());
    // }, 1000);
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
      >
        Archive
      </Header>
      <View style={styles.habitListContainer}>
        {inactiveHabits.length === 0 && (
          <View>
            <Text.Body2>
              Habits that you did not complete consistently will appear here
            </Text.Body2>
          </View>
        )}
        <SwipeListView
          style={styles.habitList}
          data={inactiveHabits}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={itemData => (
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
              // inactiveHabitButtons={[
              //   {
              //     name: 'Repost',
              //     type: 'colorful',
              //     onPress: () =>
              //       dispatch(
              //         repostHabit(itemData.item.id, itemData.item.interval)
              //       ),
              //     icon: {
              //       type: 'EvilIcons',
              //       name: 'refresh',
              //       size: 30,
              //     },
              //   },
              //   {
              //     name: 'Delete',
              //     onPress: () => dispatch(deleteHabit(itemData.item.id)),
              //     icon: {
              //       type: 'AntDesign',
              //       name: 'delete',
              //       size: 30,
              //     },
              //   },
              // ]}
            />
          )}
          renderHiddenItem={(itemData, rowMap) => (
            <ArchivedHabitHiddenRowButtons
              onRepost={() =>
                dispatch(repostHabit(itemData.item.id, itemData.item.interval))
              }
              onDelete={() => dispatch(deleteHabit(itemData.item.id))}
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
    // borderWidth: 1,
  },
  // noHabitsDialog: {
  //   width: '70%',
  // },
  // noHabitsDialogText: {
  //   textAlign: 'center',
  // },
});

export default HomeScreen;
