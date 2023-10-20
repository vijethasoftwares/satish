import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Pressable,
    FlatList,
    TextInput
  } from 'react-native';
  import React, {useState} from 'react';
  import BackHeader from '../../../Component/BackHeader';
  import SyncStorage from 'sync-storage';
  import Colors from '../../../assets/Theme/Colors';
  import {MyTextInput} from '../../../Component/MyTextInput';
  import Responsive from '../../../assets/Theme/Responsive';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import CustomsButtons from '../../../Component/CustomsButtons';
  import navigationStrings from '../../../assets/Theme/navigationStrings';
  const AddAdditionalNote = props => {
    const [tabChange, setTabChange] = useState(0);
    const [openChange, setOpenChange] = useState(false);
    const [saveDefault, setSaveDefault] = useState(false);
    const [notes, setNotes] = useState(SyncStorage.get('_laundry_notes_')?SyncStorage.get('_laundry_notes_'):'');
    // const [tabChange, setTabChange] = useState(0);



    let handleChange = (value) => {
      setNotes(value)
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.surfaceBlack}}>
        <BackHeader title={'Address'} />
        <View style={{height: 10}} />
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            paddingHorizontal: 20,
            backgroundColor: Colors.white,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: Colors.black,
              fontSize: Responsive.convertFontScale(17),
            }}>
            Additional Notes
          </Text>
          <View style={{height: 10}} />
          <TextInput
          onChangeText={(value) => handleChange(value)}
          value={notes}
          placeholder={'Notes (optional)'}
          multiline={true}
          numberOfLines={10}
          style={{ paddingHorizontal: 10, height:200, textAlignVertical: 'top', borderWidth: 1, borderStyle: 'solid', borderColor: '#aaaaaa'}}/>
          {/* <MyTextInput
            InputStyle={{paddingHorizontal: 10, height:200, textAlignVertical: 'top',}}
            placeholder={'Notes (optional)'}
            numberOfLines={5}
            multiline={true}
          /> */}
          <View style={{height: 40}} />
  
          <View style={{backgroundColor: Colors.white}}>
            <CustomsButtons
              title={'Save Notes'}
              onPressButton={() => {
                SyncStorage.set('_laundry_notes_', notes);
                props.navigation.navigate(navigationStrings.MYADDRESS);   // Save in Session Storage before Login
              }}
            />
            <View style={{height: 10}} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default AddAdditionalNote;
  