import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import SyncStorage from 'sync-storage';
import icons from '../../../assets/icons';
import Colors from '../../../assets/Theme/Colors';
import Responsive from '../../../assets/Theme/Responsive';
import FontSize from '../../../assets/Theme/FontSize';
import CustomsButtons from '../../../Component/CustomsButtons';
import navigationStrings from '../../../assets/Theme/navigationStrings';

const AddTime = (props) => {
    let Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const InitialTimeArr = [{
        id: 1,
        text: '8:30 - 9:30',
        start_time: '08:30',
        end_time: '09:30',
    }, {
        id: 2,
        text: '9:30 - 10:30',
        start_time: '09:30',
        end_time: '10:30',
    }]

    const InitialSelectTime = {
        id: 1,
        text: '8:30 - 9:30',
        start_time: '08:30',
        end_time: '09:30',
    };
    const [timeArr, setTimeAdd] = useState(InitialTimeArr);
    const [meridium, setMeridium] = useState(SyncStorage.get('_laundry_scheduled_time_')?.meridium ? SyncStorage.get('_laundry_scheduled_time_')?.meridium : 'AM');
    const [dateArr, setDateAdd] = useState([]);
    const [SelectedDate, setSelectedDate] = useState(SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate ? SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate : {});
    const [SelectedTime, setSelectedTime] = useState(SyncStorage.get('_laundry_scheduled_time_')?.SelectedTime ? SyncStorage.get('_laundry_scheduled_time_')?.SelectedTime : InitialSelectTime);

    useEffect(() => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dates = [];

        days.forEach((day, index) => {
            if (index == new Date().getDay()) {
                for (let i = index - 1; i >= 0; i--) {
                    var date = new Date();
                    dates.push({ date: new Date(date.setDate(date.getDate() - (i + 1))).toString(), days: days[i], status: 0 });
                }
                var date = new Date();
                dates.push({ date: new Date(date.setDate(date.getDate())).toString(), days: days[index], status: 1 });
                setSelectedDate({ date: new Date(date.setDate(date.getDate())).toString(), days: days[index], status: 1 });
                for (let i = index + 1; i < days.length; i++) {
                    var date = new Date();
                    dates.push({ date: new Date(date.setDate(date.getDate() + (i - 1))).toString(), days: days[i], status: 2 });
                }
            }
        })

        setDateAdd(dates)
    }, [])
    // console.log("dateArr", dateArr);


    let handleSaveTime = () => {
        SyncStorage.set('_laundry_scheduled_time_', {
            SelectedDate: SelectedDate,
            SelectedTime: SelectedTime,
            meridium: meridium,
        });
        props.navigation.navigate(navigationStrings.MYADDRESS)
    }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.Footer}>
                <ScrollView style={{ flex: 1 }}>

                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                fontFamily: 'Poppins-Medium',
                                color: Colors.black,
                                fontSize: Responsive.convertFontScale(17),
                                fontWeight: '500',
                            }}>
                            Select Date
                        </Text>



                        <View
                            style={{
                                height: 40,
                                width: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderRadius: 10,
                                flexDirection: 'row',
                                borderColor: 'rgba(224, 229, 231, 1)',
                                backgroundColor: 'rgba(250, 250, 250, 1)',
                            }}>
                            <Text
                                style={{
                                    fontFamily: 'Poppins-Medium',
                                    fontSize: Responsive.convertFontScale(15),
                                    color: Colors.black,
                                }}>
                                {Months[new Date().getMonth()]} {new Date().getFullYear()}
                            </Text>
                            <View
                                style={{
                                    height: 40,
                                    width: 10,
                                }}></View>
                        </View>
                    </View>

                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        {dateArr?.map((days, index) => {
                            return (
                                <Pressable onPress={() => {
                                    (days.status == 0) ? alert('You cant choose the date that already passed.') : setSelectedDate(days)
                                }}>
                                    <View
                                        style={{
                                            height: Responsive.heightPercentageToDP('8%'),
                                            width: Responsive.widthPercentageToDP('12%'),
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            borderColor: (SelectedDate?.days == days?.days) ? 'rgba(100, 200, 100, 1)' : (days.status == 0) ? 'rgba(224, 229, 231, 1)' : (days.status == 1) ? 'rgba(100, 200, 100, 1)' : 'rgba(200, 200, 200, 0.2)',
                                            backgroundColor: (days.status == 0) ? 'rgba(50, 50, 50, 0.2)' : (days.status == 1) ? 'rgba(100, 200, 100, 0.05)' : 'rgba(200, 200, 200, 0.2)',
                                        }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    textAlign: 'center',
                                                    fontSize: Responsive.convertFontScale(15),
                                                    color: (days.status == 0) ? 'rgba(50, 50, 50, 0.5)' : (days.status == 1) ? 'rgba(100, 200, 100, 1)' : 'rgba(100, 170, 100, 1)',
                                                    marginLeft: 10
                                                }}>
                                                {new Date(days.date).getDate()}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    textAlign: 'center',
                                                    fontSize: Responsive.convertFontScale(12),
                                                    color: (days.status == 0) ? 'rgba(50, 50, 50, 0.5)' : (days.status == 1) ? 'rgba(100, 200, 100, 1)' : 'rgba(100, 170, 100, 1)',
                                                    marginLeft: 10
                                                }}>
                                                {days.days.substring(0, 3)}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                height: 40,
                                                width: 10,
                                            }}></View>
                                    </View>
                                </Pressable>
                            )
                        })}
                    </View>

                    <View
                        style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text
                            style={{
                                fontFamily: 'Poppins-Medium',
                                color: Colors.black,
                                fontSize: Responsive.convertFontScale(17),
                                fontWeight: '500',
                            }}>
                            Time
                        </Text>



                        <View
                            style={{ flexDirection: 'row' }}>
                            <Pressable onPress={() => { setMeridium('AM') }}>
                                <View
                                    style={{
                                        height: 40,
                                        width: 100,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 10,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        borderColor: (meridium == 'AM') ? 'rgba(100, 200, 100, 1)' : 'rgba(224, 229, 231, 1)',
                                        backgroundColor: (meridium == 'AM') ? 'rgba(100, 200, 100, 0.05)' : 'rgba(250, 250, 250, 1)',
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: Responsive.convertFontScale(15),
                                            color: Colors.black,
                                            marginLeft: 8
                                        }}>
                                        {'AM'}
                                    </Text>
                                    <View
                                        style={{
                                            height: 40,
                                            width: 10,
                                        }}></View>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => { setMeridium('PM') }}>
                                <View
                                    style={{
                                        height: 40,
                                        width: 100,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        borderColor: (meridium == 'PM') ? 'rgba(100, 200, 100, 1)' : 'rgba(224, 229, 231, 1)',
                                        backgroundColor: (meridium == 'PM') ? 'rgba(100, 200, 100, 0.05)' : 'rgba(250, 250, 250, 1)',
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: Responsive.convertFontScale(15),
                                            color: Colors.black,
                                            marginLeft: 8
                                        }}>
                                        {'PM'}
                                    </Text>
                                    <View
                                        style={{
                                            height: 40,
                                            width: 10,
                                        }}></View>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 20 }}>
                        {timeArr.map((ele, index) => {
                            return (
                                <Pressable onPress={() => { setSelectedTime(ele) }}>
                                    <View style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 2,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <View
                                            style={{
                                                height: 20,
                                                width: 20,
                                                borderRadius: 20 / 2,
                                                borderWidth: 2,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderColor: Colors.grey,
                                            }}>
                                            <View
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    borderRadius: 10 / 2,
                                                    backgroundColor: (SelectedTime?.id == ele?.id) ? Colors.green : Colors.grey,
                                                }}
                                            />
                                        </View>
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-Medium',
                                                marginLeft: 10,
                                                color: Colors.black,
                                                fontSize: Responsive.convertFontScale(14),
                                                fontWeight: '400',
                                            }}>
                                            {ele.text} {meridium}
                                        </Text>
                                    </View>
                                    <View style={{ height: 10 }} />
                                </Pressable>
                            )
                        })}
                    </View>
                    <CustomsButtons onPressButton={handleSaveTime} title={'Save Time'} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AddTime;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: Colors.darkgray,
    },
    Footer: {
        padding: 20,
        backgroundColor: Colors.white,
        height: Responsive.heightPercentageToDP('50%'),
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    Image: {
        marginLeft: '20%',
        height: Responsive.heightPercentageToDP('30%'),
        width: Responsive.widthPercentageToDP('60%'),
    },
    txt: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        fontSize: Responsive.convertFontScale(25),
        paddingTop: 20,
        color: Colors.fontblack,
    },
    scnd_txt: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        paddingTop: 10,
        fontSize: Responsive.convertFontScale(17),
        fontWeight: '400',
        color: Colors.fontblack,
    },
    scnd_txt: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        paddingTop: 10,
        fontSize: Responsive.convertFontScale(17),
        fontWeight: '400',
        color: Colors.fontblack,
    },
});
