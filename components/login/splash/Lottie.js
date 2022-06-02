import React from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import splash_ from "../../../assets/splash/animated2.json";

export default class LottieSplash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.animation.play(20, 120);
  }

  render() {
    return (
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "transparent",
        }}
        source={splash_}
        loop={false}
        onAnimationFinish={() => {
          console.log("finish");
          //this.props.navigation.navigate("Login");
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
