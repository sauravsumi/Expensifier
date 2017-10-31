import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
  FlatList,
  ScrollView,
  Picker,
  TextInput,
  Button
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import _ from 'lodash'
import Login from './react_native/components/Login'


export default class App extends Component {

  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      OpenClose: "Start/End",
      errorlogin: false,
      id: 2,
      Name:"RICE",
      Price: 0,
      Date: new Date().toDateString(),
      ItemNames:["RICE","SUGAR","ATTA","MAIDA","DAL","OIL","MASALA","UTENSILS","BABY_ITEMS","OTHERS","MILK"],
      Quantity:2,
      Unit:"KG",
      Units:["KG","LITER","PIECES","OTHERS"],
      ItemAddErrorFlag: false,
      itemData: [
        {
          id: 1,
          Name: "RICE",
          Quantity: "1.5",
          Unit: "KG",
          Date: "20-10-2017",
          Price: "43"
        },
        {
          id: 2,
          Name: "SALT",
          Quantity: "1",
          Unit: "KG",
          Date: "21-10-2017",
          Price: "15"
        }
      ]
    }
    this.renderItems = this.renderItems.bind(this)
    this.renderItemInputModal = this.renderItemInputModal.bind(this)
    this.addItem = this.addItem.bind(this)
    this.handlePressAddItem = this.handlePressAddItem.bind(this)
    this.renderItemView = this.renderItemView.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleClose(e){
    console.log("on close",e)
    let items = this.state.itemData
    _.remove(items,function(item){
      console.log("inside close", e.id, item.id)
      return item.id == e.id
    })

    this.setState({itemData : items})

  }
  handleLogin(username,password) {
    if(username==="sumit" && password==="password"){
      this.setState({isLoggedIn: true})
      return true
    }
    else{
      this.setState({isLoggedIn: false})
      return false
    }
  }
  renderItemInputModal() {
    return (
        <View>
          <Picker
            selectedValue={this.state.Name}
            onValueChange={(itemValue, itemIndex) => this.setState({ Name: itemValue })}>
            {
              this.state.ItemNames.map((itemName)=>{
                return <Picker.Item label={itemName} value={itemName}/>
              })
            }
          </Picker>
          <Picker
            selectedValue={this.state.Unit}
            onValueChange={(itemValue, itemIndex) => this.setState({ Unit: itemValue })}>
            {
              this.state.Units.map((itemName)=>{
                return <Picker.Item label={itemName} value={itemName} />
              })
            }
          </Picker>
          <TextInput
            placeholder="enter quantity here"
            onChangeText={(text) => this.setState({Quantity:text})}
            idboardType='numeric'
            value={this.state.Quantity} />
          <TextInput
            placeholder="enter price here"
            onChangeText={(text) => this.setState({Price:text})}
            value={this.state.Price} 
            idboardType='numeric'/> 
        </View>
    )
  }
  renderItemView({item}){
    console.log("item",item)
    return(
      <ListItem 
        title={item.Name}
        subtitle={`${item.Quantity} ${item.Unit}   ${item.Date}    Rs. ${item.Price}`}
        rightIcon={{ name: 'close', style: { color: 'red' },key: item.id }}
        onPressRightIcon={()=>this.handleClose(item)}/>
    )
  }

  renderItems() {
    return (
      <List>
        <FlatList
          data={this.state.itemData}
          extraData={this.state}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItemView}/>
      </List>  
    )
  }
  handlePressAddItem(){
    if(this.state.Name && this.state.Quantity && this.state.Price && this.state.Unit){
        let item = {
          id: this.state.id+1,
          Name: this.state.Name,
          Quantity: this.state.Quantity,
          Unit: this.state.Unit,
          Date: new Date().toDateString(),
          Price: this.state.Price
        }
        this.setState({itemData:[...this.state.itemData,item]})
        this.setState({ItemAddErrorFlag: false})
        this.setState({id: item.id})
    }
    else{
      this.setState({ItemAddErrorFlag: true})
    }
  }
  addItem(){
    return(
        <Button
          onPress={this.handlePressAddItem}
          title="Add Item"
          color="#841584"/>
    )

  }
  render() {
    return (
      <View style={styles.container}>
       {this.state.isLoggedIn &&
        <ScrollView>
          <Text style={styles.welcome}>
            Welcome to Expensifier App
        </Text>

          {this.renderItemInputModal()}
          {this.addItem()}
          {this.state.ItemAddErrorFlag &&
            <Text> Please enter all item fields </Text>
          }
          {this.renderItems()}
        </ScrollView>
      }
      {!this.state.isLoggedIn && 
        <Login login={this.handleLogin}/>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
