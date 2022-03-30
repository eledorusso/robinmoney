import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TextInput, StatusBar, TouchableOpacity, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { domain } from '../Utilities/api'
import Modal from 'react-native-modal'
import CountDown from 'react-native-countdown-component';
import admob, { MaxAdContentRating, RewardedAd, RewardedAdEventType, TestIds } from '@react-native-firebase/admob';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../Asserts/logo.svg';
import gift from '../Asserts/gift.svg';
import play_button from '../Asserts/play_button.svg';
import money from '../Asserts/money.svg';
import giveaway_bg from '../Asserts/giveaway_bg.svg';
import round_gift from '../Asserts/round_gift.svg';
import popup_bg from '../Asserts/popup_bg.svg';
      // "admob_android_app_id": "ca-app-pub-4479767179092893~1959139886",


const greenColor = "#48DC9F"
// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3940256099942544/52243549  17';
const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3940256099942544/5354046379';
let rewardAd;
export default class HomeScreen extends Component {

    constructor() {
        super()
    }

    state = {
        isLoading: false,
        apiToken: '',
        userToken: 0,
        dailyPrice: '',
        timerSeconds: 0,
        alertText: '',
        showAlert: false,
        isAddLoaded: false,
        code: 0
    }

    async componentDidMount() {
        await this.setState({ isLoading: true })
        this.loadRewardAd();
    }

    loadRewardAd = async () => {
        console.log('add  qqww ');

        rewardAd = RewardedAd.createForAdRequest('ca-app-pub-3940256099942544/5224354917', {
            requestNonPersonalizedAdsOnly: true,
        });

        rewardAd.onAdEvent(async (type, error) => {
            if (type === RewardedAdEventType.LOADED) {
                this.getUserTokenAPI();
                await this.setState({ isAddLoaded: true })
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                this.AddUserTokenAPI();
                this.loadRewardAd();

            }
            if (type == 'closed') {
                rewardAd.load();
            }

            if (type === 'error') {
                this.loadRewardAd();
                await this.setState({ isAddLoaded: false, isLoading: false })
                if (this.state.code == 0) {
                    this.getUserTokenAPI();

                }
            }
            console.log(type, 'type');
            console.log(error, 'error');
        });

        // Load a new advert
        rewardAd.load();
    }



    showRewardAd = async () => {
        await this.setState({ isLoading: true })
        if (this.state.isAddLoaded == true) rewardAd.show();
        else await this.setState({ isLoading: false, alertText: 'Ads not available right now. Please try again later.', showAlert: true })

        return;

    }


    hideAlert = async () => {
        await this.setState({ showAlert: false })
    }


    getUserTokenAPI = async () => {

        // hit api
        await this.setState({ apiToken: await AsyncStorage.getItem('@userToken'), code : 1 })
        console.log('my logs', 'token', this.state.apiToken)
        const url = domain + '/api/Robin_Money/get_token.php';
        console.log(this.state.apiToken, "token  qqaa");
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': this.state.apiToken,
            },

        })
            .then((response) => response.text())
            .then(async (responseText) => {

                let responseData = JSON.parse(responseText);

                console.log(responseData, "scnz  qqaa");
                if (responseData.code == 200) {
                    await this.setState({ userToken: this.numberDotFormat(responseData.token), dailyPrice: this.numberDotFormat(responseData.daily_price), timerSeconds: responseData.total_time })
                    // await this.setState({ userToken: this.numberDotFormat(10000), dailyPrice: this.numberDotFormat(10000), timerSeconds: responseData.total_time })
                } else {
                    Alert.alert('Alert', responseData.message);
                }
                await this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                console.log(error, 'error from get token APi');
            });

        // hit api
    }

    numberDotFormat = (n) => {
        let formatted = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formatted;
    }



    AddUserTokenAPI = async () => {

        // hit api
        await this.setState({ apiToken: await AsyncStorage.getItem('@userToken') })
        console.log('my logs', 'token', this.state.apiToken)
        const url = domain + '/api/Robin_Money/add_token.php';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': this.state.apiToken,
            },

        })
            .then((response) => response.text())
            .then(async (responseText) => {

                let responseData = JSON.parse(responseText);

                console.log(responseData, "scnz  qqaa");
                if (responseData.code == 200) {
                    this.getUserTokenAPI();
                } else {
                    Alert.alert('Alert', responseData.message);
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                console.log(error, 'error from get token APi');
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

                <View style={styles.container}>
                        <View style={{ marginHorizontal: '6%'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between" }}>
                                <Image style={{ width: '51.01%'}} source={logo} resizeMode='contain'  />
                                <View style={{ width: '40%', marginBottom: '10%'}}>
                                    <View style={{
                                        padding: 8,
                                        backgroundColor: '#D0F2EA',
                                        borderRadius: 15,
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{ width: '35%', justifyContent: 'center', alignItems: 'center', padding: 5,  }}>
                                            <Image source={money}
                                                style={{ height: 42, width: 42 }} />
                                        </View>
                                        <View style={{ width: '60%', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                                            <Text style={{
                                                fontSize: 13,
                                                fontWeight: '700',
                                                color: '#454F50',
                                                alignSelf: 'flex-start',
                                                letterSpacing: 0.3,
                                                marginLeft: 10
                                            }}>Fichas</Text>
                                            <View style={{ width: '90%', backgroundColor: '#fff', padding: 2, borderRadius: 7, marginTop: 2, alignItems: 'center' }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontWeight: '400',
                                                    color: '#454F50'
                                                }}>{this.state.userToken}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                
                
                        {/*    <View style={{ backgroundColor: '#75AAFA', borderRadius: 25, height: 140, marginTop: 30 }}>

                                <Text style={{
                                    color: '#fff',
                                    fontWeight: '400',
                                    fontSize: 20,
                                    marginTop: 5,
                                    alignSelf: 'center',
                                }}>Sorteo en:</Text>
                                <CountDown
                                    size={30}
                                    until={this.state.timerSeconds}
                                    // onFinish={() => alert('Finished')}
                                    digitStyle={{ marginLeft: 5, backgroundColor: '#75AAFA', }}
                                    digitTxtStyle={{ color: '#fff', fontWeight: '400', fontSize: 45 }}
                                    timeLabelStyle={{ color: '#fff', fontWeight: '300', fontSize: 13, marginTop: -5 }}
                                    timeToShow={['H', 'M', 'S']}
                                    timeLabels={{ h: 'HORAS', m: 'MINUTOS', s: 'SEGUNDOS' }}
                                    showSeparator
                                    separatorStyle={{ color: '#fff', marginTop: -20 }}

                                />

                            </View>


                            <ImageBackground source={giveaway_bg}
                                style={{ marginTop: 25, height: 220, borderRadius: 10 }}
                                imageStyle={{ resizeMode: 'stretch' }}>

                                 <View style={{ justifyContent: 'center', marginTop: 20, marginLeft: 20 }}>
                                    <Image source={round_gift}
                                        style={{
                                            width: 60,
                                            height: 60,
                                        }} />
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 19,
                                        marginTop: -10,
                                        alignSelf: 'center',
                                    }}>POZO DIARIO</Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '900',
                                        fontSize: 60,
                                        marginTop: -10,
                                        alignSelf: 'center',
                                    }}>{this.state.dailyPrice}</Text>
                                    {/* 100,000 
                                </View> 


                            </ImageBackground> */}

                            <TouchableOpacity onPress={this.showRewardAd} style={{alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={play_button} style={{ width: '100%'}} resizeMode='contain' />
                            </TouchableOpacity>

                        </View>


                    <Modal isVisible={this.state.showAlert} style={{ alignItems: 'center' }}>

                        <View style={{ height: 240, width: '65%', backgroundColor: '#fff', borderRadius: 10 }}>

                            <Image style={{ width: '100%', height: 100 }} source={popup_bg} />

                            <Text style={styles.stringText}>{this.state.alertText}</Text>

                            <TouchableOpacity onPress={this.hideAlert} style={{ marginBottom: 40 }}>
                                <View style={{ width: '80%', marginTop: 20, backgroundColor: greenColor, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Ok</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </Modal>


                </View>

            </SafeAreaView>

        )


    }


}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'


    },
    stringText: {
        color: "#000",
        fontWeight: '300',
        textAlign: 'center',
        fontSize: 15
    },

});