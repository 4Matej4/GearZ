import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { verticalScale, moderateScale, horizontalScale } from '../Metric';
import { Path, Svg } from 'react-native-svg';

const Navbar = ({ children, style, navigation }) => {

  return (
    <View style={styles.navbar}>
      {navigation ? <TouchableOpacity style={styles.navIcon}>
        <Svg
          width={"30"}
          height={"30"}
          viewBox='0 0 30 30'
        >
          <Path
            fill={"none"}
            stroke={"#405BFF"}
            strokeWidth={"2"}
            strokeLinejoin='round'
            strokeLinecap='round'
            d='M15 13.75V20M15 26.25C8.7868 26.25 3.75 21.2132 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15C26.25 21.2132 21.2132 26.25 15 26.25ZM15.0623 10V10.125L14.9377 10.1252V10H15.0623Z'
          />
        </Svg>
      </TouchableOpacity> : <TouchableOpacity>
        <Svg
          width={"30"}
          height={"30"}
          viewBox='0 0 30 30'
        >
        </Svg>
      </TouchableOpacity>}
      <Text style={styles.navbarText}>GearZ</Text>
      {navigation ?
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate("Choose")}>
          <Svg
            width={"30"}
            height={"30"}
            viewBox='0 0 30 30'
          >
            <Path
              fill={"none"}
              stroke={"#405BFF"}
              strokeWidth={"2"}
              strokeLinejoin='round'
              strokeLinecap='round'
              d='M15 18.75L18.75 15M18.75 15L15 11.25M18.75 15H5M5 9.06003V9.00024C5 7.60011 5 6.89953 5.27248 6.36475C5.51217 5.89434 5.89434 5.51217 6.36475 5.27248C6.89953 5 7.60011 5 9.00024 5H21.0002C22.4004 5 23.0995 5 23.6342 5.27248C24.1046 5.51217 24.4881 5.89434 24.7278 6.36475C25 6.899 25 7.59874 25 8.99614V21.0045C25 22.4019 25 23.1006 24.7278 23.6349C24.4881 24.1053 24.1046 24.4881 23.6342 24.7278C23.1 25 22.4013 25 21.0039 25H8.99614C7.59874 25 6.899 25 6.36475 24.7278C5.89434 24.4881 5.51217 24.1049 5.27248 23.6345C5 23.0997 5 22.4001 5 21V20.9375'
            />
          </Svg>
        </TouchableOpacity> : <TouchableOpacity style={styles.navIcon}>
          <Svg
            width={"30"}
            height={"30"}
            viewBox='0 0 30 30'
          >
          </Svg>
        </TouchableOpacity>}
    </View>)
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    width: "100%",
    paddingTop: verticalScale(20),
    paddingHorizontal: horizontalScale(8),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  navbarText: {
    fontFamily: "mrt-eb-italic",
    fontSize: moderateScale(32),
    letterSpacing: moderateScale(32) * 0.02,
    color: "#405BFF",
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: horizontalScale(30),
    height: verticalScale(30),

  },
  icon: {
    width: horizontalScale(30),
    height: verticalScale(30),
    resizeMode: "contain"
  },
})

export default Navbar;