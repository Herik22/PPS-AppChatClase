import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  StyleSheet,
  TurboModuleRegistry,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Input } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../context/LoginProvider";
import ModalLogin from "../components/login/modalLogin";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import { LinearGradient } from "expo-linear-gradient";
import { authentication, db } from "../firebase-config";

const Login = (props) => {
  const { setisFinishSplash, setIsLogIn, setProfile } = useLogin();
  const { navigation } = props;
  const { setEmail_ } = useLogin();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    //Traigo los datos 3 segundos despues
    GuardarData();

    setTimeout(() => {
      TraerData();
    }, 3000);
  }, []);

  const GuardarData = async () => {
    // guardo la informacion en el asyn mientras se carga la aplicacion
    try {
      console.log("guardando user");
      await AsyncStorage.setItem(
        "Usuarios",
        JSON.stringify([
          {
            id: 1,
            correo: "admin@admin.com",
            clave: 1111,
            perfil: "admin",
            sexo: "femenino",
            nombre: "Valentina",
          },
          {
            id: 2,
            correo: "invitado@invitado.com",
            clave: 2222,
            perfil: "invitado",
            sexo: "femenino",
            nombre: "Luisa",
          },
          {
            id: 3,
            correo: "usuario@usuario.com",
            clave: 3333,
            perfil: "usuario",
            sexo: "masculino",
            nombre: "Juan",
          },
          {
            id: 4,
            correo: "anonimo@anonimo.com",
            clave: 4444,
            perfil: "usuario",
            sexo: "masculino",
            nombre: "Mateo",
          },
          {
            id: 5,
            correo: "tester@tester.com",
            clave: 5555,
            perfil: "tester",
            sexo: "femenino",
            nombre: "Camila",
          },
          {
            id: 6,
            correo: "invitado1@gmail.com",
            clave: "invitado1234",
            perfil: "invitado",
            nombre: "Andrea",
          },
          {
            id: 7,
            correo: "invitado2@gmail.com",
            clave: "invitado1234",
            nombre: "Leo",
            perfil: "invitado",
          },
          {
            id: 8,
            correo: "invitado3@gmail.com",
            clave: "invitado1234",
            nombre: "Dayana",
          },
        ])
      );
    } catch (e) {
      console.log("error guardando en el storage" + e);
    }
  };
  const TraerData = async () => {
    try {
      const value = await AsyncStorage.getItem("Usuarios");
      if (value !== null) {
        setUsers(value);
        console.log("ya cargaron los usuarios!!!");
      }
    } catch (e) {
      console.log("error TRAYENDO en el storage" + e);
    }
  };

  const login = (values, actions = false) => {
    try {
      setLoading(true);
      authentication
        .signInWithEmailAndPassword(values.email, values.password)
        .then((_userCredentials) => {
          actions && actions.resetForm();
          setIsLogIn(true);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              Alert.alert("¡Ops!", "¡Usuario y/o Contraseña incorrectos!");
              break;
            case "auth/wrong-password":
              Alert.alert("¡Ops!", "¡Usuario y/o Contraseña incorrectos!");
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const onPressLogIn = (values) => {
    setLoading(true);
    if (TurboModuleRegistry) {
      setEmail_(values.email);
      setTimeout(() => {
        setIsLogIn(true);
        navigation.navigate("Home");
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 2000);
    }
    setEmail("");
    setPassword("");
  };
  const btnLogin = (bgColor, color, txtName, action) => {
    return (
      <TouchableOpacity
        style={{
          height: "40%",
          width: "100%",
          alignSelf: "center",
          justifyContent: "center",
          margin: 10,
          borderRadius: 20,
        }}
        onPress={() => {
          action();
        }}
      >
        <LinearGradient
          colors={[ColorsPPS.morado, ColorsPPS.azul]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            borderRadius: 20,
            borderColor: ColorsPPS.escarcha,
            borderWidth: 0.25,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: color,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {" "}
            {txtName}{" "}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const btnInvited = (number, txtName) => {
    const onpressInvited = (numero) => {
      /*setEmail_(`invitado${numero}@gmail.com`);
      setEmail(`invitado${numero}@gmail.com`);
      setPassword("invitado1234");
      setLoading(true);
      setTimeout(() => {
        setIsLogIn(true);
        navigation.navigate("Home");
        setEmail("");
        setPassword("");
        setLoading(false);
      }, 2500); */
      login({ email: `invitado${numero}@gmail.com`, password: "invitado1234" });
    };
    return (
      <TouchableOpacity
        style={{
          height: "40%",
          width: "30%",
          backgroundColor: "transparent",
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          margin: 5,
          borderRadius: 10,
          borderColor: ColorsPPS.escarcha,
          borderWidth: 0.5,
          flexDirection: "row",
        }}
        onPress={() => {
          onpressInvited(number);
        }}
      >
        <FontAwesome5
          name={
            (number == 1 && "user-secret") ||
            (number == 2 && "user-tie") ||
            (number == 3 && "user-ninja")
          }
          size={15}
          color={ColorsPPS.escarcha}
        />
        <Text
          style={{
            textAlign: "center",
            color: ColorsPPS.escarcha,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {" "}
          {txtName}{" "}
        </Text>
      </TouchableOpacity>
    );
  };

  const LoginValidation = yup.object({
    email: yup
      .string()
      .required("Ingresa tu correo electrónico")
      .email("El formato el email es invalido"),

    password: yup.string().required("Ingresa tu contraseña"),
  });

  const formLogin = () => {
    return (
      <Formik
        initialValues={{ email: email, password: "" }}
        validationSchema={LoginValidation}
        onSubmit={(values, actions) => {
          login(values, actions);
          actions.resetForm();
        }}
      >
        {(formikprops) => (
          <View style={{ margin: 10 }}>
            <Input
              placeholder="Correo Electrónico"
              placeholderTextColor={ColorsPPS.escarcha}
              style={{ width: "100%", padding: 5 }}
              inputContainerStyle={{
                borderColor: ColorsPPS.azul,

                borderRadius: 20,
                borderWidth: 1,
                width: "100%",
              }}
              inputStyle={{ color: ColorsPPS.azul }}
              leftIcon={
                <MaterialIcons
                  name="attach-email"
                  size={20}
                  color={ColorsPPS.azul}
                />
              }
              leftIconContainerStyle={{
                paddingLeft: 10,
              }}
              onChangeText={formikprops.handleChange("email")}
              onChange={(event) => setEmail(event.nativeEvent.text)}
              value={email}
              onBlur={formikprops.handleBlur("email")}
              defaultValue={email}
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {formikprops.touched.email && (
              <View style={styles.errorTextContainer}>
                <Text style={[styles.errorText]}>
                  {formikprops.touched.email && formikprops.errors.email}
                </Text>
              </View>
            )}
            <Input
              placeholder="Contraseña"
              placeholderTextColor={ColorsPPS.escarcha}
              style={{ width: "100%", padding: 5 }}
              inputContainerStyle={{
                borderColor: ColorsPPS.azul,

                borderRadius: 20,
                borderWidth: 1,
                width: "100%",
              }}
              leftIcon={
                <MaterialCommunityIcons
                  name="shield-key"
                  size={20}
                  color={ColorsPPS.azul}
                />
              }
              leftIconContainerStyle={{
                paddingLeft: 10,
              }}
              onChangeText={formikprops.handleChange("password")}
              onChange={(event) => setPassword(event.nativeEvent.text)}
              value={password}
              onBlur={formikprops.handleBlur("password")}
              defaultValue={password}
              name="password"
              secureTextEntry={hidePassword}
              rightIcon={
                <Ionicons
                  name={hidePassword ? "eye" : "eye-off"}
                  size={20}
                  color={ColorsPPS.azul}
                  onPress={() => {
                    setHidePassword(!hidePassword);
                  }}
                />
              }
              rightIconContainerStyle={{ paddingRight: 10 }}
            />
            {formikprops.touched.password && (
              <View style={styles.errorTextContainer}>
                <Text style={[styles.errorText]}>
                  {formikprops.touched.password && formikprops.errors.password}
                </Text>
              </View>
            )}

            <View
              style={{
                height: Dimensions.get("window").height * 0.15,
                width: "100%",
                justifyContent: "center",
              }}
            >
              {btnLogin(
                ColorsPPS.escarcha,
                ColorsPPS.escarcha,
                "Entrar",
                formikprops.handleSubmit
              )}
            </View>
          </View>
        )}
      </Formik>
    );
  };
  /*
<LoadingScreen message={'Trayendo tus productos...'} />
*/
  return loading ? (
    <LoadingScreen message={"Iniciando Sesión ... "} />
  ) : (
    <LinearGradient
      colors={[ColorsPPS.violeta, ColorsPPS.morado, ColorsPPS.oscuroSuave]}
      style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LinearGradient
        colors={[ColorsPPS.morado, ColorsPPS.azul]}
        style={{
          width: Dimensions.get("window").width * 0.8,
          height: Dimensions.get("window").height * 0.3,
          flex: 0.4,
          marginTop: 50,
          borderRadius: 20,
          height: "100%",
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "aqua",
          padding: 5,
        }}
      >
        <View
          style={{ width: "80%", height: "80%", flex: 1, alignSelf: "center" }}
        >
          <Image
            source={require("../assets/logos/iconlogo.png")}
            style={{ width: "100%", height: "100%", flex: 1 }}
          />
        </View>
      </LinearGradient>

      <View
        style={{
          marginVertical: 10,
          flex: 0.1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: ColorsPPS.azul,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {" "}
          AppChat{" "}
        </Text>
      </View>

      <View style={{ flex: 0.6, width: "100%", padding: 20 }}>
        {formLogin()}
      </View>

      <View
        style={{
          flex: 0.2,
          width: "100%",
          justifyContent: "space-around",
          flexDirection: "row",
          padding: 5,
        }}
      >
        {btnInvited(1, "Invitado 1")}
        {btnInvited(2, "Invitado 2")}
        {btnInvited(3, "Invitado 3")}
      </View>
      {
        <ModalLogin
          showModal={showModal}
          setShowModal={setShowModal}
          message={"Ups,El usuario no se encuentra registrado."}
        />
      }
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: ColorsPPS.escarcha,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
});
export default Login;
