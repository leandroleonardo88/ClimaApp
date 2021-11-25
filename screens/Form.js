import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';

const formularioScheme = Yup.object().shape({
    ciudad: Yup.string()
        .min(3, 'Minino 3 caracteres')
        .max(30, 'Maximo de caracteres superado')
        .trim('No debe contener espacion al inicio y final')
        .required('Campo obligatorio'),
    pais: Yup.string()
        .required('Campo obligatorio')

});

const Form = ({ navigation }) => {
    const [error, setError] = useState('')
    const [guardarStorage, setGuardarStorage] = useState([])

    const handleSubmit = async (values) => {
        setError("")
        try {
            let datosFormulario = []
            const value = await AsyncStorage.getItem('datosFormulario')
            if (value) {
                datosFormulario = JSON.parse(value)
                if (false) {
                    //return setError('Los datos ingresados estan duplicados.')
                } else {
                    datosFormulario.push(values)
                    const json_value = JSON.stringify(datosFormulario)
                    await AsyncStorage.setItem('datosFormulario', json_value)
                }
            } else {
                datosFormulario.push(values)
                const json_value = JSON.stringify(datosFormulario)
                await AsyncStorage.setItem('datosFormulario', json_value)
            }
        } catch (error) {
            AsyncStorage.removeItem('datosFormulario');
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.goBackIcon}
            >
                <MaterialCommunityIcons name="arrow-left" color={"black"} size={26}></MaterialCommunityIcons>
            </TouchableOpacity>
            <Formik
                initialValues={{ pais: '', ciudad: '' }}
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

export default Form

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