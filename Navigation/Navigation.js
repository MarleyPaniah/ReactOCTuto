// Navigation/Navigation.js

import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator()

class Navigation extends React.Component {
    render() {
        console.log("Navigation rendering...")
        return (
            <NavigationContainer>
                <SearchStackNavigator.Navigator>
                    <SearchStackNavigator.Screen name="SearchFilm" component={Search} />
                    <SearchStackNavigator.Screen name="FilmDetail" component={FilmDetail} />
                </SearchStackNavigator.Navigator>
            </NavigationContainer>
        )

    }
}



export default Navigation