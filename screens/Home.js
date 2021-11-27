import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({ navigation, route }) => {

    console.log(route.params)
    const contador = route.params
    console.log('contador',contador)

    const [datosStorage, setdatosStorage] = useState([])


    useEffect(() => {
        getData()
    }, [contador])
//guadar datos en memoria
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('datosFormulario')
            console.log(`jsonValue`, JSON.parse(jsonValue))
            setdatosStorage(JSON.parse(jsonValue))
            console.log('Esto se ejecuta')

        } catch (error) {
            console.log(error)
        }
        //guardarConsultar(false)
    }

    //Elimina las ciudades del state
    const eliminarCiudad = async (id) => {
        const ciudadesFiltradas = datosStorage.filter( datosStorage => datosStorage.id !== id );
        //setdatosStorage( (ciudadesActuales) => {
            //return ciudadesActuales.filter( ciudad => ciudad.id !== id);
            //})
        //console.log(datosStorage)
        setdatosStorage(ciudadesFiltradas);
        const json_value = JSON.stringify(ciudadesFiltradas)
        await AsyncStorage.setItem('datosFormulario', json_value)
        }

    return (
        <View style={styles.container}>
            
            <FlatList
                data={datosStorage}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.flatListContainer}>
                        <Text style={styles.textFlatList}>{item.ciudad}</Text>
                        <Text style={styles.textFlatList}>{item.pais}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                            <Text>Detalles</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => eliminarCiudad(item.id)}>
                            <Text>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Form')}>
                <Text>Agregar Ciudad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text>Acerca de Nosotros</Text>
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
