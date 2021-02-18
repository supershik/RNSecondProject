// Powered By Development Here 
// www.devhere.co
// Terms: https://devhere.co/terms-and-conditions
// Started in (28-05-2020)
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Animated,
    Dimensions,
    ScrollView
} from "react-native";
import Theme from "../Theme";
import DarkTheme from "../DarkTheme";

import {useTheme} from '@react-navigation/native';
import { tranlateText } from "../translation/translate";
import { useSelector } from "react-redux";

import LinearGradient from "react-native-linear-gradient"
const defaultFadeColors = ['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.9)'];


const HEADER_MAX_HEIGHT = 280;
const HEADER_MIN_HEIGHT = 41;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT-HEADER_MIN_HEIGHT;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class IssuesScreen extends React.Component {
    state = {
        isFade: false
    }

    startY = 0
    offsetY = 0
    _menu = null;

    // scrollHeight = 0
    // scrollWidth = 0
    // availableWidth = 0
    // availableHeight = 0
    // allowStartFade = false
    // allowEndFade = true

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    scrollY = new Animated.Value(0)
    alignment = new Animated.Value(0)

    getStartFaade() {
        return (
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                style={{ position: 'absolute', top: 0, width: '100%', height: 40 }}
                colors={defaultFadeColors}
                pointerEvents={'none'}
            />
        )
    }

    bringUpActionSheet () {
        Animated.timing(this.alignment, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }
    
    gestureHandler (e) {
        // console.log(e.nativeEvent.contentOffset)
        if(e.nativeEvent.contentOffset.y > 0) this.bringUpActionSheet()
        else this.hideTheActionSheet()
    }

    hideTheActionSheet () {
        Animated.timing(this.alignment, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }

    render() {
        const { colors, locale, config } = this.props;
        let myTheme = Theme;
        myTheme = config.theme === 'dark' ? DarkTheme: Theme;

        const actionSheetIntropolate = this.alignment.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -DEVICE_HEIGHT/1.4+250]
        })

        const actionSheetStyle = {
            bottom: actionSheetIntropolate
        }

        return (
            <Animated.View style={[styles.container, actionSheetStyle]}>
                <View>
                    <ScrollView
                        // onScroll={(e) => this.gestureHandler(e)}
                        onTouchStart={(event) => {
                            const { nativeEvent } = event;
                            const { pageY } = nativeEvent;
                            this.startY = pageY
                          }}

                        onTouchMove={(event) => {
                            // event.preventDefault();
                            const { nativeEvent } = event;
                            const { pageY } = nativeEvent;
                            const offsetXY = pageY - this.startY;
                            
                            if (offsetXY > 0) {
                                this.hideTheActionSheet()
                            }
                            if (offsetXY < 0 ) {
                                this.bringUpActionSheet()
                            }
                        }}
                        style={styles.grabber}
                        >
                        <View style={{position: 'absolute', alignSelf: "center", margin: 20, height: 5, width: 60, borderRadius: 60, backgroundColor: '#ccc'}}/>
                        <View style={{height: 51}}/>
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        onScroll={({nativeEvent}) => {
                            this.offsetY = nativeEvent.contentOffset.y
                            if(this.offsetY <= 10 )
                                this.setState({isFade: false})
                            else 
                                this.setState({isFade: true})
                        }}
                        onTouchStart={(event) => {
                            const { nativeEvent } = event;
                            const { pageY } = nativeEvent;
                            this.startY = pageY
                          }}

                        onTouchMove={(event) => {
                            // event.preventDefault();
                            const { nativeEvent } = event;
                            const { pageY } = nativeEvent;
                            const offsetXY = pageY - this.startY;
                            
                            if (offsetXY > 0 && this.offsetY <= 0) {
                                this.hideTheActionSheet()
                            }
                            if (offsetXY < 0) {
                                this.bringUpActionSheet()
                            }
                        }}
                    >
                    </ScrollView>
                    {this.state.isFade && this.getStartFaade()}
                </View>

            </Animated.View>
        );
    }
}
export default function(props) {
    const {colors} = useTheme();
    const config = useSelector((state) => state.config);
    return <IssuesScreen {...props} colors={colors} config={config}/>;
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1, paddingHorizontal: 20,
    //     marginTop: 15
    // },
    // container: {
    //     flex: 1, 
    //     paddingHorizontal: 20,
    //     position: 'absolute',
    //     backgroundColor: 'white',
    //     overflow: 'hidden',
    //   },

    container: {
        paddingHorizontal: 20,
        position: 'absolute',
        backgroundColor: 'white',
        left: (DEVICE_WIDTH - DEVICE_WIDTH / 1.01)/2,
        right: 0,
        bottom: 0,
        height: DEVICE_HEIGHT / 1.4,
        width: DEVICE_WIDTH / 1.01,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
      },

    grabber: {
        alignSelf: "center",
        width: "100%",
        // height: 30,
    },
    visitwrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        height: 14,
        width: 14,
        resizeMode: 'contain',
        transform: [{ rotate: '-90deg' }]
    },
    visittext: {
        fontFamily: Theme.poppinsbold,
        paddingRight: 5
    },
    menuText: {
        fontFamily: Theme.poppins,
    },
    createnew: {
        color: Theme.blue,
        fontFamily: Theme.poppinsbold,
        fontSize: 13
    },
    box: {
        width: '100%',
        backgroundColor: '#e5e5e570',
        borderRadius: 5,
        height: 45,
        marginTop: 5
    },
    boxbig: {
        width: '100%',
        backgroundColor: '#e5e5e570',
        borderRadius: 5,
        height: 85,
        marginTop: 5
    },
    applybtn: {
        backgroundColor: Theme.primary,
        height: 45,
        width: 140,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btntext: {
        color: '#fff',
        fontFamily: Theme.poppinsbold
    }
});