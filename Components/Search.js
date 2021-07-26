// Components/Search.js

import React from 'react'
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import FilmsItem from './FilmsItem'
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = "";
        this.page = 0 // Current page counter
        this.totalPages = 0 // Counter to know if we reached the end of the number of pages returned by the API
        this.state = {
            films: [],
            isLoading: false
            };
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size = 'large'/>
                </View>
            )
        }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: this.state.films.concat(data.results), // Displays the films and concatenate films from the next page if end is reached
                    isLoading: false
                })
            })
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilms() // Set as a callback due to the asynchronicity of setState
        })
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayDetailForFilm = (idFilm) => { // ES6 syntax, important to keep it here
        console.log(`Display film with id ${idFilm}`)
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm}) // Navigates to a FilmDetail view
        // format for navigation: navigate('RouteName', { parameters })
    }

    render() {
        console.log("Search component rendering...")
        return (
         <View style={styles.mainContainer}>
             <TextInput
                style={styles.textInput}
                placeholder={"Search a film.."}
                onChangeText={(text) => this._searchTextInputChanged(text)}
                onSubmitEditing={() => this._searchFilms()}
             />
             <Button title={"Search"} onPress={ () => this._searchFilms() } />
             <FlatList
                 data={this.state.films}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({item}) => <FilmsItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
                 onEndReachedThreshold={0.5}
                 onEndReached={() => {
                     if (this.page < this.totalPages) {
                         this._loadFilms()
                     }
                 }}
             />
             {this._displayLoading()}
         </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
});

export default Search
