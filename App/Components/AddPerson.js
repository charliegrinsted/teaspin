import React, { Component } from 'react';
import {
	AlertIOS,
	KeyboardAvoidingView,
	AppRegistry,
	Text,
	FlatList,
	Image,
	View,
	TextInput,
	TouchableHighlight,
} from 'react-native';

import styles from '../Styles/Main';
import Realm from '../Models/Realm';

var RNFS = require( 'react-native-fs' );
var ImagePicker = require('react-native-image-picker');

var options = {
	title: 'Add a photo',
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
			<KeyboardAvoidingView style={styles.container} behavior='padding'>
				<View style={styles.form__row}>
					<TouchableHighlight style={styles.presentation__nameSubmitOuter} onPress={this._addAPhoto}>
						<Text style={styles.presentation__nameSubmitInner}>Add a photo</Text>
					</TouchableHighlight>
					<TextInput
						style={styles.presentation__nameInput}
						autoFocus={true}
					    onChangeText={( presentationName ) => this.setState( {
							currentName: presentationName,
							buttonStyle: styles.presentation__nameSubmitOuterEnabled,
						})}
						value={this.state.currentName}
						placeholder={'Person Name'}
						maxLength={40} />
					<TouchableHighlight style={styles.presentation__nameSubmitOuter} onPress={this._addAPhoto}>
						<Text style={styles.presentation__nameSubmitInner}>Submit</Text>
					</TouchableHighlight>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

module.exports = AddPerson;