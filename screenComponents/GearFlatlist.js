import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { moderateScale, verticalScale, horizontalScale } from '../Metric';

import {ozubenia} from "../assets/dataSrc/decideOzubenia.js"


const GearFlatlist = ({ style, navigation }) => {
    return (<FlatList
        style={styles.flatList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        keyExtractor={(ozubenie) => ozubenie.title}
        data={ozubenia}
        renderItem={({ item, index }) => {

            const firstItem = index === 0;
            const lastItem = index === ozubenia.length - 1;

            const params = {
                title: item.title,
                desc: item.description,
            };
            let imageSource;
            if (item.title === "Priame Ozubenie"){
                imageSource = require('../assets/POZ.png')
            } else{
                imageSource = require('../assets/SOZ.png')
            }
            return (
                <View style={[styles.pickWrapper, firstItem && { marginLeft: horizontalScale(46.5) }, lastItem && { marginRight: horizontalScale(46.5), marginLeft: horizontalScale(26.5) }]}>
                    <View style={styles.pickerCircle}>
                        <Image source={imageSource} style={styles.image} resizeMode="contain" />
                    </View>
                    <View style={styles.pickerContent}>
                        <Text style={styles.pickerContenth2}>Výber ozubenia</Text>
                        <Text style={styles.pickerContenth1}>{item.title}</Text>
                        <Text style={styles.pickerContentText}>{item.description}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Combinations", params)} style={styles.button}>
                            <Text style={styles.buttonText}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }}
    />)
};

const styles = StyleSheet.create({
    flatList: {
        width: "100%",
        zIndex: 4,
        paddingVertical: verticalScale(10),
    },
    pickWrapper: {
        flexDirection: "column",
        width: horizontalScale(300),
        height: verticalScale(450),
        marginTop: verticalScale(10),
        zIndex: 2,
        alignItems: "center",
        justifyContent: "flex-end",
        position: "relative",
        shadowColor: "#000",
        shadowOffset: {
            width: horizontalScale(0),
            height: verticalScale(3),
        },
        shadowOpacity: 0.27,
        shadowRadius: 5,
    },
    pickerCircle: {
        width: horizontalScale(135),
        height: verticalScale(135),
        backgroundColor: "white",
        borderRadius: moderateScale(100),
        zIndex: 2,
        position: "absolute",
        top: 0,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: horizontalScale(0),
            height: verticalScale(3),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 20,
    },
    pickerContent: {
        backgroundColor: "white",
        width: horizontalScale(300),
        height: verticalScale(382.55),
        borderRadius: moderateScale(25),
        paddingHorizontal: horizontalScale(30),
        display: "flex",
        alignItems: "center",
        elevation: 18
    },
    pickerContenth2: {
        marginTop: verticalScale(80),
        color: "#405BFF",
        fontFamily: "SFUI-Text-b",
        textTransform: "uppercase",
        fontSize: moderateScale(12)
    },
    pickerContenth1: {
        fontFamily: "SFUI-Text-b",
        marginTop: verticalScale(18),
        fontSize: moderateScale(36),
        paddingTop: verticalScale(20),
        lineHeight: moderateScale(30),
        textAlign: "center"
    },
    pickerContentText: {
        marginTop: verticalScale(18),
        color: "#8D8D8D",
        textAlign: "justify",
        paddingHorizontal: horizontalScale(5),
        fontSize: moderateScale(12)
    },
    button: {
        width: horizontalScale(250),
        height: verticalScale(52.35),
        marginTop: horizontalScale(18),
        backgroundColor: "#405BFF",
        borderRadius: moderateScale(25),
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        textTransform: "uppercase",
        color: "#FFFFFF",
        fontFamily: "SFUI-Text-b",
        fontSize: moderateScale(16)
    },
});

export default GearFlatlist;