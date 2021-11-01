// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getFilmDetailFromApi, getImageFromAPI } from '../API/TMDBApi'
import { connect } from 'react-redux'

import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true // we want it to load when trying to go on this view
        }
    }

    // Debugging functions called automatically
    componentDidMount() {
        var idFilm = this.props.route.params.idFilm; // parameters passed during navigation from a view to another is handled with this
        getFilmDetailFromApi(idFilm)
        .then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
        console.log("Component FilmDetail mounted")
    }

    componentDidUpdate() {
        console.log("componentDidUpdate: ")
        console.log(this.props.favoritesFilm)
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

    _toggleFavorite() {
        // Redux action
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../assets/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../assets/ic_favorite.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        )
    }

    _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromAPI(film.backdrop_path)}}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}> 
                        Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
                    </Text>
                    <Text style={styles.default_text}>Note : {film.vote_average}/10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>
                        Genre(s) : {film.genres.map(
                            function(genre){
                                return genre.name;
                            }).join('/')}
                    </Text>
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

const mapStateToProps = (state) => { // For sending the state through Redux
    // Any time the store is updated, this function will be called.
    // The results will be merged into the component's props
    return {
        favoritesFilm: state.favoritesFilm
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'lightgray'
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
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

export default connect(mapStateToProps)(FilmDetail)