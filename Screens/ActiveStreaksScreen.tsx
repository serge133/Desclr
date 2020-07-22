import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import Header from '../components/UI/Header';
import { DrawerActions, DrawerActionType } from '@react-navigation/native';
import Streak from '../components/Core/Streak';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';
import { getHabits } from '../store/actions/habit';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
  };
}

const ActiveStreaksScreen: React.FC<Props> = props => {
  const [sort, setSort] = useState('descending');
  const [refreshing, setRefreshing] = useState(false);
  const habits = useSelector((state: RootState) => state.habit.habits);
  const filteredHabits = habits.filter(habit => habit.isActive);

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

  const toggleSort = () => {
    if (sort === 'ascending') {
      setSort('descending');
    } else {
      setSort('ascending');
    }
  };

  // Sorts array descending or ascending
  if (sort === 'ascending') {
    filteredHabits.sort((a, b) => a.streak - b.streak);
  } else {
    filteredHabits.sort((a, b) => b.streak - a.streak);
  }

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
          type: 'FontAwesome',
          name: 'sort',
          onPress: toggleSort,
        }}
      >
        Streaks
      </Header>
      <View style={styles.content}>
        <FlatList
          data={filteredHabits}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={itemData => (
            <Streak
              type='active'
              value={itemData.item.value}
              streak={itemData.item.streak}
              onPress={() => {}}
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
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
});

export default ActiveStreaksScreen;
