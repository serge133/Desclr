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

  /**
   * TODO: [ ] Make timer work even when user exits the app (TEST THIS)
   *     - Instead of "00:23:19" format use "23 Minutes".
   *       This can prevent a lot of renders happening in the app
   *       This can also be stored as an absolute value so that user can exit the app
   *       Basically a function just updates every 30 seconds:
   *        * This date stays the same because it in state
   *        const [timer, setTime] = useState(new Date().getTime() * 1000 * 60 + milliseconds);
   *        useEffect(() => {
   *          * every 30 seconds
   *          * This date updates every 30 seconds because not in state
   *          const interval = useInterval(() => {
   *              setTimer(new Date().getTime() * 1000 * 60 + milliseconds)
   *           }, 1000 * 30);
   *          return () => clearInterval(interval);
   *        });
   *        new Date().getTime() * 1000 * 60 - timer + new Date().getTime() * 1000 * 60
   * TODO: [ ] Optimize the timer
   * TODO: [ ] Commit changes
   */

  return (
    <Provider store={store}>
      <DesclrNavigator />
    </Provider>
  );
};

export default App;
