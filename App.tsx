import React from 'react';
import 'react-native-gesture-handler';
import DesclrNavigator from './Navigation/DesclrNavigator';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import rootReducer from './store/index';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    montserrat: require('./assets/Montserrat/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/Montserrat/Montserrat-Bold.ttf'),
    'montserrat-light': require('./assets/Montserrat/Montserrat-Light.ttf'),
  });

  if (!fontsLoaded) return <AppLoading />;

  const store = createStore(rootReducer, applyMiddleware(Thunk));

  /** Stuff to add in this release
   * !:    [x] Code Optimizations (Optimized?)
   * TODO: [ ] Design improvement to habits (Button Layout)
   * TODO: [ ] Habit types do something (e.g. iconofgraphy,color)
   * TODO: [ ] A streak is clickable
   */

  return (
    <Provider store={store}>
      <DesclrNavigator />
    </Provider>
  );
};

export default App;
