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
import Slack from 'react-native-slack-webhook';
import { webhookURL } from '../../env';
import RealmHelper from '../Helpers/RealmHelper';

var options = {
	title: 'Add a photo',
	noData: true,
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};

class AddPerson extends Component {

	constructor( props ) {
		super(props);
		// new Slack(webhookURL).post(this.state.message, '#ten4', 'Tea Spin', ':coffee:')
		this.state = {
			name: '',
			photoURL: '',
			teaPreference: '',
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
				let source = response.uri;
				this.setState({
					photoURL: source,
				});
			}
		});
	}

	_addPersonToRealm = () => {
		RealmHelper.addPerson( Realm, this.state.name, this.state.photoURL, this.state.teaPreference );
	}

	render(){
		return (
			<KeyboardAvoidingView style={styles.container} behavior='padding'>
				<View style={styles.form__row}>
					<TouchableHighlight style={styles.presentation__nameSubmitOuter} onPress={this._addAPhoto}>
						<Text style={styles.presentation__nameSubmitInner}>Add a photo</Text>
					</TouchableHighlight>
					<TextInput
						style={styles.addPerson__textInput}
						onChangeText={( inputName ) => this.setState( {
							name: inputName
						})}
						value={this.state.name}
						placeholder={'What is your name?'}
						maxLength={40} />
					<TextInput
						style={styles.addPerson__textInput}
						onChangeText={( inputPreference ) => this.setState( {
							teaPreference: inputPreference
						})}
						value={this.state.teaPreference}
						placeholder={'What is your tea preference?'}
						maxLength={40} />
					<TouchableHighlight style={styles.presentation__nameSubmitOuter} onPress={this._addPersonToRealm}>
						<Text style={styles.presentation__nameSubmitInner}>Add to team</Text>
					</TouchableHighlight>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

module.exports = AddPerson;