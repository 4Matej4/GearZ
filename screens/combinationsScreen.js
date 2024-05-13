import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Modal } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { paramDefinitions } from '../assets/dataSrc/decideOzubenia';
import { paramComb } from '../assets/dataSrc/decideOzubenia';
import { verticalScale, horizontalScale, moderateScale } from '../Metric';

const CombinationsScreen = ({ navigation, title, desc }) => {
    const headerProps = {
        title: title,
        desc: desc
    }


    const generateParams = (item, title) => {
        const params = {
            z1: item.z1,
            z2: item.z2,
            mn: item.mn,
            beta: item.beta,
            i: item.i,
            n1: item.n1,
            n2: item.n2,
            a: item.a,
            mk1: item.mk1,
            mk2: item.mk2,
            p: item.p,
            w: item.w,
            c: item.c
        };

        // Ak je titul "Priame Ozubenie", vynecha beta a combinationId
        if (title === "Priame Ozubenie") {
            delete params.beta;
            delete params.combinationId;

        }
        // Ak je titul "Šikmé Ozubenie", vynecha combinationId
        else if (title === "Šikmé Ozubenie") {
            delete params.combinationId;

        }

        return params;
    }

    const [modalVisible, setModalVisible] = useState(false); //Modal skyrť zobraziť
    const onPressIcon = () => setModalVisible(!modalVisible);

    //Načítanie objektu s definiciami parametrov, resp. jeho klúče
    const definitionsKeys = Object.keys(paramDefinitions)
    const arrToPrint = definitionsKeys.map((key) => [key, paramDefinitions[key]]) //Vráti mi pole s polamy, čiže kluč objektu a hodnotu k prislušnemu kluču


    return (
        <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.combinationId}
            data={paramComb}
            ListHeaderComponent={() => (
                <View style={styles.header}>
                    <Modal animationType='slide' transparent={true} visible={modalVisible}>
                        <View style={styles.modalWindow}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Parametre:</Text>
                                <TouchableOpacity onPress={onPressIcon}>
                                    <Svg
                                        height="30"
                                        width="30"
                                        viewBox={`0 0 30 30`}
                                    >
                                        <Path
                                            fill={"none"}
                                            stroke={"#405BFF"}
                                            strokeWidth={"2.5"}
                                            d='M6 18 17.94 6M18 18 6.06 6'
                                        />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <View>
                                {arrToPrint.map(([key, value]) => (
                                    <View style={{marginTop: key === "z1" ? 0 : verticalScale(6)}} key={key}>
                                        <Text style={{fontFamily: "SFUI-Text-b", fontSize: moderateScale(14), textTransform: "uppercase"}}>{key}</Text>  
                                        <Text style={{fontFamily: "SFUI-Text", fontSize: moderateScale(12)}}>{value}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </Modal>
                    <Text style={styles.headerText}>kombinácie:</Text>
                    <TouchableOpacity onPress={onPressIcon}>
                        <Svg
                            height="30"
                            width="30"
                            viewBox={`0 0 30 30`}
                        >
                            <Path
                                fill={"none"}
                                stroke={"#405BFF"}
                                strokeWidth={"2.5"}
                                d='M11.25 26.25H18.75M15 3.75C10.8579 3.75 7.5 7.10786 7.5 11.25C7.5 12.7681 7.95105 14.1809 8.72646 15.3616C9.91884 17.1773 10.5145 18.0845 10.5919 18.2201C11.2804 19.4263 11.1536 19.0009 11.2402 20.387C11.25 20.5428 11.25 20.7786 11.25 21.25C11.25 21.9404 11.8096 22.5 12.5 22.5L17.5 22.5C18.1904 22.5 18.75 21.9404 18.75 21.25C18.75 20.7786 18.75 20.5428 18.7597 20.387C18.8464 19.0009 18.7189 19.4263 19.4073 18.2201C19.4847 18.0845 20.0814 17.1773 21.2738 15.3616C22.0492 14.1809 22.5003 12.7681 22.5003 11.25C22.5003 7.10786 19.1421 3.75 15 3.75Z'
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            )}
            renderItem={({ item, index }) => {
                const params = generateParams(item, headerProps.title);
                const arr = Object.keys(params).map((key) => [key, params[key]]);
                const filteredArray = arr.filter(([key, value]) => value !== undefined);

                return (
                    <View style={styles.combItem} key={item.id}>
                        <Text style={styles.combItemNum}>{item.combinationId}.</Text>
                        <TouchableOpacity style={styles.combItemBtn} onPress={() => navigation.navigate("ParamEnter", { objects: { params: params, headerProps: headerProps } })}>
                            {filteredArray.map(([key, value], index) => (
                                <View style={styles.btnTextCont} key={index}>
                                    <Text style={styles.btnText}>{value}{index === filteredArray.length - 1 ? "" : ","}</Text>
                                </View>
                            ))}
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
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
        letterSpacing: moderateScale(16) * 0.001,
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
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {
            width: horizontalScale(0),
            height: verticalScale(3),
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20
    },
    modalWindow: {
        width: horizontalScale(300),
        height: verticalScale(600),
        backgroundColor: "#FFF",
        display: "flex",
        paddingHorizontal: horizontalScale(30),
        marginTop: verticalScale(310),
        marginLeft: "12%",
        marginVertical: verticalScale(25),
        borderRadius: moderateScale(25),
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {
            width: horizontalScale(0),
            height: verticalScale(3),
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20
    },
    modalHeaderWrapper: {
        marginVertical: verticalScale(30),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})

export default CombinationsScreen;
