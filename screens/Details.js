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
    


    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Text> {temperatura} </Text>
            <Text> {latitud} </Text>
            <Text> {longitud} </Text>

            <View style={styles.container}>
            <MapView style={styles.map}
            initialRegion={{
                latitude: -34.6132,
                longitude: -58.3772,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} 
            >
                <Marker
                    coordinate={{
                        latitude: -34.6132,
                        longitude: -58.3772
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
