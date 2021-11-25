import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'


const DescriptionApp = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Description Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <Text>Empezar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DescriptionApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c7c7c7"
    }
})
