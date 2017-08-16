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
import NavigationHelper from './App/Helpers/NavigationHelper';
import styles from './App/Styles/Main';
import colours from './App/Styles/Colours';
import TeaSpin from './App/Components/TeaSpin';
import AddPerson from './App/Components/AddPerson';

var RNFS = require( 'react-native-fs' );

class HomeScreen extends Component {

	constructor( props ) {
		super(props);
	}

	_registerTap = () => {
		console.log( 'tap' );
	}


	_goToStartNewSpin = () => {
		this.props.navigator.resetTo({
			screen: 'teaSpin.SpinScreen', // unique ID registered with Navigation.registerScreen
			title: 'New Spin', // navigation bar title of the pushed screen (optional)
			animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
		});
	}

	_goToAddPerson = () => {
		this.props.navigator.resetTo({
			screen: 'teaSpin.AddPersonScreen', // unique ID registered with Navigation.registerScreen
			title: 'New Person', // navigation bar title of the pushed screen (optional)
			animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
			navigatorStyle: {
				navBarBackgroundColor: colours.brandBlue,
				navBarTextColor: colours.white,
				navBarButtonColor: colours.white,
			},
		});
	}

	render(){
		return (
			<View style={styles.container}>
				<Image style={ styles.mainLogo } source={ require('./App/Images/logo.jpg') }></Image>
				<TouchableHighlight style={styles.homeMenuButton} onPress={this._goToStartNewSpin}>
					<Text>Tea Spin</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.homeMenuButton} onPress={this._goToAddPerson}>
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
Navigation.registerComponent('teaSpin.SpinScreen', () => TeaSpin);
Navigation.registerComponent('teaSpin.AddPersonScreen', () => AddPerson);

Navigation.startTabBasedApp({
	tabs: [
		{
			label: 'Tea Spin', // tab label as appears under the icon in iOS (optional)
			screen: 'teaSpin.SpinScreen', // unique ID registered with Navigation.registerScreen
			title: 'New Spin', // title of the screen as appears in the nav bar (optional)
			navigatorStyle: {}, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
			navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
		},
		{
			label: 'Add Person',
			screen: 'teaSpin.AddPersonScreen',
			title: 'Add Person'
		}
	],
	tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
		tabBarButtonColor: colours.lightGrey, // optional, change the color of the tab icons and text (also unselected)
		tabBarSelectedButtonColor: colours.white, // optional, change the color of the selected tab icon and text (only selected)
		tabBarBackgroundColor: colours.brandBlue, // optional, change the background color of the tab bar
		initialTabIndex: 1, // optional, the default selected bottom tab. Default: 0
	},
	screen: {
		screen: 'teaSpin.HomeScreen',
		title: 'Ten4 Spin',
		navigatorStyle: {
			navBarHidden: true,
		},
	},
});