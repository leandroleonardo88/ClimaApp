import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { LinearGradient } from "expo-linear-gradient";

// <AnimatedLinearGradient
//     colors={["rgba(255,255,255, 0)", "rgba(255,255,255, 1)"]}
//     style={{ your styles go here }}/>

//const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Details = ({ navigation, route }) => {
    //console.log(route.params)
    const ciudad = route.params.ciudad
    const pais = route.params.pais
    console.log(ciudad)
    console.log(pais)

    //llamar a la API
    const appId = 'f3e0019459448698b2d30f3b5e803701';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log(url);
    
    const [temperatura, setTemperatura] = useState('')
    const [latitud, setLatitud] = useState(0)
    const [longitud, setLongitud] = useState(0)
    const [view, setView] = useState(false)

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
            <Text> {latitud} </Text>
            <Text> {longitud} </Text>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => { setView(true) }}
            >
                <Text style={styles.btnText}>Modal</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                onDismiss={() => console.log(`close`)}
                onShow={() => { latitud, longitud }}
                transparent
                visible={view}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(1,1,1,0.5)', justifyContent: "center", alignItems: "center" }}>
                    <View style={{ height: '70%', width: 350, backgroundColor: "#fff" }}>
                        <View style={{ height: 45, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                            <TouchableOpacity style={styles.btn} onPress={() => { setView(false) }}>
                                <MaterialCommunityIcons name="arrow-left" color={"black"} size={26}></MaterialCommunityIcons>
                            </TouchableOpacity>
                            <View>
                                <MapView style={styles.map}
                                    initialRegion={{
                                        latitude: latitud,
                                        longitude: longitud,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: latitud,
                                            longitude: longitud
                                        }}

                                    />
                                </MapView>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>


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
        marginTop: '150%'
      }, 
      fondo: {
          marginHorizontal: '100%',
          marginVertical: '100%',
      }
})
