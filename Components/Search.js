// Components/Search.js

import React from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    FlatList,
} from 'react-native'
import notes from '../Helpers/notesData'
import FilmsItem from './FilmsItem'
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            };

        this.searchedText = "";
    }



    _loadFilms() {
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => this.setState({films: data.results}))
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render() {
        console.log("RENDER")
        return (
         <View style={styles.mainContainer}>
             <TextInput onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textInput} placeholder={"Search a film..."}/>
             <Button title={"Rechercher"} onPress={ () => this._loadFilms() } />
             <FlatList
                 data={this.state.films}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({item}) => <FilmsItem film={item}/>}
             />
         </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 30,
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    }
});

export default Search
