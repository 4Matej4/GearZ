import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale, horizontalScale } from '../Metric';


const SubHeader = ({ children , title, desc, style}) => {
    return (
        <View style={[styles.textContent, style]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{desc}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    textContent: {
        flex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    title: {
        fontFamily: "mrt-black",
        fontSize: moderateScale(40),
        color: "#405BFF",
        lineHeight: moderateScale(40) * 1,
        paddingTop: verticalScale(12),
        width: horizontalScale(300),
        textTransform: "uppercase",
        letterSpacing: moderateScale(40) * 0.02
    },
    text: {
        fontFamily: "SFUI-Text",
        fontSize: moderateScale(12),
        width: verticalScale(300),
        textAlign: "justify"
    },
})

export default SubHeader;
