import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useDeferredValue, useEffect, useState,useContext } from 'react';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import Wallet from './Stock';
import Account from './Account';
import AddMoney from './AddMoney';
import Signin from './Signin';
import { AppContext } from '../Global/APIContext';
const HomePage = () => {

  const navigation = useNavigation();


  const route = useRoute();
  const isFocused = useIsFocused();



  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTransfer, setmodalVisibleTransfer] = useState(false);
  const [storeemail, setstoreemail] = useState();
  // Storing the card number in the list
  const [cardnumber, setcardnumber] = useState([]);
  // Storing the index of the card number
  const [index, setindex] = useState(-1);
  // Storing the email address
  const [email, setemail] = useState([]);
  // Storing the amount
  const [amount, setamount] = useState([]);
  const [amountwallet, setamountwallet] = useState('');
  // Storing the wallet amount
  const [walletamountstore, setwalletamountstore] = useState([]);
  // State for updating the amount in wallet
  const [newamount, setnewamount] = useState(0);
  // State for updating the amount in the bank
  const[newbankamout,setnewbankamount] = useState('');

  // Email address of the reciever
  const [senderemailinput,setsenderemailinput] = useState('');
  // Storing the amount which we want to transfer from wallet
  const [transferamount,settransferamount] = useState(0);

  // Storing the sender address
  const [senderaddress,setsenderaddress] = useState('');
  // Storing all the address of wallet
  const [walletaddress,setwalletaddress] = useState([]);
  // Storing the Home Page email
  const [homepageemail,sethomepageemail] = useState('');
  // Index of the reciever
  const [recieverindex,setrecieverindex] = useState(-1);
  // Index of the sender
  const[senderindex,setsenderindex] = useState(-1);

  // Storing the amount of the Home Page user wallet of particular index
  const [walletamountindexhomepage,setwalletamountindexhomepage] = useState(0);
  // Storing all the emails of the wallet
  const [walletemail,setwalletemail] = useState([]);

  // Updating the wallet amount of the sender
  const [senderamount,setsenderamount] = useState(0);

  // Updating the wallet amount of the reciever
  const [recieveramount,setrecieveramount] = useState(0);

  const { email_sender } = useContext(AppContext);


  const fetchdetail = async () => {
    try {
      const emailResponse = await axios.get('http://10.0.2.2:5000/bank/bankdetailemailget');
      setstoreemail(emailResponse.data);
      setemail(emailResponse.data);
      console.log("Email fetched in the homepage", emailResponse.data);

      const cardNumberResponse = await axios.get('http://10.0.2.2:5000/bank/bankdetailcardnumberget');
      setcardnumber(cardNumberResponse.data);
      for (let i = 0; i < cardNumberResponse.data.length; i++) {
        if (cardNumberResponse.data[i].cardnumber.toString() === route.params.cardnumber.cardnumber.toString()) {
          setindex(i);
          break;
        }
      }

      const amountResponse = await axios.get('http://10.0.2.2:5000/bank/bankdetailgetamount');
      setamount(amountResponse.data);
      console.log(amountResponse.data);

      const walletAmountResponse = await axios.get('http://10.0.2.2:5000/wallet/walletamountget');
      setwalletamountstore(walletAmountResponse.data);
      console.log(walletAmountResponse.data);

      console.log("The amount in the wallet on the index is", walletAmountResponse.data[index]?.amountadded);
      console.log("The amount which we want to submit", parseInt(amountwallet));

      let temp = 0;
      console.log("The length of the amount wallet is ", amountwallet.length);
      if (amountResponse.data[index]?.amountlength >= parseInt(amountwallet)) {
        const newWalletAmount = walletAmountResponse.data[index].amountadded + parseInt(amountwallet);
        setnewamount(newWalletAmount);
        console.log("The new amount is ", newWalletAmount);
        console.log("The new email is", emailResponse.data[index].signupemail);

        await axios.put('http://10.0.2.2:5000/wallet/walletupdate', {
          email: emailResponse.data[index].signupemail,
          amountadded: newWalletAmount
        });

        const newBankAmount = amountResponse.data[index].amountlength - parseInt(amountwallet);
        setnewbankamount(newBankAmount);
        await axios.put('http://10.0.2.2:5000/bank/bankdetailupdatemail', {
          signupemail: emailResponse.data[index].signupemail,
          amountlength: newBankAmount
        });

        console.log("Updated amount in bank", newBankAmount);
        setamountwallet('');
      } else {
        console.log("Insufficient Amount");
        temp = 1;
      }

      console.log("The new amount of the wallet is", newamount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdetail();
  }, [index]);

  // Creatig the function for the Transfer Money


  const closemodal = async () => {
    // Alert.alert('Top-up with', amountwallet);
    if (isFocused){
     await fetchdetail();
    }
    setModalVisible(!modalVisible);
  };

  const fetchWalletAddresses = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/wallet/walletemailget');
      setwalletaddress(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCardNumbers = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/bank/bankdetailcardnumberget');
      setcardnumber(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWalletAmounts = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/wallet/walletamountget');
      setwalletamountstore(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWalletEmails = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/wallet/walletemailget');
      setwalletemail(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const walletdatasender = async () => {
    await fetchWalletAddresses();
    const recieverIndex = walletaddress.findIndex(addr => addr.email.toString() === senderemailinput);
    setrecieverindex(recieverIndex);
    console.log("The reciever index is", recieverIndex);

    await fetchCardNumbers();
    const senderIndex = cardnumber.findIndex(card => card.cardnumber.toString() === route.params.cardnumber.cardnumber.toString());
    setsenderindex(senderIndex);
    console.log("Sender index is", senderIndex);

    await fetchWalletAmounts();
    console.log("The amount of the HomePage user is", walletamountstore[senderIndex]);
    console.log("The amount of the Reciever user is", walletamountstore[recieverIndex]);

    await fetchWalletEmails();
    console.log("Fetched wallet emails", walletemail);

    const newsenderamount = walletamountstore[senderIndex]?.amountadded - transferamount;
    const newrecieveramount = walletamountstore[recieverIndex]?.amountadded + parseInt(transferamount);
    setsenderamount(newsenderamount);
    setrecieveramount(newrecieveramount);

    console.log("Reciever amount is", newrecieveramount);
    console.log("The new amount of the sender is", newsenderamount);
    console.log("The transfer amount is", transferamount);
    console.log("The email address of sender is", walletemail[senderIndex]?.email);
    console.log("The email address of reciever is", walletemail[recieverIndex]?.email);

    if (newsenderamount >= 0) {
      try {
        await axios.put('http://10.0.2.2:5000/wallet/walletupdatesender', {
          email: walletemail[senderIndex]?.email,
          amountadded: newsenderamount
        });
        console.log("Sender amount updated successfully");
      } catch (err) {
        console.log(err);
      }

      try {
        await axios.put('http://10.0.2.2:5000/wallet/walletupdatereciever', {
          email: walletemail[recieverIndex]?.email,
          amountadded: newrecieveramount
        });
        console.log("Receiver amount updated successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    walletdatasender();
  }, [recieveramount, recieverindex]);

  // Transaction
  const transaction = async()=>{
    try{
      await axios.post('http://10.0.2.2:5000/transaction/tranactionpost',{
        SenderEmail:walletemail[senderindex].email,
        RecieverEmail:senderemailinput,
        AmountRecieved:transferamount
    })
  }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
     transaction();
  },[senderindex])
  const closemodalTransfer = async () => {
    await walletdatasender();
    await transaction();
    console.log('Transfer button is pressed')


    setmodalVisibleTransfer(!modalVisibleTransfer);
  };

  const clearhistory = ()=>{
    console.log("Clear History button is pressed")
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.userdetail}>
          <View><Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Hii!</Text></View>
          <View><Text style={{ fontWeight: 'bold', fontSize: 20 }}>{route.params.user_name}</Text></View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.carddesign}>
          <View style={styles.amount}>
            <Text>Card Holder email: {route.params.user_name}</Text>
          </View>
        </View>
        <View>
          <View style={styles.cardnumber}>
            <Text style={{ color: 'white' }}>{route.params.cardnumber.cardnumber}</Text>
            <Text style={{ marginLeft: 200, color: 'white', fontSize: 15 }}>Maestro</Text>
          </View>
        </View>
      </View>
      <View style={styles.functionality}>
        <View style={styles.container1}>
          <View style={styles.upperbtn}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Add Money</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setmodalVisibleTransfer(true)}>
              <Text style={styles.textStyle}>Transfer Money</Text>
            </Pressable>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  placeholder='Enter the amount'
                  style={{ textAlign: 'center' }}
                  onChangeText={(amountwallet) => setamountwallet(amountwallet)}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={closemodal}>
                  <Text style={styles.textStylesubmit}>PROCEED TO TOPUP</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleTransfer}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setmodalVisibleTransfer(!modalVisibleTransfer);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <TextInput placeholder='Enter reciever email' style={{textAlign:'center',fontSize:20}}
              onChangeText={(senderemailinput)=>setsenderemailinput(senderemailinput)}></TextInput>
                <TextInput
                  placeholder='Enter transfer amount'
                  style={{ textAlign: 'center',fontSize:20 }}
                  onChangeText={(transferamount) => settransferamount(transferamount)}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={closemodalTransfer}>
                  <Text style={styles.textStylesubmit}>PROCEED TO TRANSFER</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.lowerbtn}>
          <View style={styles.deposit}>
            <TouchableOpacity onPress={() => navigation.navigate('AddMoney')}>
              <Text style={{ textAlign: "center", marginTop: 10, fontSize: 18 }}>Deposit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.withdraw}>
            <TouchableOpacity onPress={clearhistory}>
              <Text style={{ textAlign: "center", marginTop: 10, fontSize: 18 }}>Delete History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.transactionhistory}></View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    flex: 0.5,
  },
  functionality: {
    flex: 1,
  },
  transactionhistory: {
    flex: 1,
    backgroundColor: 'orange'
  },
  userdetail: {
    margin: 50
  },
  upperbtn: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distributes space between buttons
    width: '100%',
    padding: 20,
  },
  lowerbtn: {
    flex: 1,
    flexDirection: 'row'
  },
  addmoney: {
    marginVertical: 20,
    marginLeft: 20,
    backgroundColor: '#7b8afe',
    width: 120,
    height: 48,
    borderRadius: 20,
  },
  transfermoney: {
    marginVertical: 20,
    marginLeft: 100,
    backgroundColor: '#7b8afe',
    width: 150,
    height: 48,
    borderRadius: 20,
    borderColor: 'white',
  },
  deposit: {
    marginVertical: 20,
    marginLeft: 20,
    backgroundColor: 'orange',
    width: 120,
    height: 48,
    borderRadius: 20,
  },
  withdraw: {
    marginVertical: 20,
    marginLeft: 100,
    backgroundColor: 'orange',
    width: 150,
    height: 48,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#7b8afe',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  textStylesubmit: {
    textAlign: "center",
    marginTop: 2,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13.5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7b8afe',
    borderRadius: 20,
    margin: 5,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#7b8afe',
    borderRadius: 20,
    margin: 5,
  },
  carddesign: {
    flex: 0.65,
    backgroundColor: '#7b8afe',
    height: 200,
    width: 400,
    borderRadius: 20,
    alignSelf: "center",
    margin: 10,
    flexDirection: 'row', // Makes the content inside horizontal
    justifyContent: 'space-around', // Spacing out the items evenly
    alignItems: 'center' // Center the items vertically
  },
  amount: {
    margin: 10,
    // backgroundColor: 'red',
    padding: 10, // Optional: add padding for better spacing
    borderRadius: 10, // Optional: add border radius for rounded corners
  },
  cardnumber: {
    margin: 10,
    paddingTop: 40,
    flexDirection: 'row'
  }
});