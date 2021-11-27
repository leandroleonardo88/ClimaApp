import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';


const formularioScheme = Yup.object().shape({
    ciudad: Yup.string()
        .min(3, 'Minino 3 caracteres')
        .max(30, 'Maximo de caracteres superado')
        .trim('No debe contener espacio al inicio y final')
        .required('Campo obligatorio'),
    pais: Yup.string()
        .required('Campo obligatorio')

});

var i = 1;

const Form = ({ navigation}) => {
    const [error, setError] = useState('')
    const [guardarStorage, setGuardarStorage] = useState([])

    const handleSubmit = async (values) => {
        setError("")

        //llamar a la API
        pais = values.pais;
        ciudad = values.ciudad;
        const appId = 'f3e0019459448698b2d30f3b5e803701';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log('verificacion de pais',resultado);
        
        if(resultado.cod === "404"){   
            
            mostrarAlertaNoHayResultado();

        } else {

            try {
                let datosFormulario = []
                const value = await AsyncStorage.getItem('datosFormulario')
                if (value) {
                    datosFormulario = JSON.parse(value)
                    if (datosFormulario.find((datosFormulario) => datosFormulario.ciudad.trim().toUpperCase() === values.ciudad.trim().toUpperCase()))
                    {
                        console.log('datos duplicados')
                        mostrarAlertaDuplicado();
                        return;
                        
                    } else {
                        const id = shortid.generate()
                        values.id = id
                        datosFormulario.push(values)
                        const json_value = JSON.stringify(datosFormulario)
                        await AsyncStorage.setItem('datosFormulario', json_value)
                        console.log('datosFormulario 1', json_value)
                    }
                } else {
                    const id = shortid.generate()
                    values.id = id
                    datosFormulario.push(values)
                    const json_value = JSON.stringify(datosFormulario)
                    await AsyncStorage.setItem('datosFormulario', json_value)
                    console.log('datosFormulario 2', json_value)
                }
            } catch (error) {
                AsyncStorage.removeItem('datosFormulario');
                console.log(error)
            }
            
        }

    }

    //Alerta por si se ingresa una ciudad ya existente
    const mostrarAlertaDuplicado = () => {
        Alert.alert(
          'Cuidado',
          'Esta ciudad ya ha sido ingresada, intenta con una otra',
          [{ text: 'Entendido'}]
        )
      }

      //Alerta por si se ingresa una ciudad ya existente
    const mostrarAlertaNoHayResultado = () => {
        Alert.alert(
          'Cuidado',
          'No hay resultados para esta ciudad, intenta con otra',
          [{ text: 'Entendido'}]
        )
      }


    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home', i=i++)}
                style={styles.goBackIcon}
            >
                <MaterialCommunityIcons name="arrow-left" color={"black"} size={26}></MaterialCommunityIcons>
            </TouchableOpacity>
            <Formik
                initialValues={{ pais: '', ciudad: '', id: '' }}
                validationSchema={formularioScheme}
                onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <Picker
                            style={styles.picker}
                            mode={"dialog"}
                            selectedValue={values.pais}
                            onValueChange={handleChange('pais')}
                        >
                            <Picker.Item label="Seleccione un país" value="" />
                            <Picker.Item label="Argentina" value="AR" />
                            <Picker.Item label="Brasil" value="BR" />
                            <Picker.Item label="Colombia" value="CO" />
                            <Picker.Item label="Chile" value="CL" />
                            <Picker.Item label="España" value="ES" />
                            <Picker.Item label="Francia" value="FR" />
                            <Picker.Item label="Alemania" value="DE" />
                            <Picker.Item label="Rusia" value="RU" />
                            <Picker.Item label="Italia" value="IT" />
                            <Picker.Item label="Emiratos Arabes" value="AE" />
                        </Picker>
                        {errors.pais && touched.pais ? (
                            <Text>{errors.pais}</Text>
                        ) : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Ingrese la ciudad"
                            placeholderTextColor="#666"
                            onChangeText={handleChange('ciudad')}
                            onBlur={handleBlur('ciudad')}
                            value={values.ciudad}
                        />
                        {errors.ciudad && touched.ciudad ? (
                            <Text>{errors.ciudad}</Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.btnGuardar}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.btnTexto}>Guardar Ciudad</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
        
    )
}
const ocultarTeclado = () => {
    Keyboard.dismiss();

return (
    <>
    <TouchableWithoutFeedback onPress={ () => ocultarTeclado}></TouchableWithoutFeedback>
    </>
);
};

export default Form;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    picker: {
        height: 50,
        backgroundColor: "#e3e3e3",
        color: "black",
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: "#e3e3e3",
        fontSize: 15,
        marginVertical: 50,
        marginHorizontal: 20,
        bottom: 30,
        textAlign: "center",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    goBackIcon: {
        display: "flex",
        position: "absolute",
        top: 30,
        left: 10
    },
    btnGuardar: {
        alignItems: "center",
        backgroundColor: "#e3e3e3",
        marginHorizontal: 80,
        height: 30,
        borderRadius: 20,
        bottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    btnTexto: {
        top: 5,
        alignItems: "center",
    },
    faltlist: {
        display: "flex",
        position: "absolute",
        top: 60,
        right: 150
    },
});