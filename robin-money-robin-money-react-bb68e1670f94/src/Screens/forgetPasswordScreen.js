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
    ImageBackground
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Modal from 'react-native-modal'
import { domain } from '../Utilities/api'

import forgetPasswordBG from '../Asserts/forgot_password_bg.svg';
import popup_bg from '../Asserts/popup_bg.svg';

const greenColor = "#48DC9F"
const grayColor = 'gray'

export default class forgetPasswordScreen extends Component {

    constructor() {
        super()
    }


    state = {
        email: '',
        isLoading: false,
        sentPopup: false,
        showAlert: false,
        alertText: '',
    }


    rememberPasswordAction = async () => {
        if (this.state.rememberPasswordColor == greenColor) await this.setState({ rememberPasswordColor: grayColor })
        else await this.setState({ rememberPasswordColor: greenColor })
    }


    hideAlert = async () => {
        await this.setState({ showAlert: false })
    }



    sendAction = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(this.state.email) === false) {

            await this.setState({ alertText: 'Please enter your email.', showAlert: true })
            return false;

        } else {


            this.setState({ isLoading: true });
            const url = domain + '/api/Robin_Money/forgot_password.php';

            const apiBody = {
                "email": this.state.email,
            }


            fetch(url, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },

                // body: data,
                body: JSON.stringify(apiBody),

            })
                .then((response) => response.text())
                .then(async (responseText) => {

                    let responseData = JSON.parse(responseText);

                    console.log(responseData, "scnz  qqaa");
                    if (responseData.code == 200) {

                        await this.setState({ sentPopup: true })

                    } else {
                        await this.setState({ alertText: responseData.message, showAlert: true })
                    }
                    this.setState({ isLoading: false });
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    console.log(error, 'error from APi');
                });

            // hit api




        }
    }

    okClick = async () => {
        await this.setState({ sentPopup: false })
        Navigation.pop(this.props.componentId);
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



                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>


                    <Image style={{ width: '100%', height: 200, }} source={forgetPasswordBG} />

                    <View style={styles.contentContainer}>

                        <Text style={styles.actionText}>Forgot your Password?</Text>

                        <Text style={styles.stringText}>Leave us your e - mail</Text>
                        <Text style={styles.stringText}>to receive a new one.</Text>


                        {/* <TextInput style={styles.inputField}
                            selectionColor={'green'}
                            placeholder="e - mail"
                            placeholderTextColor="#8E9494"
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={(pass) => { this.setState({ email: pass.trim() }) }} /> */}

                        <TextInput style={styles.inputField}
                            placeholder="e - mail"
                            selectionColor={'green'}
                            placeholderTextColor="#8E9494"
                            onChangeText={(pass) => { this.setState({ email: pass.trim() }) }} />

                        <TouchableOpacity onPress={this.sendAction} style={{ marginBottom: 30, marginHorizontal: 5, marginTop: 5 }}>
                            <View style={{ marginTop: 10, backgroundColor: greenColor, height: 55, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 19, fontWeight: '700' }}>Send</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </KeyboardAwareScrollView>


                <Modal isVisible={this.state.sentPopup} style={{ alignItems: 'center' }}>

                    <View style={{ height: 200, width: '60%', backgroundColor: '#fff', borderRadius: 10 }}>

                        <Image style={{ width: '100%', height: 100 }} source={popup_bg} />

                        <Text style={styles.stringText}>e-mail sent</Text>

                        <TouchableOpacity onPress={this.okClick} style={{ marginBottom: 30 }}>
                            <View style={{ width: '80%', marginTop: 20, backgroundColor: greenColor, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Ok</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </Modal>


                <Modal isVisible={this.state.showAlert} style={{ alignItems: 'center' }}>

                    <View style={{ height: 220, width: '60%', backgroundColor: '#fff', borderRadius: 10 }}>

                        <Image style={{ width: '100%', height: 100 }} source={popup_bg} />

                        <Text style={styles.stringText}>{this.state.alertText}</Text>

                        <TouchableOpacity onPress={this.hideAlert} style={{ marginBottom: 40 }}>
                            <View style={{ width: '80%', marginTop: 20, backgroundColor: greenColor, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Ok</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </Modal>

            </SafeAreaView>

        )


    }


}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    inputField: {
        height: 55,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: greenColor,
        paddingLeft: 10,
        fontSize: 16,
        color: '#000'
    },
    contentContainer: {
        marginHorizontal: 20,
    },
    rememberPasswordContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginTop: 5
    },
    rememberPasswordText: {
        fontSize: 16,
        paddingLeft: 10
    },
    socialContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    socailIcon: {
        width: 40,
        height: 40
    },
    stringText: {
        color: "#000",
        fontWeight: '300',
        textAlign: 'center',
        fontSize: 15
    },
    actionText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
        textAlign: "center",
        marginBottom: 10,
    }

});