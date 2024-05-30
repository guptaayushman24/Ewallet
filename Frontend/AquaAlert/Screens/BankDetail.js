import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios';

const BankDetail = ()=>{
    // Storing the bank name in the variable
    const [bankname,setbankname] = useState('');

    // Storing the bank account number in the variable
    const [accountnumber,setaccountnumber] = useState('');

    // Storing the email  in the variable
    const [email,setemail] = useState('');



    // State for showing the warning related to bank name
    const [validbankname,setvalidbankname] = useState(false);

    // State for checking the accountnumber is enterd or not
    const [accountnumberlength,setaccountnumberlength] = useState(false);

    // State for checking the accountnumber is valid or not
    const [validaccountnumber,setvalidaccountnumber] = useState(false);



    // State for checking the email is enterd or not
    const [emaillength,setemaillength] = useState(false);

     // State for checking the email is valid or not
     const [validemail,setvalidemail] = useState(false);

    const checkdetails=()=>{
        if (bankname.length==0){

            setvalidbankname(true);
        }
        else{
            setvalidbankname(false);
        }

        if (accountnumber.length==0){
            setaccountnumberlength(true);
            console.log('Enter the account number');
        }
        else{
            setaccountnumberlength(false);
        }

        if (email.length==0){
            setemaillength(true);
        }
        else{
            setemaillength(false);
        }

        var flag=0;
        for (var i=0;i<accountnumber.length;i++){
          if (accountnumber.charAt(i)>='0' && accountnumber.charAt(i)<='9' && accountnumber.length>=9 && accountnumber.length<=18){
            continue;
          }
          else{
            flag=1;
            break;
          }
        }
        if (flag==1){
            setvalidaccountnumber(true);
        }
        else{
          setvalidaccountnumber(false);
        }

        if (email.length==0){
            setemaillength(true);
        }
        else{
            setemaillength(false);
        }

        var validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
        if (validRegex.test(email)){
            setvalidemail(false);
        }
        else{
            setvalidemail(true);
        }


    }

    return(
        <View style={styles.main}>
            {/* Heading View */}
           <View style={styles.upperdesign}>
            <Text style={styles.txt}>Please Enter your Bank Details</Text>
           </View>

            {/* View for the bank details */}
           <View style={styles.bankdetail}>


            {/* View for the Bank Name */}
            <View style={styles.bankname}>

                <TextInput
                placeholder='Enter the Bank Name'
                style={{fontSize:20}}
                onChangeText={(bankname)=>setbankname(bankname)}></TextInput>
            </View>

                {/* View for displaying the bank name warning */}
            <View style={styles.warningview}>
            {
                validbankname && (
                    <Text style={styles.warningtxt}>*Please enter the bank name</Text>
                )
            }
            </View>

            {/* View for the Account Number */}
            <View style={styles.bankname}>

                <TextInput
                placeholder='Enter the Account Number'
                style={{fontSize:20}}
                onChangeText={(accountnumber)=>setaccountnumber(accountnumber)}></TextInput>
            </View>

               {/* View for displaying the bank account number warning */}
               <View style={styles.warningview}>
            {
                accountnumberlength && (
                    <Text style={styles.warningtxt}>*Please enter the account number</Text>
                )
            }
            {
                !accountnumberlength && validaccountnumber && (
                    <Text style={styles.warningtxt}>*Please the valid account number</Text>
                )
            }
            </View>

            {/* View for the Account Holder email */}
            <View style={styles.bankname}>

                <TextInput
                placeholder='Enter the Account Holder Email'
                style={{fontSize:20}}
                onChangeText={(email)=>setemail(email)}></TextInput>
            </View>

              {/* View for displaying the email warning */}
              <View style={styles.warningview}>
            {
                emaillength && (
                    <Text style={styles.warningtxt}>*Please enter the email</Text>
                )
            }
            {
                !emaillength && validemail && (
                    <Text style={styles.warningtxt}>*Please enter the valid email</Text>
                )
            }
            </View>

            {/* Button for submtting the bank detail*/}
            <View style={styles.submitbtn}>

                <TouchableOpacity onPress={checkdetails}>
                    <Text style={styles.submittxt}>Submit</Text>
                </TouchableOpacity>
            </View>

           </View>
        </View>
    )
}
export default BankDetail;
const styles = StyleSheet.create({
    main:{
        flex:1,

        backgroundColor:'#0085e4'
    },
    upperdesign: {
        marginTop: 76,
        marginLeft: 10
    },
    txt:{
        color: 'white',
        fontSize: 26
    },
    bankdetail:{
        flexDirection:'column'
    },
    bankname:{
        margin:20,
        borderWidth:2,
        borderColor:'white',
        padding:10,
        borderRadius:20
    },
    submitbtn:{
        backgroundColor:'white',
        margin:20,
        padding:10,
        borderRadius:20,
    },
    submittxt:{
        color:'black',
        fontWeight:"bold",
        fontSize:20,
        textAlign:"center"
    },
    warningview:{
        marginLeft:20
    },
    warningtxt:{
        color:'red',
        fontSize:20
    }
})