import React from 'react';
import { FlatList, Text, View, StyleSheet, ScrollView } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from './Metric';

const Result = ({ props }) => {
    return (
        <View style={styles.mainContent}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View  style={styles.headerRow}>
                    <Text style={styles.headerText}>Parameter</Text>
                    <View style={styles.gap}></View>
                    <Text style={styles.headerText}>Hodnota</Text>
                </View>
                {Object.entries(props).map(([key, value]) => {
                    return (
                        <View key={key} style={styles.row}>
                            <Text style={styles.cell}>{key}</Text>
                            {/* <View style={styles.gapp}></View> */}
                            <Text style={styles.cell}>{value}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: horizontalScale(300),
        paddingVertical: verticalScale(39),
        paddingHorizontal: horizontalScale(27),
        backgroundColor: "#FFF",
        borderTopLeftRadius: moderateScale(25),
        borderTopRightRadius: moderateScale(25),
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {
            width: horizontalScale(0),
            height: verticalScale(3),
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20
    },
    scrollView: {
        width: horizontalScale(250),
        borderTopLeftRadius: moderateScale(4),
        borderTopRightRadius: moderateScale(4)
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: verticalScale(13),
        borderBottomColor: "#405BFF",
        borderBottomWidth: moderateScale(1),
    },
    cell: {
        flex: 1,
        textAlign: "center",
        borderColor: "#405BFF",
        fontFamily: "SFUI-Text-b",
        textTransform: "uppercase",
        color: "#405BFF",
        fontSize: moderateScale(10)
    },  
    headerRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: horizontalScale(250),
        height: verticalScale(46),
        backgroundColor: "#405BFF",
    },
    headerText: {
        flex: 1,
        color: "#FFFFFF",
        fontFamily: "SFUI-Text-semi",
        fontSize: moderateScale(10),
        lineHeight: moderateScale(10) * 1.3,
        textTransform: "uppercase",
        textAlign: "center"
    },
    gap: {
        width: horizontalScale(2),
        height: "100%",
        backgroundColor: "#FFF",
    },
    gapp: {
        width: horizontalScale(1),
        height: verticalScale(36),
        backgroundColor: "#405BFF",
    }
})

export default Result;