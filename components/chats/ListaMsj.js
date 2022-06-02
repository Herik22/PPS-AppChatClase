import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { Entypo, AntDesign, Octicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/core";
import { useLogin } from "../../context/LoginProvider";
import { Input } from "@rneui/base";
import ColorsPPS from "../../utils/ColorsPPS";
import { fetchUpdateAsync } from "expo-updates";

const ListaMsj = (props) => {
  const { msjs } = props;
  const { profile, salaA } = useLogin();

  useEffect(() => {}, []);

  const ItemList = (props) => {
    const { info } = props;
    const { fechaCorta, id, txt, autor, idUser } = info.item;
    console.log(info.item);
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height * 0.08,
          width: Dimensions.get("window").width * 0.5,
          borderWidth: 1,
          borderTopLeftRadius: profile.id == idUser ? 20 : 0,
          borderTopRightRadius: profile.id == idUser ? 0 : 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          margin: 10,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: 5,
          alignSelf: profile.id == idUser ? "flex-end" : "flex-start",
          backgroundColor: salaA
            ? profile.id == idUser
              ? "aqua"
              : "pink"
            : profile.id == idUser
            ? ColorsPPS.moradoOscuro
            : ColorsPPS.gris,
        }}
      >
        <View style={{ position: "absolute", top: 3, left: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {profile.id != idUser ? autor : ""}
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              fontSize: 13,
              color: profile.id == idUser ? "gray" : "black",
              fontWeight: "bold",
            }}
          >
            {" "}
            {txt}{" "}
          </Text>
        </View>
        <View style={{ position: "absolute", bottom: 5, right: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 13, color: "gray" }}>
            {" "}
            {fechaCorta}{" "}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={msjs}
      renderItem={(msj) => <ItemList info={msj} />}
      keyExtractor={(item, index) => index.toString()}
      style={{
        width: Dimensions.get("window").width,
        backgroundColor: salaA ? ColorsPPS.azul : ColorsPPS.violeta,
        padding: 10,
        margin: 0,
      }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: Dimensions.get("window").height * 0.3,
  },
});

export default ListaMsj;
