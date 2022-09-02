import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostsList from './src/screens/PostsList';
import ViewPostDetails from './src/screens/ViewPostDetails';

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="PostList"
        screenOptions={{headerShown: false}}>
        {/* Si pas d'initialRouteName par défaut ça prend le premier screen défini */}
        <RootStack.Screen name="PostList" component={PostsList} />
        <RootStack.Screen
          options={{headerShown: true}}
          name="Details"
          component={ViewPostDetails}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
