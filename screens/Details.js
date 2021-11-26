import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';


const Details = ({ navigation, route }) => {
    //console.log(route.params)
    const ciudad = route.params.ciudad
    const pais = route.params.pais
    console.log(ciudad)
    console.log(pais)

    const appId = 'f3e0019459448698b2d30f3b5e803701';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log(url);
    
    const [temperatura, setTemperatura] = useState('')
    const [latitud, setLatitud] = useState('')
    const [longitud, setLongitud] = useState('')
    fetch(url, {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((responseJson) => {
            setTemperatura(responseJson.main.temp)
            setLatitud(responseJson.coord.lat)
            setLongitud(responseJson.coord.lon)
        })

    // fetch(url)
    //         .then(response => response.json())
    //         .then(data => mostrarData(data));

    // const mostrarData = (data) => {
    //     console.log(data.main.temp)
    //     const temperatura = data.main.temp
    // }
    
    const latitudNumero = Number(latitud);
    const longitudNumero = Number(longitud);

    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Text> {temperatura} </Text>
            <Text> {latitud} {Number(latitud)} {latitudNumero}</Text>
            <Text> {longitud} {Number(longitud)}</Text>

            <View>
            <MapView style={styles.map}
            initialRegion={{
                latitude: latitudNumero+Number(latitud),
                longitude: longitudNumero,
                latitudeDelta: 20,
                longitudeDelta: 20,
            }} 
            >
                <Marker
                    coordinate={{
                        latitude: Number(latitud),
                        longitude: Number(longitud)
                    }}
                
                />
            </MapView>
            </View>   


            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.btnText}>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c7c7c7"
    },
    btn: {
        backgroundColor: "blue",

    },
    btnText: {
        color: "white"
    },
    map: {
        width: 300,
        height: 300,
      }, 
})
