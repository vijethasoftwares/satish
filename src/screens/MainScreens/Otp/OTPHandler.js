import React, { useState, useRef } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput, 
} from 'react-native';

export default function OTPInputView(props) {

    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();

    const [OTP, setOTP] = React.useState([]);

    let validateOTP = (otp) => {
        otp = otp.join('')
        // alert(otp+" Validated.")
        if(otp.length == 6) {
            props.verifyOTP(otp)
        }
    }


    let handleOTPInput = (index, value) => {
        let temp_otp = OTP;
        if(index == 0) {
            if(value != '')
                ref_input1.current.focus()
            temp_otp[index] = value;
            setOTP(temp_otp)
            validateOTP(temp_otp);
        }
        if(index == 1) {
            if(value != '')
                ref_input2.current.focus()
            temp_otp[index] = value;
            setOTP(temp_otp)
            validateOTP(temp_otp);
        }
        if(index == 2) {
            if(value != '')
                ref_input3.current.focus()
            temp_otp[index] = value;
            setOTP(temp_otp)
            validateOTP(temp_otp);
        }
        if(index == 3) {
            if(value != '')
                ref_input4.current.focus()
            temp_otp[index] = value;
            setOTP(temp_otp)
            validateOTP(temp_otp);
        }
        if(index == 4) {
            if(value != '')
                ref_input5.current.focus()
            temp_otp[index] = value;
            setOTP(temp_otp)
            validateOTP(temp_otp);
        }
        if(index == 5) {
            if(value != '')
                ref_input6.current.focus()
            temp_otp[index] = value;
            setOTP(temp_otp)
            validateOTP(temp_otp);
        }
    }
    return (
        <SafeAreaView>
            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{width: '12%', paddingVertical: 5, borderColor: '#aaa', borderBottomWidth: 1}}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        maxLength={1}
                        autoFocus={true}
                        returnKeyType="next"
                        onChangeText={(value) => {handleOTPInput(0, value)}}
                        placeholder=""
                        keyboardType="numeric"
                        ref={ref_input6}
                    />
                </View>
                <View style={{width: '12%', paddingVertical: 5, borderColor: '#aaa', borderBottomWidth: 1}}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        maxLength={1}
                        autoFocus={true}
                        returnKeyType="next"
                        onChangeText={(value) => {handleOTPInput(1, value)}}
                        placeholder=""
                        keyboardType="numeric"
                        ref={ref_input1}
                    />
                </View>
                <View style={{width: '12%', paddingVertical: 5, borderColor: '#aaa', borderBottomWidth: 1}}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        maxLength={1}
                        autoFocus={true}
                        returnKeyType="next"
                        onChangeText={(value) => {handleOTPInput(2, value)}}
                        placeholder=""
                        keyboardType="numeric"
                        ref={ref_input2}
                    />
                </View>
                <View style={{width: '12%', paddingVertical: 5, borderColor: '#aaa', borderBottomWidth: 1}}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        maxLength={1}
                        autoFocus={true}
                        returnKeyType="next"
                        onChangeText={(value) => {handleOTPInput(3, value)}}
                        placeholder=""
                        keyboardType="numeric"
                        ref={ref_input3}
                    />
                </View>
                <View style={{width: '12%', paddingVertical: 5, borderColor: '#aaa', borderBottomWidth: 1}}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        maxLength={1}
                        autoFocus={true}
                        returnKeyType="next"
                        onChangeText={(value) => {handleOTPInput(4, value)}}
                        placeholder=""
                        keyboardType="numeric"
                        ref={ref_input4}
                    />
                </View>
                <View style={{width: '12%', paddingVertical: 5, borderColor: '#aaa', borderBottomWidth: 1}}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        maxLength={1}
                        autoFocus={true}
                        returnKeyType="next"
                        onChangeText={(value) => {handleOTPInput(5, value)}}
                        placeholder=""
                        keyboardType="numeric"
                        ref={ref_input5}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    input: {
        textAlign: 'center'
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});