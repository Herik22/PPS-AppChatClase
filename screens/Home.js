import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";
import fondo from "../assets/fondos/fondo.png";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import Salon4a from "../assets/home/fondo4A.png";
import Salon4b from "../assets/home/fondo4B.png";
import { Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";
import { authentication, db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";

export default Home = (props) => {
  const { navigation } = props;
  const { Email_, isLogIn, setIsLogIn, setSalaA, setProfile } = useLogin();
  const [loading, setLoading] = useState(false);
  const [msjLoading, setMsjLoading] = useState("Cerrando Sesión");

  const colectionUsers = "users";
  useEffect(() => {
    //console.log(authentication.currentUser);
    updateCurrentUser(authentication.currentUser.uid, setProfile);
  }, []);
  const updateCurrentUser = async (uid, setProfile) => {
    const docRef = doc(db, colectionUsers, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let auxUser = docSnap.data();
      setProfile(auxUser);
      console.log("actualizado el profile", auxUser);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return false;
    }
  };

  const btnHome = (tittleColor, bgColor, tittle, img, chatA = true) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: bgColor,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingTop: 10,
        }}
        onPress={() => {
          chatA ? setSalaA(true) : setSalaA(false);

          navigation.navigate("ChatScreen");
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: tittleColor, fontSize: 50 }}> {tittle} </Text>
          <Fontisto name="photograph" size={45} color={tittleColor} />
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            borderRadius: 0,
            borderWidth: 0,
          }}
        >
          <ImageBackground
            source={img}
            style={{
              flex: 1,
            }}
            resizeMode="cover"
          ></ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const closeSession = () => {
    setTimeout(() => {
      setLoading(false);
      setIsLogIn(false);
      //navigation.navigate("Login");
    }, 2000);
  };

  return loading ? (
    <LoadingScreen message={msjLoading} />
  ) : (
    <View
      style={{
        backgroundColor: ColorsPPS.moradoOscuro,
        flex: 1,
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: Dimensions.get("window").width * 0.3,
            height: Dimensions.get("window").height * 0.04,
            backgroundColor: ColorsPPS.morado,
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            margin: 10,
            paddingRight: 5,
            marginTop: Dimensions.get("window").height * 0.03,
            borderColor: ColorsPPS.amarillo,
            borderWidth: 1,
          }}
          onPress={() => {
            setMsjLoading("Cerrando Sesión.");
            setLoading(true);
            closeSession();
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
        {btnHome(ColorsPPS.violeta, ColorsPPS.azul, "PPS-4A", Salon4a)}
        {btnHome(
          ColorsPPS.moradoOscuro,
          ColorsPPS.violeta,
          "PPS-4B,",
          Salon4b,
          false
        )}
      </View>
    </View>
  );
};
