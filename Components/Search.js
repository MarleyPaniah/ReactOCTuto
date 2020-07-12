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
import NotesItem from './NotesItem'


class Search extends React.Component {

    render() {
        return (
         <View style={styles.mainContainer}>
             <TextInput style={styles.textInput} placeholder={"Search a note..."}/>
             <Button title={"Rechercher"} onPress={ () => {} }/>
             <FlatList
                 data={notes}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({item}) => <NotesItem note={item}/>}
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