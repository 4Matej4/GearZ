import React from 'react'
import { View, StyleSheet} from 'react-native'

const MainContent = ({children, props}) => {
  return (
    <View style={styles.mainContent}>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
})

export default MainContent