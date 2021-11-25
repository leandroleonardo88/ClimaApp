import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home = ({ navigation }) => {

    const [datosStorage, setdatosStorage] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('datosFormulario')
            console.log(`jsonValue`, JSON.parse(jsonValue))
            setdatosStorage(JSON.parse(jsonValue))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={datosStorage}
                keyExtractor={item => item.ciudad}
                renderItem={({ item }) => (
                    <View style={styles.flatListContainer}>
                        <Text style={styles.textFlatList}>{item.ciudad}</Text>
                        <Text style={styles.textFlatList}>{item.pais}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                            <Text>Detalles</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Form')}>
                <Text>Agregar Ciudad</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#c7c7c7"
    },
    textFlatList: {
        marginVertical: 10,
        marginHorizontal: 30
    },
    flatListContainer: {
        marginVertical: 30
    }
})
