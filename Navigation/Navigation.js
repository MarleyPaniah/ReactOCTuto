// Navigation/Navigation.js

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import Search from '../Components/Search'

const SearchStackNavigator = createStackNavigator()

class Navigation extends React.Component {
    render() {
        console.log("Navigation rendring...")
        return (
            <NavigationContainer>
                <SearchStackNavigator.Navigator>
                    <SearchStackNavigator.Screen name="Rechercher" component={Search} />
                </SearchStackNavigator.Navigator>
            </NavigationContainer>
        )

    }
}



export default Navigation