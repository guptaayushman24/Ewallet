import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Wallet from './Wallet';
import Report from './Report';
import Account from './Account';
import AddMoney from './AddMoney';
import Signin from './Signin';
const HomePage = () => {
    const route = useRoute();
    const name = route.params;
    console.log("Name in the HomePage",name.user_name);


    return (

      <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.userdetail}>


                <View><Text style={{color:'black',fontWeight:'bold',fontSize:20}}>Hii!</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:20}}>{name.user_name}</Text></View>

                </View>
            </View>

            <View style={styles.carddesign}>
                <View style={styles.amount}>
                    <Text style={{color:'white',fontSize:18}}>Balance</Text>
                    <Text style={{color:'white',fontSize:22}}>Rs 2000</Text>
                </View>

                <View>
                <View style={styles.cardnumber}>
                    <Text style={{color:'white'}}>1234567892</Text>
                    <Text style={{marginLeft:200,color:'white',fontSize:18}}>Maestro</Text>
                </View>
                </View>
            </View>
            <View style={styles.functionality}>
            <View style={styles.upperbtn}>
                <View style={styles.addmoney}>
                    <TouchableOpacity><Text style={{textAlign:"center",marginTop:10,fontSize:18,color:'white'}}>Add Money</Text></TouchableOpacity>
                </View>
                <View style={styles.transfermoney}>
                    <TouchableOpacity><Text style={{textAlign:"center",marginTop:10,fontSize:18,color:'white'}}>Transfer Money</Text></TouchableOpacity>
                </View>
            </View>
            <View style={styles.lowerbtn}>
            <View style={styles.deposit}>
                    <TouchableOpacity><Text style={{textAlign:"center",marginTop:10,fontSize:18}}>Deposit</Text></TouchableOpacity>
                </View>
                <View style={styles.withdraw}>
                    <TouchableOpacity><Text style={{textAlign:"center",marginTop:10,fontSize:18}}>Withdraw</Text></TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.transactionhistory}></View>
        </View>
    )

}
export default HomePage;

const styles = StyleSheet.create({
    main: {

        flex: 1
    },
    header:{
        flex:0.5,
    },
    carddesign:{
        flex:0.65,
        backgroundColor:'#7b8afe',
        height:200,
        width:400,
        borderRadius:20,
       alignSelf:"center",
       margin:10
    },
    functionality:{
        flex:1,
        // backgroundColor:'blue',
    },
    transactionhistory:{
        flex:1,
        backgroundColor:'orange'
    },
    userdetail:{
        margin:50
    },
    amount:{
        margin:10
    },
    cardnumber:{
        margin:10,
       paddingTop:40,
       flexDirection:'row'
    },
    upperbtn:{
        flex:1,
        // backgroundColor:'red',
        flexDirection:'row',
    },
    lowerbtn:{
        flex:1,
        // backgroundColor:'green',
        flexDirection:'row'
    },
    addmoney:{
        marginVertical:20,
        marginLeft:20,
        backgroundColor:'#7b8afe',
        width:120,
        height:48,
        borderRadius:20,
    },
    transfermoney:{
        marginVertical:20,
        marginLeft:100,
        backgroundColor:'#7b8afe',
        width:150,
        height:48,
        borderRadius:20,
        borderColor:'white',
    },
    deposit:{
        marginVertical:20,
        marginLeft:20,
        backgroundColor:'orange',
        width:120,
        height:48,
        borderRadius:20,
    },
    withdraw:{
        marginVertical:20,
        marginLeft:100,
        backgroundColor:'orange',
        width:150,
        height:48,
        borderRadius:20,
    }

})