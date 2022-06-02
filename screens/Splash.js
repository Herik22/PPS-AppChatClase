import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
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
    }, 6500);
  }, []);

  return (
    <View
      style={{
        //backgroundColor: "#4F56FF",
        borderWidth: 0,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={["#FBFBFB", "#FBFBFB"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 30,
            borderWidth: 0,
          }}
        >
          <Text style={{ color: "black", fontSize: 40, textAlign: "center" }}>
            Herik Arismendy Division 4a
          </Text>
        </View>
        <Image
          source={require("../assets/splash/chat.gif")}
          resizeMode={"center"}
          style={{
            width: Dimensions.get("window").width * 0.8,
            //height: Dimensions.get("window").height * 1.2,
          }}
        />
      </LinearGradient>
    </View>
  );
};
