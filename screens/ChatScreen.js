import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Vibration,
} from "react-native";
import React, { Component, useState, useCallback, useEffect } from "react";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import ListaMsj from "../components/chats/ListaMsj";
import { useFocusEffect } from "@react-navigation/core";
import { db, app } from "../firebase-config";
import { MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  setDoc,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useLogin } from "../context/LoginProvider";
import { Input } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChatScreen = () => {
  const { profile, salaA } = useLogin();
  const [loading, setLoading] = useState(false);
  const [msjLoading, setMsjLoading] = useState("Cargando mensajes del aula");
  const [msjs, setMsjs] = useState([]);
  const [errorLongTxt, setErrorLongTxt] = useState(false);
  const [textoChat, setTextoChat] = useState("");
  const nameCollection = salaA ? "msjs4a" : "msjs4b";

  /*useFocusEffect(
    useCallback(() => {
      TraerMsj2();
    }, [])
  );*/

  useEffect(() => {
    TraerMsj2();
  }, []);
  const TraerMsj2 = async () => {
    const msjRef = collection(db, nameCollection);
    /* PRUEBA */
    const q2 = query(msjRef, orderBy("fecha", "asc"), limit(10));
    const unsubscribe = onSnapshot(q2, (querySnapshot) => {
      const msjsCollection = [];
      querySnapshot.forEach((doc) => {
        const { autor, fecha, fechaCorta, txt, idUser } = doc.data();
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

  const crearMsj2 = async () => {
    console.log("entre");
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let msj = {
      txt: textoChat,
      fecha: fecha,
      fechaCorta: hoy,
      autor: `${profile.nombre} (${profile.perfil})`,
      idUser: profile.id,
    };
    await addDoc(collection(db, nameCollection), msj);

    setTextoChat("");
  };
  const footerComponent = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width * 1,
          //height: 50,
          borderRadius: 20,
          marginBottom: Dimensions.get("window").height * 0.01,
          marginHorizontal: 10,
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
            if (text.length > 20) {
              setErrorLongTxt(true);
            } else {
              setErrorLongTxt(false);
            }
            setTextoChat(text);
          }}
          inputContainerStyle={{
            borderWidth: 2,
            padding: 5,
            borderColor: ColorsPPS.escarcha,
            borderRadius: 20,
            width: "90%",
            alignSelf: "center",
            marginBottom: 0,
          }}
          inputStyle={{ color: "white", fontSize: 15 }}
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
                if (!textoChat.length > 0) {
                  alert("mensaje vacio");
                } else if (textoChat.length > 21) {
                  Vibration.vibrate(5000);
                  return;
                } else {
                  crearMsj2();
                }
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
        {errorLongTxt && (
          <View
            style={{
              width: "100%",
              marginHorizontal: 10,
              marginBottom: 5,
              marginTop: -20,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <MaterialIcons
              name="error-outline"
              color={"red"}
              size={15}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 15, color: "red", textAlign: "center" }}>
              solo puedes envíar un max de 21 caracteres
            </Text>
          </View>
        )}
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
