// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getFilmDetailFromApi } from '../API/TMDBApi'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true // we want it to load when trying to go on this view
        }
    }

    componentDidMount() {
        idFilm = this.props.route.params.idFilm; // parameters passed during navigation from a view to another is handled with this
        getFilmDetailFromApi(idFilm)
        .then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
        console.log("Component FilmDetail mounted")
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _displayFilm() {
        if (this.state.film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Text>{this.state.film.title}</Text>
                </ScrollView>
            )
        }
    }

    render() {
        //console.log("PROPS", this.props)
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    }
})

export default FilmDetail