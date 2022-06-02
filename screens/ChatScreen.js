import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { Component, useState, useCallback } from "react";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import ListaMsj from "../components/chats/ListaMsj";
import { useFocusEffect } from "@react-navigation/core";
import firebase from "../DataBase/Firebase";
import { useLogin } from "../context/LoginProvider";
import { Input } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChatScreen = () => {
  const { profile, salaA } = useLogin();
  const [loading, setLoading] = useState(false);
  const [msjLoading, setMsjLoading] = useState("Cargando mensajes del aula");
  const [msjs, setMsjs] = useState([]);
  const [textoChat, setTextoChat] = useState("");
  const nameCollection = salaA ? "msjs4a" : "msjs4b";

  useFocusEffect(
    useCallback(() => {
      const TraerMsj = async () => {
        firebase.db
          .collection(nameCollection)
          .orderBy("fecha", "asc")
          .onSnapshot((querySnapshot) => {
            const msjsCollection = [];
            querySnapshot.docs.forEach((doc) => {
              const { autor, fecha, fechaCorta, txt, idUser } = doc.data(); // destructuro el doc
              const id_ = doc.id;
              msjsCollection.push({
                id: id_,
                autor: autor,
                txt: txt,
                fecha: fecha,
                fechaCorta: fechaCorta,
                idUser: idUser, // id del DOCUMENTO
              });
            });
            setMsjs(msjsCollection);
          });
      };

      TraerMsj();
    }, [])
  );

  const crearMsj = () => {
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let msj = {
      txt: textoChat,
      fecha: fecha,
      fechaCorta: hoy,
      autor: `${profile.nombre} (${profile.perfil})`,
      idUser: profile.id,
    };
    firebase.db.collection(nameCollection).add(msj);
    setTextoChat("");
  };
  const footerComponent = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width * 1,
          height: 50,
          borderRadius: 20,
          marginBottom: Dimensions.get("window").height * 0.03,
          margin: 10,
          borderTopWidth: 1,
          borderColor: "white",
          paddingTop: 5,
        }}
      >
        <Input
          placeholder="Ingresa tu mensaje!"
          placeholderTextColor={salaA ? ColorsPPS.moradoOscuro : "white"}
          onChange={(event) => setTextoChat(event.nativeEvent.text)}
          value={textoChat}
          onChangeText={(text) => {
            setTextoChat(text);
          }}
          inputContainerStyle={{
            borderWidth: 2,
            padding: 5,
            borderColor: ColorsPPS.escarcha,
            borderRadius: 20,
            width: "90%",
            alignSelf: "center",
            marginBottom: 5,
          }}
          inputStyle={{ color: "white" }}
          rightIcon={
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: salaA
                  ? ColorsPPS.violeta
                  : ColorsPPS.moradoOscuro,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                crearMsj();
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 10, color: "white" }}
              >
                Enviar
              </Text>
            </TouchableOpacity>
          }
          rightIconContainerStyle={{
            width: Dimensions.get("window").height * 0.15,
          }}
        />
      </View>
    );
  };
  return loading ? (
    <LoadingScreen message={msjLoading} />
  ) : (
    <KeyboardAwareScrollView
      style={{ backgroundColor: salaA ? ColorsPPS.azul : ColorsPPS.violeta }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          height: Dimensions.get("window").height * 0.9,
          borderWidth: 0,
          backgroundColor: salaA ? ColorsPPS.azul : ColorsPPS.violeta,
        }}
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        {
          <ListaMsj
            msjs={msjs}
            textoChat={textoChat}
            setTextoChat={setTextoChat}
          />
        }
        {footerComponent()}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default ChatScreen;
