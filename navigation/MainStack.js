import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DescriptionApp from '../screens/DescriptionApp'
import Home from '../screens/Home'
import Details from '../screens/Details'
import Form from '../screens/Form'
import About from '../screens/About'

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name='DescriptionApp'
                    component={DescriptionApp}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='Details'
                    component={Details}
                />
                <Stack.Screen
                    name='Form'
                    component={Form}
                />
                <Stack.Screen
                    name='About'
                    component={About}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack
