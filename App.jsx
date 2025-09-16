import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}
