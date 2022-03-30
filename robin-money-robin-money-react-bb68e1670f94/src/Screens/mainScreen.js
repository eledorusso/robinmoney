import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    StatusBar,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ImageBackground,
    ScrollView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { domain } from '../Utilities/api'
import Modal from 'react-native-modal'

const greenColor = "#48DC9F"

export default class mainScreen extends Component {

    constructor() {
        super()
    }

    state = {
        isLoading: false,
    }

    render() {

        return (

            <SafeAreaView style={styles.container}>

                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content" />

                <Modal isVisible={this.state.isLoading}>
                    <ActivityIndicator animating={this.state.isLoading} size="large" color={greenColor} />
                </Modal>

                <View style={styles.container}>

                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#000',
                        textAlign: "center",
                        marginTop: 20
                    }}>Main Screen</Text>

                </View>

            </SafeAreaView>

        )


    }


}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1
    },

});