import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import { DrawerActions, DrawerActionType } from '@react-navigation/native';
import Habit, { HabitHiddenRowButtons } from '../../components/Habit';
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
import { Colors } from '../../constants/default-styles';
import RenderIcon from '../../components/RenderIcon';

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
  if (!isUserValid(authExpirationDate)) {
    dispatch(logout());
  }

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
                // completedTodosButtons={[
                //   {
                //     name: 'Quick Complete',
                //     type: 'colorful',
                //     onPress: () =>
                //       dispatch(
                //         completeHabit(
                //           itemData.item.id,
                //           itemData.item.streak,
                //           itemData.item.interval,
                //           itemData.item.todos
                //         )
                //       ),
                //     icon: {
                //       type: 'Ionicons',
                //       name: 'ios-checkmark',
                //       size: 30,
                //     },
                //   },
                //   {
                //     name: 'Journal Complete',
                //     onPress: () => {},
                //     icon: { type: 'AntDesign', name: 'arrowright', size: 16 },
                //   },
                // ]}
              />
            );
          }}
          //! Make this a seperate component
          renderHiddenItem={(itemData, rowMap) => (
            <HabitHiddenRowButtons
              canComplete={itemData.item.todos.every(todo => todo.completed)}
              onComplete={() =>
                dispatch(
                  completeHabit(
                    itemData.item.id,
                    itemData.item.streak,
                    itemData.item.interval,
                    itemData.item.todos
                  )
                )
              }
            />
          )}
          // <View style={styles.rowBack}>
          //   <TouchableOpacity style={styles.rowBackButtonContainer}>
          //     <View style={styles.rowBackButton}>
          //       <RenderIcon
          //         type='Ionicons'
          //         name='ios-checkmark'
          //         size={50}
          //         color='white'
          //       />
          //     </View>
          //   </TouchableOpacity>
          //   <View style={styles.rowBackButtonContainer}>
          //     <View style={styles.rowBackButton}>
          //       <Text>Right</Text>
          //     </View>
          //   </View>
          // </View>}
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
  // rowBack: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: '5%',
  //   flex: 1,
  // },
  // rowBackButtonContainer: {
  //   height: '100%',
  //   width: 90,
  //   paddingBottom: 24,
  // },
  // rowBackButton: {
  //   flex: 1,
  //   borderRadius: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: Colors.primary1,
  // },
  // rowBackRight: {},
  // rowBackLeft: {},
});

export default HomeScreen;
