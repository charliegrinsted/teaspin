import React, { Component } from 'react';
import {
	AppRegistry,
	Button,
	FlatList,
	Image,
	Linking,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import styles from './App/Styles/Main.js';
var RNFS = require( 'react-native-fs' );

class HomeScreen extends Component {

	constructor( props ) {
		super(props);
	}

	_registerTap = () => {
		console.log( 'tap' );
	}

	render(){
		return (
			<View style={styles.container}>
				<Image style={ styles.mainLogo } source={ require('./App/Images/logo.jpg') }></Image>
				<TouchableHighlight style={styles.homeMenuButton} onPress={this._registerTap}>
					<Text>Tea Spin</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.homeMenuButton} onPress={this._registerTap}>
					<Text>Washing Up Spin</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.homeMenuButton} onPress={this._registerTap}>
					<Text>Custom Spin</Text>
				</TouchableHighlight>
			</View>
		);
	}

}

Navigation.registerComponent('teaSpin.HomeScreen', () => HomeScreen);

Navigation.startSingleScreenApp({
	screen: {
		screen: 'teaSpin.HomeScreen',
		title: 'Ten4 Spinner',
		navigatorStyle: {
			navBarHidden: true,
		},
	},
});