import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	FlatList,
	Image,
	View,
	TouchableHighlight,
} from 'react-native';

import styles from '../Styles/Main';
import Realm from '../Models/Realm';

var RNFS = require( 'react-native-fs' );
var ImagePicker = require('react-native-image-picker');

var options = {
	title: 'Select Avatar',
	customButtons: [
		{name: 'fb', title: 'Choose Photo from Facebook'},
	],
	storageOptions: {
	skipBackup: true,
	path: 'images'
	}
};

class AddPerson extends Component {

	constructor( props ) {
		super(props);
		this.state = {
		};
	}

	_addAPhoto = () => {
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
			console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
			console.log('User tapped custom button: ', response.customButton);
			}
			else {
				let source = { uri: response.uri };
				this.setState({
					avatarSource: source
				});
			}
		});
	}

	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.instructions}>
					There are no people
				</Text>
			</View>
		);
	}
}

module.exports = AddPerson;