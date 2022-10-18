import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import React, { Component, useEffect, useRef } from "react";
import { useLogin } from "../context/LoginProvider";
import { LinearGradient } from "expo-linear-gradient";
import ColorsPPS from "../utils/ColorsPPS";

export default Splash = (props) => {
  const { navigation } = props;
  const { setisFinishSplash, setIsLogIn } = useLogin();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 3500);
    animate();
  }, []);

  let animatedValue = new Animated.Value(0);

  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 3500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start(() => {
      animate();
    });
  };

  const marginLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 0],
  });
  const marginRigth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });
  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });
  const movingMargin = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 50, 0],
  });
  const textSize = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [28, 42, 28],
  });
  const rotateX = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "360deg", "0deg"],
  });

  return (
    <View
      style={{
        backgroundColor: ColorsPPS.azul,
        flex: 1,
        justifyContent: "space-evenly",
        alignContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 0,
          borderWidth: 0,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 40,
            textAlign: "center",
            color: ColorsPPS.morado,
          }}
        >
          Herik Arismendy Division 4a
        </Text>
      </View>
      <Animated.View
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.25,
          marginLeft: marginLeft,
        }}
      >
        <Image
          source={require("../assets/logos/iconlogo.png")}
          style={{
            width: "90%",
            height: "90%",
            resizeMode: "contain",
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.25,
          marginLeft: marginRigth,
        }}
      >
        <Image
          source={require("../assets/logos/iconlogo.png")}
          style={{
            width: "90%",
            height: "90%",
            resizeMode: "contain",
          }}
        />
      </Animated.View>
    </View>
  );
};
