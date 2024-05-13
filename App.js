import React, { useCallback, useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Navbar from './screenComponents/Navbar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import GearFlatlist from './screenComponents/GearFlatlist';
import Result from './Result.js';
import SVGbckg from './screenComponents/SVGbckg';
import SubHeader from './screenComponents/subHeader';
import { subHeaderDecider, welcomeHeader } from "./assets/dataSrc/subHeaderProps.js"
import CombinationsScreen from './screens/combinationsScreen.js';
import { horizontalScale, verticalScale, moderateScale } from './Metric.js';


//Navigacia
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



//Obrazovka pri načítaní aplikácie
function CustomSplashScreen({ navigation }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 11000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  useEffect(() => {
    // Set a timeout to navigate to the "Choose" screen after 2 seconds
    const timeout = setTimeout(() => {
      // Navigate to the "Choose" screen with custom animation
      navigation.navigate('Welcome');
    }, 2000); // Adjust the duration as needed

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SVGbckg>
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>GearZ</Text>
        <View style={styles.imageWrapper}>
          <Animated.Image
            source={require("./assets/KolesoUpravene.png")}
            style={[styles.animatedImage, { transform: [{ rotate: spin }] }]}
          />
        </View>
      </View>
    </SVGbckg>

  )
}

//Úvodná obrazovka
function WelcomeScreen({ navigation }) {
  return (
    <SVGbckg>
      <Navbar />
      <SubHeader {...welcomeHeader} />
      <View style={styles.mainContent}>
        <View style={styles.welcomeWrapper}>
          <Text style={{ fontFamily: "SFUI-Text" }}>{welcomeHeader.text}</Text>
          <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate("Choose")}>
            <Text style={styles.submitBtnText}>Pokračuj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SVGbckg>
  )
}

//Obrazovka s výberom
function ChooseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SVGbckg>
        <Navbar navigation={navigation} />
        <SubHeader {...subHeaderDecider} />
        <View style={styles.mainContent}>
          <GearFlatlist navigation={navigation} />
        </View>
      </SVGbckg>
    </View>
  )
}

//Obrazovka s výberom kombinácie
function CombinationScreen({ route, navigation }) {
  const { title, desc } = route.params;

  return (
    <SVGbckg>
      <Navbar navigation={navigation} />
      <SubHeader title={title} desc={desc} />
      <View style={styles.mainContent}>
        <CombinationsScreen navigation={navigation} title={title} desc={desc} />
      </View>
    </SVGbckg>
  )
}

//Obrazovka s poľami pre zadávanie údajov
function ParamScreen({ route, navigation }) {
  // const { z1, z2, i, a, mn, beta, mk1, mk2, p, n1, n2 } = route.params;
  const { objects } = route.params;
  const { headerProps, params } = objects;

  //Objekt pre hodnoty inputov
  const [formData, setFormData] = useState({});
  //useState pre zmenu štýlov pri focuse
  const [focusedIndex, setFocusedIndex] = useState(null);
  //Kontrola, či je pole vyplnené
  const [filledIndexes, setFilledIndexes] = useState([]);
  //Handlovanie inputov
  const handleInputChange = (key, value) => {
    //Prevádzanie string inputu na číslo
    const numericValue = parseFloat(value);
    //záleží na predošlých hodnotých inputu
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: numericValue
    }))
  };

  const handleTextInputChange = (key, text, index) => {
    handleInputChange(key, text)
    if (text !== "" && !filledIndexes.includes(index)) {
      setFilledIndexes(prevIndexes => [...prevIndexes, index]); // Pridá iba jeden index, ak nie je už pridaný
    } else if (text === "" && filledIndexes.includes(index)) {
      setFilledIndexes(prevIndexes => prevIndexes.filter(i => i !== index)); // Odstráni idex, ak je už prítomný
    }
  };

  const renderInputFields = () => {
    return Object.entries(params).map(([key, value], index) => {

      if (value !== undefined && !(headerProps.title === "Priame Ozubenie" && key === "beta")) {
        return (
          <View style={styles.inputWrapper} key={key}>
            <Text style={[styles.inputTitle, focusedIndex === index && styles.focusedInputTitle, filledIndexes.includes(index) && styles.focusedInputTitle]}>{value}</Text>
            <TextInput
              style={[styles.input, focusedIndex === index && styles.focusedInput, filledIndexes.includes(index) && styles.focusedInput]}
              placeholder={String(0)}
              onFocus={() => setFocusedIndex(index)}
              keyboardType='numeric'
              onChangeText={(text) => handleTextInputChange(key, text, index)}
            />
          </View>
        );
      } else if (value !== undefined && headerProps.title === "Šikmé ozubenie") {
        return (
          <View style={styles.inputWrapper} key={key}>
            <Text style={[styles.inputTitle, focusedIndex === index && styles.focusedInputTitle, filledIndexes.includes(index) && styles.focusedInputTitle]}>{value}</Text>
            <TextInput
              style={[styles.input, focusedIndex === index && styles.focusedInput, filledIndexes.includes(index) && styles.focusedInput]}
              placeholder={String(0)}
              onFocus={() => setFocusedIndex(index)}
              keyboardType='numeric'
              onChangeText={(text) => handleTextInputChange(key, text, index)}
            />
          </View>
        );
      }
      else {
        return null;
      }
    });
  };


  const handleSubmit = () => {
    setFormData((prevFormData) => ({ ...prevFormData }));
    navigation.navigate("Results", { objects: { enteredParams: formData, headerProps: headerProps } });
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const filledParamsCount = Object.values(params).filter(value => value !== undefined).length;

  console.log(filledIndexes.length, filledParamsCount)
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <SVGbckg>
          <Navbar navigation={navigation} />
          <SubHeader title={headerProps.title} desc={"Zadajte vstupné parametre v základných jednotkách"} />
          <View style={styles.mainContentCombination}>
            <View style={styles.inputContainer}>
              <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                  {renderInputFields()}
                </KeyboardAvoidingView>
                <TouchableOpacity style={[
                  styles.submitBtn,
                  filledIndexes.length !== filledParamsCount && styles.disabledBtn,
                ]}
                  onPress={filledIndexes.length === filledParamsCount ? handleSubmit : null}
                  disabled={filledIndexes.length !== filledParamsCount}>
                  <Text style={styles.submitBtnText}>Vypočítaj</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </SVGbckg>
      </View>
    </TouchableWithoutFeedback>
  )
}

//Obrazovka s výsledkami bez korekcie
function ResultScreen({ route, navigation }) {
  const { objects } = route.params;
  const { headerProps, enteredParams } = objects;
  const [resultObj, setResultObj] = useState({})

  //Dôležité konštanty
  const c = 0.25;
  const w = 1;
  const alfa = 20;

  //!Helper funkcia na prevod reťazca na číslo a 3 desatinné miesta
  function pAndT(fn) {
    return parseFloat(parseFloat(fn).toFixed(4));
  }

  //*Prevod stupňov na radiany
  function convertToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  //* Prevod radianov na stupne 
  function convertToDegrees(radians) {
    return radians * (180 / Math.PI);
  }
  // //TODO
  // //* Prevod radianov na stupne a minuty
  // function radiansToDAndM(radians) {
  //   var degrees = radians * (180 / Math.PI);
  //   var minutes = (degrees - Math.floor(degrees)) * 60;
  //   return { degrees: Math.floor(degrees), minutes: minutes.toFixed(0) };
  // }
  // //*
  // function xdxd(radians){
  //   var result = radiansToDAndM(radians);
  //   return `${result.degrees}° ${result.minutes}'`
  // }


  //* Rozstupová kružnica -- m sa passuje bud mn alebo mt
  function d(z, m) {
    return parseFloat(z * m);
  }

  //* Hlavová kružnica --m sa passuje bud mn alebo mt
  function da(z, m, ha) {
    return z * m + (2 * ha)
  }

  //* Pätná kružnica --m sa passuje bud mn alebo mt
  function df(z, m, hf) {
    return z * m - (2 * hf)
  }

  //* Základná kružnica 
  function db(d, alfa) {
    return d * Math.cos(alfa)
  }

  //* Rozstup
  function a(d1, d2) {
    return (d1 + d2) / 2
  }
  //* Prevodový pomer 
  function i(z2, z1) {
    return z2 / z1;
  }
  //* Vyjadrenie z2 z prevodového pomeru
  function z2I(z1, i) {
    return z1 * i;
  }

  //* Vyjadrenie z1 z prevodového pomeru
  function z1I(z2, i) {
    return z2 / i;
  }

  //* Vyjadrenie i cez otáčky n1 a n2
  function in1n2(n1, n2) {
    return n1 / n2;
  }

  //* Vyjadrenie z1 z osovej vzd
  function az1(a, m, i) {
    return (2 * a) / (m * (1 + i));
  }

  //* Vyjadrenie uhla beta
  function uholBeta(z1, z2, a, mn) {
    return Math.acos((mn * (z1 + z2)) / (2 * a)) //! Math.acos vráti radiany, preto to treba previesť an stupne cez funkciu 
  }
  //* Evolventa
  function involute(alfa) {
    return Math.tan(alfa) - alfa
  }
  //* Uhol alfaawt
  function aw(z1, z2, mn, alfat, a, beta) {
    return Math.acos(((z1 + z2) * ((mn * Math.cos(alfat)) / (2 * a * Math.cos(beta)))))
  }
  //Použijeme, aby sa nám najprv vyplnil resultObj a až potom sa posielal ako props do komponentu
  //Ako dependency array použijeme enteredParams, lebo vždy ked sa prepíše vstupný paramater, tým sa zmení niečo v enteredParams a potom sa celý kod v hooku spustí znova
  useEffect(() => {
    if (headerProps.title === "Priame Ozubenie") {
      const mn = enteredParams.mn
      const calcAlfa = parseFloat(convertToRadians(20).toFixed(3));
      const beta = convertToRadians(0);
      //Nastavujem dočasný objekt resultov
      const tempResultObj = {
        c: c,
        w: w,
        alfa: alfa,
        mn: mn,
        ha: mn,
        hf: 1.25 * mn,
      }

      //Array, ktorú posielam do switchu
      const arr = Object.keys(enteredParams).sort().toString();

      switch (arr) {
        case "mn,z1,z2":
          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.p = pAndT(Math.PI * mn);
          tempResultObj.s = pAndT(tempResultObj.p / 2);
          tempResultObj.e = pAndT(tempResultObj.p / 2);
          tempResultObj.z1 = enteredParams.z1;
          tempResultObj.z2 = enteredParams.z2;
          tempResultObj.i = pAndT(i(tempResultObj.z2, tempResultObj.z1));
          tempResultObj.d1 = pAndT(d(enteredParams.z1, tempResultObj.mn));
          tempResultObj.d2 = pAndT(d(enteredParams.z2, tempResultObj.mn));
          tempResultObj.da1 = pAndT(da(tempResultObj.z1, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(tempResultObj.z2, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(tempResultObj.z1, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(tempResultObj.z2, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.dw1 = tempResultObj.d1;
          tempResultObj.dw2 = tempResultObj.d2;
          tempResultObj.a = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.aw = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.inva = pAndT(involute(calcAlfa));
          tempResultObj.invaw = pAndT(involute(calcAlfa));
          tempResultObj["alfaw"] = parseFloat(convertToDegrees(aw(enteredParams.z1, enteredParams.z2, mn, calcAlfa, tempResultObj.a, beta))).toFixed(0);


          break;
        case "i,mn,z1":
          i = enteredParams.i;
          z1 = enteredParams.z1;
          z2 = pAndT(z2I(z1, i))

          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.p = pAndT(Math.PI * mn);
          tempResultObj.s = pAndT(tempResultObj.p / 2);
          tempResultObj.e = pAndT(tempResultObj.p / 2);
          tempResultObj.z1 = enteredParams.z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = enteredParams.i;
          tempResultObj.d1 = pAndT(d(enteredParams.z1, tempResultObj.mn));
          tempResultObj.d2 = pAndT(d(z2, tempResultObj.mn));
          tempResultObj.da1 = pAndT(da(tempResultObj.z1, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(z2, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(tempResultObj.z1, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(z2, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.dw1 = tempResultObj.d1;
          tempResultObj.dw2 = tempResultObj.d2;
          tempResultObj.a = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.aw = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.inva = pAndT(involute(calcAlfa));
          tempResultObj.invaw = pAndT(involute(calcAlfa));
          tempResultObj["alfaw"] = parseFloat(convertToDegrees(aw(enteredParams.z1, z2, mn, calcAlfa, tempResultObj.a, beta))).toFixed(0);


          break;
        case "i,mn,z2":
          i = enteredParams.i;
          z2 = enteredParams.z2;
          z1 = pAndT(z1I(z2, i))

          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.p = pAndT(Math.PI * mn);
          tempResultObj.s = pAndT(tempResultObj.p / 2);
          tempResultObj.e = pAndT(tempResultObj.p / 2);
          tempResultObj.z1 = z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = enteredParams.i;
          tempResultObj.d1 = pAndT(d(z1, tempResultObj.mn));
          tempResultObj.d2 = pAndT(d(tempResultObj.z2, tempResultObj.mn));
          tempResultObj.da1 = pAndT(da(tempResultObj.z1, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(z2, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(tempResultObj.z1, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(z2, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.dw1 = tempResultObj.d1;
          tempResultObj.dw2 = tempResultObj.d2;
          tempResultObj.a = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.aw = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.inva = pAndT(involute(calcAlfa));
          tempResultObj.invaw = pAndT(involute(calcAlfa));
          tempResultObj["alfaw"] = parseFloat(convertToDegrees(aw(z1, enteredParams.z2, mn, calcAlfa, tempResultObj.a, beta))).toFixed(0);


          break;
        case "mn,n1,n2,z1":
          z1 = enteredParams.z1;
          n1 = enteredParams.n1;
          n2 = enteredParams.n2;
          i = pAndT(in1n2(n1, n2));
          z2 = pAndT(z2I(z1, i))

          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.p = pAndT(Math.PI * mn);
          tempResultObj.s = pAndT(tempResultObj.p / 2);
          tempResultObj.e = pAndT(tempResultObj.p / 2);
          tempResultObj.z1 = enteredParams.z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = i;
          tempResultObj.n1 = enteredParams.n1;
          tempResultObj.n2 = enteredParams.n2;
          tempResultObj.d1 = pAndT(d(enteredParams.z1, tempResultObj.mn));
          tempResultObj.d2 = pAndT(d(tempResultObjs.z2, tempResultObj.mn));
          tempResultObj.da1 = pAndT(da(tempResultObj.z1, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(tempResultObj.z2, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(tempResultObj.z1, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(tempResultObj.z2, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.dw1 = tempResultObj.d1;
          tempResultObj.dw2 = tempResultObj.d2;
          tempResultObj.a = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.aw = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.inva = pAndT(involute(calcAlfa));
          tempResultObj.invaw = pAndT(involute(calcAlfa));
          tempResultObj["alfaw"] = parseFloat(convertToDegrees(aw(enteredParams.z1, z2, mn, calcAlfa, tempResultObj.a, beta))).toFixed(0);

          break;
        case "a,i,mn":
          a = enteredParams.a;
          i = enteredParams.i;
          z1 = pAndT(az1(a, mt, i));
          z2 = pAndT(z2I(z1, i));

          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.p = pAndT(Math.PI * mn);
          tempResultObj.s = pAndT(tempResultObj.p / 2);
          tempResultObj.e = pAndT(tempResultObj.p / 2);
          tempResultObj.z1 = z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = i;
          tempResultObj.d1 = pAndT(d(z1, tempResultObj.mn));
          tempResultObj.d2 = pAndT(d(z2, tempResultObj.mn));
          tempResultObj.da1 = pAndT(da(z1, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(z2, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(z1, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(z2, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.dw1 = tempResultObj.d1;
          tempResultObj.dw2 = tempResultObj.d2;
          tempResultObj.a = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.aw = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.inva = pAndT(involute(calcAlfa));
          tempResultObj.invaw = pAndT(involute(calcAlfa));
          tempResultObj["alfaw"] = parseFloat(convertToDegrees(aw(z1, z2, mn, calcAlfa, tempResultObj.a, beta))).toFixed(0);
          

          break;
        case "a,mn,z1,z2":
          a = enteredParams.a;
          z1 = enteredParams.z1;
          z2 = enteredParams.z2;

          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.p = pAndT(Math.PI * mn);
          tempResultObj.s = pAndT(tempResultObj.p / 2);
          tempResultObj.e = pAndT(tempResultObj.p / 2);
          tempResultObj.z1 = z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = pAndT(i(tempResultObj.z2, tempResultObj.z1));
          tempResultObj.d1 = pAndT(d(z1, tempResultObj.mn));
          tempResultObj.d2 = pAndT(d(z2, tempResultObj.mn));
          tempResultObj.da1 = pAndT(da(z1, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(z2, tempResultObj.mn, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(z1, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(z2, tempResultObj.mn, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.dw1 = tempResultObj.d1;
          tempResultObj.dw2 = tempResultObj.d2;
          tempResultObj.a = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.aw = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.inva = pAndT(involute(calcAlfa));
          tempResultObj.invaw = pAndT(involute(calcAlfa));
          tempResultObj["alfaw"] = parseFloat(convertToDegrees(aw(enteredParams.z1, enteredParams.z2, mn, calcAlfa, a, beta))).toFixed(0);

          break;
      }

      setResultObj(tempResultObj);

    } else { //Šikmé ozubenie
      const calcAlfa = parseFloat(convertToRadians(20).toFixed(3));
      const beta = convertToRadians(enteredParams.beta);
      const mn = enteredParams.mn;
      const alfaT = Math.atan((Math.tan(calcAlfa) / Math.cos(beta)))
      //Nastavujem dočasný objekt resultov
      const tempResultObj = {
        c: c,
        w: w,
        alfa: alfa,
        beta: enteredParams.beta,
        mn: mn,
        ha: mn,
        hf: 1.25 * mn,
      }

      const arr = Object.keys(enteredParams).sort().toString();
      console.log((arr))
      switch (arr) {
        case "beta,mn,z1,z2":
          //?Základné parametre potrebné pre dalšie výpočty
          tempResultObj.at = pAndT(convertToDegrees(Math.atan((Math.tan(calcAlfa) / Math.cos(beta)))));
          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.mt = pAndT(mn / Math.cos(beta));
          tempResultObj.pt = pAndT(Math.PI * tempResultObj.mt);
          tempResultObj.st = pAndT(tempResultObj.pt / 2);
          tempResultObj.et = pAndT(tempResultObj.pt / 2);
          tempResultObj.z1 = pAndT(enteredParams.z1);
          tempResultObj.z2 = pAndT(enteredParams.z2);
          tempResultObj.i = pAndT(i(tempResultObj.z2, tempResultObj.z1));
          tempResultObj.d1 = pAndT(d(enteredParams.z1, tempResultObj.mt));
          tempResultObj.d2 = pAndT(d(enteredParams.z2, tempResultObj.mt));
          tempResultObj.da1 = pAndT(da(tempResultObj.z1, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(tempResultObj.z2, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(tempResultObj.z1, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(tempResultObj.z2, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, alfaT));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, alfaT));
          tempResultObj.dw1 = tempResultObj.d1;
          tempResultObj.dw2 = tempResultObj.d2;
          tempResultObj.a = pAndT(a(tempResultObj.d1, tempResultObj.d2));
          tempResultObj.aw = tempResultObj.a;
          tempResultObj.inva = pAndT(involute(alfaT));
          tempResultObj.invaw = pAndT(involute(alfaT));
          tempResultObj["alfaw"] = pAndT(convertToDegrees(aw(enteredParams.z1, enteredParams.z2, mn, alfaT, tempResultObj.a, beta)));

          break;
        case "beta,i,mn,z1":
          //?Základné parametre potrebné pre dalšie výpočty
          i = enteredParams.i;
          z1 = enteredParams.z1;
          z2 = pAndT(z2I(z1, i))

          //* Geometrické parametre
          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.mt = pAndT(mn / Math.cos(beta));
          tempResultObj.pt = pAndT(Math.PI * tempResultObj.mt);
          tempResultObj.st = pAndT(tempResultObj.pt / 2);
          tempResultObj.et = pAndT(tempResultObj.pt / 2);
          tempResultObj.z1 = z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = enteredParams.i;
          tempResultObj.d1 = pAndT(d(enteredParams.z1, tempResultObj.mt));
          tempResultObj.d2 = pAndT(d(tempResultObj.z2, tempResultObj.mt));
          tempResultObj.da1 = pAndT(da(tempResultObj.z1, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(tempResultObj.z2, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(tempResultObj.z1, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(tempResultObj.z2, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.a = pAndT(a(tempResultObj.db1, tempResultObj.db2));
          tempResultObj.aw = tempResultObj.a;
          tempResultObj.inva = pAndT(involute(alfaT));
          tempResultObj.invaw = pAndT(involute(alfaT));
          tempResultObj["alfaw"] = pAndT(convertToDegrees(aw(enteredParams.z1, z2, mn, alfaT, tempResultObj.a, beta)));

          break;
        case "beta,i,mn,z2":
          //?Základné parametre potrebné pre dalšie výpočty
          i = enteredParams.i;
          z2 = enteredParams.z2;
          z1 = pAndT(z1I(z2, i))

          //* Geometrické parametre
          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.mt = pAndT(mn / Math.cos(beta));
          tempResultObj.pt = pAndT(Math.PI * tempResultObj.mt);
          tempResultObj.st = pAndT(tempResultObj.pt / 2);
          tempResultObj.et = pAndT(tempResultObj.pt / 2);
          tempResultObj.z1 = z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = enteredParams.i;
          tempResultObj.d1 = pAndT(d(z1, tempResultObj.mt));
          tempResultObj.d2 = pAndT(d(tempResultObj.z2, tempResultObj.mt));
          tempResultObj.da1 = pAndT(da(tempResultObj.z1, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(tempResultObj.z2, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(tempResultObj.z1, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(tempResultObj.z2, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.a = pAndT(a(tempResultObj.db1, tempResultObj.db2));
          tempResultObj.aw = tempResultObj.a;
          tempResultObj.inva = pAndT(involute(alfaT));
          tempResultObj.invaw = pAndT(involute(alfaT));
          tempResultObj["alfaw"] = pAndT(convertToDegrees(aw(z1, enteredParams.z2, mn, alfaT, tempResultObj.a, beta)));



          break;
        case "beta,mn,n1,n2,z1":
          //?Základné parametre potrebné pre dalšie výpočty
          n1 = enteredParams.n1;
          n2 = enteredParams.n2;
          z1 = enteredParams.z1;
          i = pAndT(in1n2(n1, n2));
          z2 = pAndT(z2I(z1, i))

          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.mt = pAndT(mn / Math.cos(beta));
          tempResultObj.pt = pAndT(Math.PI * tempResultObj.mt);
          tempResultObj.st = pAndT(tempResultObj.pt / 2);
          tempResultObj.et = pAndT(tempResultObj.pt / 2);
          tempResultObj.z1 = enteredParams.z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = i;
          tempResultObj.n1 = enteredParams.n1;
          tempResultObj.n2 = enteredParams.n2;
          tempResultObj.d1 = pAndT(d(z1, tempResultObj.mt));
          tempResultObj.d2 = pAndT(d(tempResultObj.z2, tempResultObj.mt));
          tempResultObj.da1 = pAndT(da(tempResultObj.z1, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(tempResultObj.z2, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(tempResultObj.z1, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(tempResultObj.z2, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.a = pAndT(a(tempResultObj.db1, tempResultObj.db2));
          tempResultObj.aw = tempResultObj.a;
          tempResultObj.inva = pAndT(involute(alfaT));
          tempResultObj.invaw = pAndT(involute(alfaT));
          tempResultObj["alfaw"] = pAndT(convertToDegrees(aw(enteredParams.z1, z2, mn, alfaT, tempResultObj.a, beta)));



          break;
        case "a,beta,i,mn":
          //?Základné parametre potrebné pre dalšie výpočty
          a = enteredParams.a;
          i = enteredParams.i;
          mt = pAndT(mn / Math.cos(beta));
          z1 = pAndT(az1(a, mt, i));
          z2 = pAndT(z2I(z1, i));

          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.mt = mt;
          tempResultObj.pt = pAndT(Math.PI * mt);
          tempResultObj.st = pAndT(tempResultObj.pt / 2);
          tempResultObj.et = pAndT(tempResultObj.pt / 2);
          tempResultObj.z1 = z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = i;
          tempResultObj.d1 = pAndT(d(z1, mt));
          tempResultObj.d2 = pAndT(d(tempResultObj.z2, tempResultObj.mt));
          tempResultObj.da1 = pAndT(da(z1, mt, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(z2, mt, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(z1, mt, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(z2, mt, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.a = a;
          tempResultObj.aw = tempResultObj.a;
          tempResultObj.inva = pAndT(involute(alfaT));
          tempResultObj.invaw = pAndT(involute(alfaT));
          tempResultObj["alfaw"] = pAndT(convertToDegrees(aw(z1, z2, mn, alfaT, tempResultObj.a, beta)));


          break;
        case "a,mn,z1,z2":
          //?Základné parametre potrebné pre dalšie výpočty
          a = enteredParams.a;
          z1 = enteredParams.z1;
          z2 = enteredParams.z2;
          calcBeta = pAndT(uholBeta(z1, z2, a, tempResultObj.mn))

          tempResultObj.beta = pAndT(convertToDegrees(uholBeta(z1, z2, a, tempResultObj.mn)));


          tempResultObj.h = pAndT(tempResultObj.ha + tempResultObj.hf);
          tempResultObj.mt = pAndT(tempResultObj.mn / Math.cos(calcBeta));
          tempResultObj.pt = pAndT(Math.PI * tempResultObj.mt);
          tempResultObj.st = pAndT(tempResultObj.pt / 2);
          tempResultObj.et = pAndT(tempResultObj.pt / 2);
          tempResultObj.z1 = z1;
          tempResultObj.z2 = z2;
          tempResultObj.i = pAndT(i(z2, z1));
          tempResultObj.d1 = pAndT(d(z1, tempResultObj.mt));
          tempResultObj.d2 = pAndT(d(z2, tempResultObj.mt));
          tempResultObj.da1 = pAndT(da(z1, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.da2 = pAndT(da(z2, tempResultObj.mt, tempResultObj.ha));
          tempResultObj.df1 = pAndT(df(z1, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.df2 = pAndT(df(z2, tempResultObj.mt, tempResultObj.hf));
          tempResultObj.db1 = pAndT(db(tempResultObj.d1, calcAlfa));
          tempResultObj.db2 = pAndT(db(tempResultObj.d2, calcAlfa));
          tempResultObj.a = a;
          tempResultObj.aw = tempResultObj.a;
          tempResultObj.inva = pAndT(involute(alfaT));
          tempResultObj.invaw = pAndT(involute(alfaT));
          tempResultObj["alfaw"] = pAndT(convertToDegrees(aw(enteredParams.z1, enteredParams.z2, mn, alfaT, tempResultObj.a, calcBeta)));
          break;
      
        default:
          console.log("Error");
      }
      setResultObj(tempResultObj);
    }
  }, [enteredParams])

  // console.log(resultObj)
  return (
    <SVGbckg>
      <Navbar navigation={navigation} />
      <SubHeader title={headerProps.title} desc={"Parametre tohoto súkolesia sú bez korekcie. Ak chcete použiť korekcie, prejdite ďalej na korekcie."} />
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.submitBtnResult} onPress={() => navigation.navigate("Corection", { resultObj: resultObj, headerProps: headerProps })}>
          <Text style={styles.submitBtnText}>Korekcie</Text>
        </TouchableOpacity>
        <Result props={resultObj} />
      </View>
    </SVGbckg>
  )
}
//Obrazovka s výsledkami s korekciou
function CorectionScreen({ route, navigation }) {
  const { resultObj, headerProps } = route.params;
  const [finalObj, setFinalObj] = useState({ ...resultObj, x1: 0, x2: 0 })
  const [focusedIndex, setFocusedIndex] = useState(null)


  function pAndT(fn) {
    return parseFloat(parseFloat(fn).toFixed(4));
  }

  //* Prevod evolventnej hodnoty na stupne
  function calculateAngle(x) {
    const x1 = Math.pow(x, 1 / 3);
    const u = 1.440859 * x1 - 0.3660584 * x;

    // Prevod z radianov na stupne
    const angleInDegrees = u * (180 / Math.PI);
    return angleInDegrees;
  }

  //* Evolventa aw
  function invaw(alfa, x1, x2, z1, z2, inva) {
    return 2 * Math.tan(alfa) * ((x2 - x1) / (z2 - z1)) + inva
  }

  //*Prevod stupňov na radiany
  function convertToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  //* Prevod radianov na stupne 
  function convertToDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  const handleInputChange = (value, inputName) => {
    setFinalObj(prevState => ({
      ...prevState,
      [inputName]: value
    }));

    
    const x1 = parseFloat(value);
    const x2 = parseFloat(finalObj.x2); 
    let newDa1, newDa2, newDf1, newDf2, newS1, newS2, newE1, newE2, newDw1, newDw2, newInwAw, newAw, newAlfaW

    const beta = convertToRadians(resultObj.beta)
    const alfa = convertToRadians(resultObj.alfa)
    const alfan = convertToDegrees(20)
    if (headerProps.title === "Priame Ozubenie") {
      newDa1 = pAndT(resultObj.mn * (resultObj.z1 + 2 * resultObj.w + 2 * x1));
      newDa2 = pAndT(resultObj.mn * (resultObj.z2 + 2 * resultObj.w + 2 * x2));
      newDf1 = pAndT(resultObj.mn * (resultObj.z1 - 2 * resultObj.w - 2 * resultObj.c + 2 * x1));
      newDf2 = pAndT(resultObj.mn * (resultObj.z2 - 2 * resultObj.w - 2 * resultObj.c + 2 * x2));
      newS1 = pAndT(0.5 * Math.PI * resultObj.mn + 2 * x1 * resultObj.mn * Math.tan(alfan));
      newS2 = pAndT(0.5 * Math.PI * resultObj.mn + 2 * x2 * resultObj.mn * Math.tan(alfan));
      newE1 = pAndT(0.5 * Math.PI * resultObj.mn - 2 * x1 * resultObj.mn * Math.tan(alfan));
      newE2 = pAndT(0.5 * Math.PI * resultObj.mn - 2 * x2 * resultObj.mn * Math.tan(alfan));
      newInwAw = invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva)
      newAlfaW = pAndT(calculateAngle(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva)))
      newDw1 = pAndT(resultObj.d1 * (Math.cos(alfa) / Math.cos(convertToRadians(calculateAngle(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva))))));
      newDw2 = pAndT(resultObj.d2 * (Math.cos(alfa) / Math.cos(convertToRadians(calculateAngle(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva))))));
      newAw = pAndT(resultObj.a * (Math.cos(alfa) / Math.cos(convertToRadians(calculateAngle(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva))))));
    } else {
      newDa1 = pAndT(resultObj.mn * ((resultObj.z1 / Math.cos(beta)) + 2 * resultObj.w + 2 * x1))
      newDa2 = pAndT(resultObj.mn * ((resultObj.z2 / Math.cos(beta)) + 2 * resultObj.w + 2 * x2))
      newDf1 = pAndT(resultObj.mn * ((resultObj.z1 / Math.cos(beta)) - 2 * resultObj.w - 2 * resultObj.c + 2 * x1))
      newDf2 = pAndT(resultObj.mn * ((resultObj.z2 / Math.cos(beta)) - 2 * resultObj.w - 2 * resultObj.c + 2 * x2))
      newS1 = pAndT(((resultObj.mn) / Math.cos(beta)) * (0.5 * Math.PI + 2 * x1 * Math.tan(alfa)))
      newS2 = pAndT(((resultObj.mn) / Math.cos(beta)) * (0.5 * Math.PI + 2 * x2 * Math.tan(alfa)))
      newE1 = pAndT(((resultObj.mn) / Math.cos(beta)) * (0.5 * Math.PI - 2 * x1 * Math.tan(alfa)))
      newE2 = pAndT(((resultObj.mn) / Math.cos(beta)) * (0.5 * Math.PI - 2 * x2 * Math.tan(alfa)))
      newInwAw = pAndT(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva))
      newAlfaW = pAndT(calculateAngle(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva)))//uhol
      newDw1 = resultObj.d1 * pAndT((Math.cos(convertToRadians(resultObj.at)) / Math.cos(convertToRadians(calculateAngle(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva))))))
      newDw2 = resultObj.d2 * pAndT((Math.cos(convertToRadians(resultObj.at)) / Math.cos(convertToRadians(calculateAngle(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva))))))
      newAw = resultObj.a * pAndT((Math.cos(convertToRadians(resultObj.at)) / Math.cos(convertToRadians(calculateAngle(invaw(alfa, x1, x2, resultObj.z1, resultObj.z2, resultObj.inva))))))
    }

    setFinalObj(prevState => ({
      ...prevState,
      da1: newDa1,
      da2: newDa2,
      df1: newDf1,
      df2: newDf2,
      dw1: newDw1,
      dw2: newDw2,
      e1: newE1,
      e2: newE2,
      s1: newS1,
      s2: newS2,
      aw: newAw,
      invaw: newInwAw,
      ["alfaw"]: newAlfaW
    }));
  };

  delete finalObj.e
  delete finalObj.s
  console.log(finalObj);

  return (
    <SVGbckg>
      <Navbar navigation={navigation} />
      <SubHeader title={"Korekcia súkolesia"} desc={"Výsledné parametre súkolesia s korekciami"} style={{ marginTop: verticalScale(-50) }} />
      <View style={styles.mainContent}>
        <View style={styles.inputCorContainer}>
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputTitle, focusedIndex === 'x1' && styles.focusedInputTitle]}>X1</Text>
            <TextInput
              style={[styles.input, focusedIndex === 'x1' && styles.focusedInput]}
              placeholder="0"
              onFocus={() => setFocusedIndex("x1")}
              onChangeText={(value) => handleInputChange(value, 'x1')}
              value={finalObj.x1.toString()}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputTitle, focusedIndex === 'x1' && styles.focusedInputTitle]}>X2</Text>
            <TextInput
              style={[styles.input, focusedIndex === 'x2' && styles.focusedInput]}
              placeholder="0"
              onFocus={() => setFocusedIndex("x2")}
              onChangeText={(value) => handleInputChange(value, 'x2')}
              value={finalObj.x2.toString()}
            />
          </View>
        </View>
        <Result props={finalObj} />
      </View>
    </SVGbckg>
  )
}

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function App() {

  const [isLoaded] = useFonts({
    "mrt-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "mrt-black": require("./assets/fonts/Montserrat-Black.ttf"),
    "mrt-eb-italic": require("./assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    "SFUI-Text": require("./assets/fonts/SFUIText-Regular.ttf"),
    "SFUI-Text-b": require("./assets/fonts/SFUIText-Bold.ttf"),
    "SFUI-Text-semi": require("./assets/fonts/SFUIText-Semibold.ttf")
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    handleOnLayout();
  }, [handleOnLayout])

  if (!isLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={CustomSplashScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='Choose'
          component={ChooseScreen}
          options={{ headerShown: false, gestureDirection: "horizontal", gestureEnabled: true }}
        />
        <Stack.Screen
          name='Combinations'
          component={CombinationScreen}
          options={{ headerShown: false, gestureDirection: "horizontal", gestureEnabled: true }}
        />
        <Stack.Screen
          name='ParamEnter'
          component={ParamScreen}
          options={{ headerShown: false, gestureDirection: "horizontal", gestureEnabled: true }}
        />
        <Stack.Screen
          name='Results'
          component={ResultScreen}
          options={{ headerShown: false, gestureDirection: "horizontal", gestureEnabled: true }}
        />
        <Stack.Screen
          name='Corection'
          component={CorectionScreen}
          options={{ headerShown: false, gestureDirection: "horizontal", gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(3),
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20
  },
  mainContentCombination: {
    flex: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(10),
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(3),
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20
  },
  header: {
    marginVertical: verticalScale(30),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: moderateScale(20),
    fontFamily: "SFUI-Text-b",
    textTransform: "uppercase"
  },
  combItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: horizontalScale(250),
    height: verticalScale(66),
    marginBottom: verticalScale(30)
  },
  combItemNum: {
    fontSize: moderateScale(16),
    color: "#000",
    fontFamily: "SFUI-Text-b"
  },
  combItemBtn: {
    width: horizontalScale(217),
    height: verticalScale(66),
    borderRadius: moderateScale(25),
    paddingHorizontal: horizontalScale(33),
    paddingVertical: verticalScale(18),
    backgroundColor: "#405BFF",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  btnTextCont: {
    display: "flex",
    justifyContent: "center",

  },
  btnText: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(16) * 0.99,
    letterSpacing: moderateScale(16) * 0.05,
    fontFamily: "SFUI-Text-b",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  flatList: {
    width: horizontalScale(300),
    paddingHorizontal: horizontalScale(25),
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    backgroundColor: "#FFF",
    zIndex: 3,
  },
  input: {
    height: verticalScale(40),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: 'rgba(141, 141, 141, 0.49)',
    fontSize: moderateScale(15),
    fontFamily: "SFUI-Text-b",
    color: 'rgba(141, 141, 141, 0.49)'
  },
  focusedInput: {
    color: "#405BFF",
    borderBottomColor: "#405BFF"
  },
  focusedInputTitle: {
    color: "black"
  },
  inputTitle: {
    fontSize: moderateScale(16),
    fontFamily: "SFUI-Text-b",
    color: 'rgba(0, 0, 0, 0.49)',
    textTransform: "uppercase"
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: moderateScale(25),
    width: horizontalScale(300),
    paddingBottom: verticalScale(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20
  },
  inputWrapper: {
    width: horizontalScale(220),
    height: verticalScale(60),
    marginTop: verticalScale(30),
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  disabledBtn: {
    width: horizontalScale(250),
    height: verticalScale(52.61),
    borderRadius: moderateScale(25),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
    backgroundColor: "#8D8D8D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  submitBtn: {
    width: horizontalScale(250),
    height: verticalScale(52.61),
    borderRadius: moderateScale(25),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
    backgroundColor: "#405BFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  submitBtnResult: {
    width: horizontalScale(300),
    height: verticalScale(52.61),
    borderRadius: moderateScale(25),
    marginTop: verticalScale(-20),
    marginBottom: verticalScale(30),
    backgroundColor: "#405BFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  submitBtnText: {
    color: "#FFF",
    textTransform: "uppercase",
    fontSize: moderateScale(16),
    fontFamily: "SFUI-Text-b",
  },
  splashText: {
    fontFamily: "mrt-eb-italic",
    fontSize: moderateScale(48),
    letterSpacing: moderateScale(32) * 0.02,
    color: "#405BFF",
    zIndex: 3
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  imageWrapper: {
    height: verticalScale(37.5),
    overflow: "hidden"
  },
  animatedImage: {
    width: horizontalScale(75),
    height: verticalScale(60),
    marginTop: verticalScale(-35),
    resizeMode: "contain",
    shadowColor: '#000',
  },
  welcomeWrapper: {
    flexDirection: "column",
    width: horizontalScale(300),
    height: verticalScale(460),
    marginTop: verticalScale(-50),
    borderRadius: moderateScale(25),
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(50),
    paddingVertical: verticalScale(30),
    zIndex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "relative",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(3),
    },
    shadowOpacity: 0.27,
    shadowRadius: 5,
    elevation: 20
  },
  inputCorContainer: {
    backgroundColor: "#FFF",
    borderRadius: moderateScale(25),
    width: horizontalScale(300),
    marginTop: verticalScale(-40),
    marginBottom: verticalScale(20),
    paddingBottom: verticalScale(30),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20
  }
});


export default App;