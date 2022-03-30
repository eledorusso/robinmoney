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
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage';

import signupBG from '../Asserts/signup_screen.svg';
import tickIcon from '../Asserts/tick_icon.svg';
import popup_bg from '../Asserts/popup_bg.svg';

const greenColor = "#48DC9F"
const grayColor = 'gray'

let passwordArray = [];
export default class SignupScreen extends Component {

    constructor() {
        super()
    }

    //// hint added
    state = {
        fullname: '',
        email: '',
        password: '',
        repeatPassword: '',
        isLoading: false,
        rememberPasswordColor: greenColor,
        showAlert: false,
        alertText: '',
        signUpCredentials: {
            "full_name": "",
            "email": "",
            "password": "",
            "confirm_password": ""
        },
    }

    async componentDidMount() {
        let yohoo = await AsyncStorage.getItem('data');
        if (yohoo != null) {
            passwordArray = JSON.parse(yohoo);
        }
        console.log(passwordArray, 'async data');
    }


    rememberPasswordAction = async () => {
        if (this.state.rememberPasswordColor == greenColor) await this.setState({ rememberPasswordColor: grayColor })
        else await this.setState({ rememberPasswordColor: greenColor })
    }

    hideAlert = async () => {
        await this.setState({ showAlert: false })
    }


    validation = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.state.fullname.length < 2) {
            await this.setState({ alertText: 'Please enter your full name.', showAlert: true })
            return false;
        } else {
            if (reg.test(this.state.email) === false) {
                await this.setState({ alertText: 'Please enter your email.', showAlert: true })
                return false;
            } else {
                if (this.state.password.length < 5) {
                    await this.setState({ alertText: 'Password must be greater then 5 digit.', showAlert: true })
                    return false;
                } else {
                    if (this.state.repeatPassword.length < 5) {
                        await this.setState({ alertText: 'Password must be greater then 5 digit.', showAlert: true })
                        return false;
                    } else {
                        if (this.state.password !== this.state.repeatPassword) {
                            await this.setState({ alertText: 'Password does not match.', showAlert: true })
                            return false;
                        } else {

                            this.openTermsOfService();

                        }
                    }
                }
            }
        }
    }



    openTermsOfService = () => {

        this.state.signUpCredentials.full_name = this.state.fullname;
        this.state.signUpCredentials.email = this.state.email;
        this.state.signUpCredentials.password = this.state.password;
        this.state.signUpCredentials.confirm_password = this.state.password;

        Navigation.push(this.props.componentId, {
            component: {
                name: 'TermConditionScreen',
                passProps: {
                    comingFrom: 'signup',
                    signUpCredentials: this.state.signUpCredentials,
                    savePasswordToAsync: this.savePasswordToAsync
                }
            }

        });

    }


    savePasswordToAsync = async () => {
        if (this.state.rememberPasswordColor === greenColor) {
            let userCredentails = [...passwordArray, {
                'email': this.state.email,
                'password': this.state.password
            }]

            await AsyncStorage.setItem('data', JSON.stringify(userCredentails));
        }
    }


    render() {

        return (


            <SafeAreaView style={styles.container}>

                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content" />

                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>

                    <Image style={{ width: '100%', height: 220, }} source={signupBG} />

                    <Text style={{ marginTop: 5, fontWeight: 'bold', fontSize: 20, color: '#000', textAlign: "center" }}>Sign Up</Text>

                    <View style={styles.contentContainer}>

                        <TextInput style={styles.inputField}
                            placeholder="full name"
                            selectionColor={'green'}
                            placeholderTextColor="#8E9494"
                            onChangeText={(pass) => { this.setState({ fullname: pass }) }} />

                        <TextInput style={styles.inputField}
                            placeholder="e - mail"
                            selectionColor={'green'}
                            placeholderTextColor="#8E9494"
                            onChangeText={(pass) => { this.setState({ email: pass.trim() }) }} />

                        {/* <TextInput style={styles.inputField}
                            autoCapitalize='none'
                            selectionColor={'green'}
                            placeholder="e - mail"
                            placeholderTextColor="#8E9494"
                            keyboardType='email-address'
                            onChangeText={(pass) => { this.setState({ email: pass.trim() }) }} /> */}

                        <TextInput style={styles.inputField}
                            placeholder="password"
                            selectionColor={'green'}
                            placeholderTextColor="#8E9494"
                            secureTextEntry={true}
                            onChangeText={(pass) => { this.setState({ password: pass.trim() }) }} />

                        <TextInput style={styles.inputField}
                            selectionColor={'green'}
                            placeholder="repeat password"
                            placeholderTextColor="#8E9494"
                            secureTextEntry={true}
                            onChangeText={(pass) => { this.setState({ repeatPassword: pass.trim() }) }} />


                        <TouchableOpacity activeOpacity={1} style={styles.rememberPasswordContainer} onPress={this.rememberPasswordAction}>
                            <View style={{ height: 25, width: 25, backgroundColor: this.state.rememberPasswordColor, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                <Image source={tickIcon} />
                            </View>
                            <Text style={styles.rememberPasswordText}>Remember Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginBottom: 30, marginTop: 10 }} onPress={this.validation}>
                            <View style={{ marginTop: 10, backgroundColor: greenColor, height: 55, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 19, fontWeight: '700' }}>Create</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

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

                </KeyboardAwareScrollView>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    mainLogo: {
        height: 220,
    },
    inputField: {
        height: 55,
        marginTop: 15,
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
        marginTop: 5,
        marginLeft: 5
    },
    rememberPasswordText: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#000'
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
        fontSize: 16,
        color: '#000',
        textAlign: "center"
    }

});