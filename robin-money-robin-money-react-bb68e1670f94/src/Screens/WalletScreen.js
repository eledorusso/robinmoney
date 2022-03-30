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
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Picker
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { domain } from '../Utilities/api'
import Modal from 'react-native-modal'
import { any } from 'react-native/Libraries/Text/TextNativeComponent';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

const greenColor = "#48DC9F"

export default class WalletScreen extends Component {

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
                    <View style={styles.head}>
                      <Text style={styles.titulo} adjustsFontSizeToFit={true} >Billetera</Text>
                        <Image source={require('../Asserts/wallet_icon.svg')} style={styles.wallet}/>
                    </View>
                    <Text style={styles.subTitulo}>Necesitas un mínimo de 2.000 fichas para retirar tu dinero.</Text>
                        <View style={styles.datosContainer}>
                            <TextInput style={styles.datos} placeholder='Nombre' placeholderTextColor='#454F50' />
                            <TextInput 
                            style={styles.datos} 
                            placeholder='RUT' 
                            placeholderTextColor='#454F50'
                            keyboardType='numeric' />
                            <TextInput style={styles.datos} placeholder='Correo electrónico' placeholderTextColor='#454F50' />
                            <Picker>
                                <Picker.Item label='santander' value='' />
                                <Picker.Item label='estado' value='' />
                                <Picker.Item label='chile' value='' />
                            </Picker>
                            <TextInput style={styles.datos} placeholder='Banco' placeholderTextColor='#454F50' />
                            <TextInput style={styles.datos} placeholder='Tipo de Cuenta' placeholderTextColor='#454F50' />
                            <TextInput 
                            style={styles.datos} 
                            placeholder='Nº de cuenta' 
                            placeholderTextColor='#454F50'
                            keyboardType='numeric' />

                        </View>
                    <Image source={require('../Asserts/retirar_dinero.svg')} style={styles.retirarDinero}/>
                    </View>


            </SafeAreaView>

        )


    }


}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
    },

    head: {
        marginTop: '8.3%',
        marginHorizontal: '33.33%',
        flexDirection: 'row',
        height: '4.39%',
},

    titulo: {
        fontWeight: '700',
        fontSize: width * 0.0586,
        color: '#000',
    },

    wallet: {
        width: '24%',
        height: '88.88%',
        resizeMode: 'contain',
        marginLeft: '1.6%'
    },

    main: {
        alignItems: 'center',
    },

    subTitulo: {
        fontSize: width * 0.0288 ,
        fontWeight: '200',
        color: '#454F50',
        marginTop: '4.39%',
        alignSelf: 'center'
    },

    datosContainer: {
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '88%',
        height: '59.44%',
        marginTop: '1.79%',
    },

    datos: {
        borderWidth: 1,
        borderColor: '#3EDD9D',
        color: '#777',
        borderRadius: 5,
        height: '15.06%',
        fontSize: width * 0.0426,
        fontWeight: '200',
        paddingLeft: '4.24%',
    },

    retirarDinero: {
        marginTop: '4.88%',
        alignSelf: 'center'
    }

});