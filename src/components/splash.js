import React, { Component, useRef } from 'react';
import { Platform, View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Keyboard, ImageBackground, KeyboardAvoidingView, Image } from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import * as Font from 'expo-font';

import Svg, {Circle, ClipPath} from 'react-native-svg'
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat,
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

class SplashHelper extends Component {

    state = {
        imageHeightTest: new Value(40), // default value for X (close button)
    };

    constructor() {
        super();
        this.imageHeight = 40; // default value for X (close button)
        console.log('constructor(): imageHeight: '+this.imageHeight)

        this.buttonOpacity = new Value(1);
        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        )
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 50, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputIndex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });
    }
    componentDidMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = () => {
        console.log('keyboardWillShow call with initially '+this.imageHeight);
        this.imageHeight = 0;
        console.log('keyboardWillShow altered height of '+this.imageHeight);
    };

    keyboardWillHide = () => {
        console.log('keyboardWillHide call with initially '+this.imageHeight);
        this.imageHeight = 40;
        console.log('keyboardWillHide altered height of '+this.imageHeight);
    };

    render() {

        return (
            <KeyboardAvoidingView
                style={{flex:1, backgroundColor:'white', justifyContent: 'flex-end'}}
                behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'flex-end'
                }}
            >
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateY: this.bgY }]
                    }}
                >

                    <Svg height={height + 50} width={width}>
                        <ClipPath id="clip">
                            <Circle r={height + 50} cx={width / 2} />
                        </ClipPath>
                        <Image
                            href={require('../../assets/rsz_blue_bg.png')}
                            width={width}
                            height={height + 50}
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#clip)"
                        />
                        <Image
                            style={{
                                position: 'absolute',
                                top: 30,
                                left: width / 1.5,

                            }}
                            href={require('../../assets/logo_white_negative.png')}
                            width={width}
                            height={height / 1.5}
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </Svg>


                </Animated.View>
                <View style={{ height: height / 3, justifyContent: 'center' }}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <Animated.View
                            style={{
                                ...styles.button,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Take Tour</Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <Animated.View
                        style={{
                            ...styles.button,
                            backgroundColor: '#00256E',
                            opacity: this.buttonOpacity,
                            transform: [{ translateY: this.buttonY }]
                        }}
                    >
                        <Text
                            style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
                            >Collect Miles</Text>
                    </Animated.View>

                    <Animated.View style={{
                        zIndex: this.textInputIndex,
                        opacity: this.textInputOpacity,
                        transform: [{translateY: this.textInputY}],
                        height: height / 3,
                        ...StyleSheet.absoluteFill,
                        top: null,
                        justifyContent: 'center'}}>


                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={[styles.closeButton, { height: this.imageHeight }]}>
                                <HideWithKeyboard>
                                    <Animated.Text style={{
                                        fontSize: 15,
                                        color: '#00256E',
                                        transform: [{rotate: concat(this.rotateCross, 'deg') }]
                                    }}>X</Animated.Text>
                                </HideWithKeyboard>
                            </Animated.View>
                        </TapGestureHandler>



                        <View style = {[styles.container_scroll, { marginTop: 20 } ]}>
                            <ScrollView
                                horizontal = { true }
                                pagingEnabled = { true }
                                showsHorizontalScrollIndicator = { true }>
                                <View style = { styles.content_scroll_child }>
                                    <View style={{flex: 1, flexDirection:"row"}}>
                                        <View style={{width: 100}}>
                                            <ImageBackground style={ styles.icon_scroll }
                                                             resizeMode='cover'
                                                             source={require('../../assets/app_flags.png')} />
                                        </View>
                                        <View style={{flexDirection: 'column', marginLeft: 5}}>
                                            <Text style = { styles.text_scroll_heading }>Log in and start your Journey</Text>
                                            <Text style = { styles.text_scroll }>Once in.. well.. fare wind, hands on the helm, eyes on the battens</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style = { styles.content_scroll_child }>
                                    <View style={{flex: 1, flexDirection:"row"}}>
                                        <View style={{width: 100}}>
                                            <ImageBackground style={ styles.icon_scroll }
                                                             resizeMode='contain'
                                                             source={require('../../assets/app_miles.png')} />
                                        </View>
                                        <View style={{flexDirection: 'column', marginLeft: 4}}>
                                            <Text style = { styles.text_scroll_heading }>Start collecting miles</Text>
                                            <Text style = { styles.text_scroll }>As soon as you start the journey, the app will collect miles by tracking and summing up your tacks and gybes</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style = { styles.content_scroll_child }>
                                    <View style={{flex: 1, flexDirection:"row"}}>
                                        <View style={{width: 100}}>
                                            <ImageBackground style={ styles.icon_scroll }
                                                             resizeMode='cover'
                                                             source={require('../../assets/app_share_info.png')} />
                                        </View>
                                        <View style={{flexDirection: 'column', marginLeft: 5}}>
                                            <Text style = { styles.text_scroll_heading }>Share the experience with Friends</Text>
                                            <Text style = { styles.text_scroll }>Once you collect the experience, feel free to share it with 3rd parties or with social</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style = { styles.content_scroll_child }>
                                    <View style={{flex: 1, flexDirection:"row"}}>
                                        <View style={{width: 100}}>
                                            <ImageBackground style={ styles.icon_scroll }
                                                             resizeMode='cover'
                                                             source={require('../../assets/app_contest.png')} />
                                        </View>
                                        <View style={{flexDirection: 'column', marginLeft: 5}}>
                                            <Text style = { styles.text_scroll_heading }>What do to do with collected miles?</Text>
                                            <Text style = { styles.text_scroll }>Aside of showing off, you could join some contests</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>


                        {/*<TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />

                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View
                                style={{
                                    ...styles.button,

                                }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login</Text>
                            </Animated.View>
                        </TapGestureHandler>*/}


                    </Animated.View>
                </View>
            </View>
            </KeyboardAvoidingView>
        );
    }
}
export default SplashHelper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_scroll: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },
    button: {
        backgroundColor: 'white',
        height: 55,
        marginHorizontal: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        shadowOffset: {width: 2, height: 2},
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3,

    },
    textInput: {
        height: 55,
        borderRadius: 12,
        marginHorizontal: 40,
        borderWidth: 0.5,
        alignItems: 'center',
        marginVertical: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderColor: 'rgba(0,0,0,0.3)',
        elevation: 3,
    },
    closeButton: {
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowOffset: {width: 2, height: 2},
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3,
    },
    splash: {
        resizeMode: "cover",
        width: 60,
        height: 60,
    },
    content_scroll_child: {
        width,
        alignItems:"flex-start",
        /*backgroundColor: '#9C27B0',*/
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 30,
        paddingRight: 100,
        paddingTop: 40,
    },
    text_scroll: {
        fontSize: 17,
        color: '#808080',
        marginHorizontal: 10
    },
    text_scroll_heading: {
        fontSize: 23,
        color: '#00256E',
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginBottom: 20,
    },
    icon_scroll: {
        flex: 1,
        marginTop: -5,
        resizeMode: 'contain',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    }
});