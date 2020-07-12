// Components/NotesItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class NotesItem extends React.Component {
    render() {
        console.log(this.props);
        const note = this.props.note;
        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{uri: "../assets/icon.png"}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{note.title}</Text>
                    </View>
                    <View stle={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{note.text}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>modifié le {note.date}</Text>
                    </View>
                </View>
            </View>

        )

    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }

}
);

export default NotesItem