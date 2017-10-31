import React, { Component } from 'react'
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
  } from 'react-native'

export default class Login extends Component {

    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            showUserNPasswordError: false

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        if(this.state.username && this.state.password){
           let loginStatus= this.props.login(this.state.username, this.state.password)
           this.setState({showUserNPasswordError: !loginStatus})
        }
        else{
            this.setState({showUserNPasswordError: true})
        }
    }

    render(){
        return(
            <View style={{backgroundColor: '#F5FCFF'}}>
                <TextInput
                    placeholder="enter User name"
                    onChangeText={(text) => this.setState({username:text})}/>
                <TextInput
                    placeholder="enter your password"
                    secureTextEntry
                    onChangeText={(text) => this.setState({password:text})} />
                <Button
                    onPress={this.handleSubmit}
                    title="Login"
                    color="#841584" />   
                {this.state.showUserNPasswordError && 
                    <Text>
                        Username or Password invalid
                    </Text>    
                }    
            </View>    
        )
    }
}
