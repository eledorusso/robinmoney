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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import startTabs from './StartMainTabs';
import popup_bg from '../Asserts/popup_bg.svg';

import termsIcon from '../Asserts/terms_icon.png';

const greenColor = "#48DC9F"

export default class TermConditionScreen extends Component {

    constructor() {
        super()
    }


    state = {
        isLoading: false,
        termText: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n   The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    }

    goback = async () => {
        if (this.props.comingFrom == 'google') {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } else if (this.props.comingFrom == 'facebook') {
            await LoginManager.logOut();
        }

        Navigation.pop(this.props.componentId);
    }


    acceptAction = () => {

        if (this.props.comingFrom == 'signup') this.signUpApi();
        else this.socialLoginApi();

    }




    signUpApi = () => {

        // hit api
        this.setState({ isLoading: true });
        const url = domain + '/api/Robin_Money/signup.php';

        fetch(url, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

            // body: data,
            body: JSON.stringify(this.props.signUpCredentials),

        })
            .then((response) => response.text())
            .then(async (responseText) => {

                let responseData = JSON.parse(responseText);

                console.log(responseData, "scnz  qqaa");
                if (responseData.code == 200) {
                    await AsyncStorage.setItem('@userToken', responseData.token);
                    this.props.savePasswordToAsync();
                    startTabs();
                } else {
                    Alert.alert('Alert', responseData.message);
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                console.log(error, 'error from APi');
            });

        // hit api

    }



    socialLoginApi = async () => {

        // hit api
        const url = domain + '/api/Robin_Money/login_by_social_media.php';
        console.log(this.props.signUpCredentials, "this.props.signUpCredentials")
        fetch(url, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            // body: data,
            body: JSON.stringify(this.props.signUpCredentials),

        })
            .then((response) => response.text())
            .then(async (responseText) => {

                let responseData = JSON.parse(responseText);

                console.log(responseData, "scnz  qqaa");
                if (responseData.code == 200) {
                    console.log(responseData.Token, "token")
                    await AsyncStorage.setItem('@userToken', responseData.Token);
                    startTabs();
                } else {
                    //Alert.alert('Alert', responseData.message);
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


    render() {

        return (


            <SafeAreaView style={styles.container}>

                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content" />

                <Modal isVisible={this.state.isLoading}>
                    <ActivityIndicator animating={this.state.isLoading} size="large" color={greenColor} />
                </Modal>


                <Modal isVisible={this.state.showAlert} style={{ alignItems: 'center' }}>

                    <View style={{ height: 220, width: '60%', backgroundColor: '#fff', borderRadius: 10 }}>

                        <Image style={{ width: '100%', height: 100 }} source={popup_bg} />

                        <Text style={styles.modelText}>{this.state.alertText}</Text>

                        <TouchableOpacity onPress={() => {
                            this.setState({showAlert: false})
                        }} style={{ marginBottom: 40 }}>
                            <View style={{ width: '80%', marginTop: 20, backgroundColor: greenColor, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Ok</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </Modal>


                <View style={styles.container}>

                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#000',
                        textAlign: "center",
                        marginTop: 20
                    }}>Términos & Condiciones</Text>

                    <Image source={termsIcon} style={{ width: 35, height: 35, alignSelf: 'center', marginTop: 20 }} />


                    <View style={styles.contentContainer}>

                        <View style={{
                            height: '70%',
                            borderWidth: 1,
                            borderColor: greenColor,
                            borderRadius: 12
                        }}>


                            <ScrollView>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <Text style={{
                                        fontWeight: '600',
                                        fontSize: 18,
                                        color: '#000',
                                        marginTop: 20
                                    }}>General Terms</Text>

                                    <Text style={{
                                        fontWeight: '300',
                                        fontSize: 14,
                                        color: '#000',
                                        marginTop: 10,
                                        marginBottom: 20
                                    }}>{this.state.termText}</Text>
                                </View>

                            </ScrollView>



                        </View>


                        <View style={styles.buttonContainer}>
                            <View style={{ width: '45%', marginTop: 10, backgroundColor: '#fff', height: 55, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderColor: greenColor, borderWidth: 1.5 }}>
                                <TouchableOpacity onPress={this.goback}>
                                    <Text style={styles.gobackText}>Go Back</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '45%', marginTop: 10, backgroundColor: greenColor, height: 55, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={this.acceptAction}>
                                    <Text style={styles.acceptText}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

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
    mainLogo: {
        height: 220,
    },
    inputField: {
        height: 50,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: greenColor,
        paddingLeft: 10,
        fontSize: 16
    },
    contentContainer: {
        marginHorizontal: 20,
        marginTop: 10
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
    buttonContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30
    },
    socailIcon: {
        width: 40,
        height: 40
    },
    stringText: {
        color: "#000",
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 15
    },
    actionText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        textAlign: "center"
    },
    acceptText: {
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16

    },
    gobackText: {
        color: greenColor,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 15
    },
    modelText: {
        color: "#000",
        fontWeight: '300',
        textAlign: 'center',
        fontSize: 15
    },

});