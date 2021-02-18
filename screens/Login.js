// https://www.youtube.com/watch?v=ZiSN9uik6OY&ab_channel=CatalinMiron

import React from "react";
import {
  findNodeHandle,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
  Dimensions,
  Animated
} from "react-native";
import Theme from "../Theme";
import { ScrollView } from "react-native-gesture-handler";
import DarkTheme from "../DarkTheme";
import { tranlateText } from "../translation/translate";
import {useTheme} from '@react-navigation/native';
import { useSelector } from "react-redux";
import IssuesScreen from '../component/Issues'

const {width, height} = Dimensions.get('screen');

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  // skullcandy:
  //   'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  // help:
  //   'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef()
}));

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref} style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center"}}>
        <Image
            source={{uri: item.image}}
            style={{width: 20, height: 20, resizeMode: 'cover'}}
          />
        <Text style={{color: 'white', fontSize: 50/data.length, fontWeight: 'bold', textTransform: 'uppercase'}}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
});


const Indicator = ({measures, scrollX}) => {
  const paddingHoz = 10
  const inputRange = data.map((_, i) => i*width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width+paddingHoz*2),
  })
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  })

  return (
    <Animated.View 
      style={{
        position: 'absolute',
        height: 36,
        width: indicatorWidth,
        left: -paddingHoz,
        backgroundColor: 'rgba(255,255,255,0.3)',
        transform: [{
          translateX
        }],
        top: -5,
        borderRadius: 8
      }}
    />
  )
}

const Tabs = ({data, scrollX, onItemPress}) => {
  const [measures, setMeasures] = React.useState([])
  const containerRef = React.useRef()
  React.useEffect(() => {
    const m = []
    data.forEach( item => {
      item.ref.current.measureLayout(
        containerRef.current, 
        (x, y, width, height) => {
          m.push({
            x, 
            y, 
            width, 
            height
          })
          if (m.length === data.length) {
            setMeasures(m)
          }
        }
      )
    })
  }, [])

  return (
    <View style={{position: 'absolute', top: 100, width}}>
      <View 
        ref={containerRef}
        style={{justifyContent: 'space-evenly', flex: 1, flexDirection: 'row'}}>
        {data.map((item, index) => {
          return <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)}/>
        })}
        {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX}/>}
      </View>
    </View>
  )
}

//login
export default function Login(props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef()
  const onItemPress = React.useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width
    })
  })

  return (
    <View style={styles.container}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: {x: scrollX } } }],
            { useNativeDriver: false }
          )}
          bounces={false}
          renderItem={({item}) => {
            return (
              <View style={{zIndex: 0, width}}>
                <IssuesScreen/>
              </View>

              // <View style={{width, height}}>
              //     <Image
              //       source={{uri: item.image}}
              //       style={{flex: 1, resizeMode: 'cover'}}
              //     />
              //     <View style={[StyleSheet.absoluteFillObject, {backgroundColor: 'rgba(0, 0, 0, 0.3)'}]} />
              // </View>
            )
          }}
        />
      <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.blue,
  },
  logoWrapper: {
    marginTop: 60,
  },
  entryWrapper: {
    flex: 5,
    marginTop: 15
  },
  socialWrapper: {
    paddingHorizontal: 20,
    justifyContent: "space-around",
    backgroundColor: "green"
  },
  forgotWrapper: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 14,
    fontFamily: Theme.poppins,
  },
  mainBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.primary,
  },
  line: {
    borderColor: "#e5e5e5",
    borderWidth: 0.5,
    height: 0.7,
  },
  socialIcons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  placeholderWrapper: {
    paddingVertical: Platform.OS === "ios" ? 15 : 0,
    fontSize: 14,
    opacity: 0.9,
    fontFamily: Theme.poppins,
  },
  title: {
    // paddingVertical: Platform.OS === "ios" ? 15 : 0,
    fontSize: 18,
    fontFamily: Theme.poppinsbold,
    textAlign: "left"
  },
  inputgroup: {
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 15
  },
  arrow: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    transform: [{ rotate: '-90deg' }]
  },
  texttip: {
    fontSize: 12,
    fontFamily: Theme.poppins,
    opacity: 0.8,
    textAlign: "left"
  },
  btnsocial: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 15,
  }
});
