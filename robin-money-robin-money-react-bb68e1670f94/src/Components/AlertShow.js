import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal'

import popup_bg from '../Asserts/popup_bg.svg';

const greenColor = "#48DC9F"

class AlertShow extends Component {

    render() {

        return (

            <Modal isVisible={this.props.showAlert} style={{ flex: 1, alignItems: 'center' }}>

                <View style={{ height: 200, width: '60%', backgroundColor: '#fff', borderRadius: 10 }}>

                    <Image style={{ width: '100%', height: 100, resizeMode: 'contain' }} source={popup_bg} />

                    <Text style={styles.stringText}>{this.props.alertString}</Text>

                    <TouchableOpacity onPress={this.props.okClick} style={{ marginBottom: 30 }}>
                        <View style={{ width: '80%', marginTop: 20, backgroundColor: greenColor, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Ok</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </Modal>

        )
    }

}

const styles = StyleSheet.create({

    stringText: {
        color: "#000",
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 15
    },

});

export default AlertShow;