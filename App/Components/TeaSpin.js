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
import Realm from '../Models/Realms';

var RNFS = require( 'react-native-fs' );

class SpinCandidate extends React.PureComponent {

	_onPress = () => {
		this.props.onPressItem( this.props.id, this.props.title );
	};

	render() {
		return (
			<TouchableHighlight key={this.props.id} onPress={this._onPress} underlayColor={colours.white}>
				<View style={styles.projectBlock}>
					<Image
						style={ styles.projectBlock__image }
						source={{ uri: 'file://' + RNFS.DocumentDirectoryPath + '/' + this.props.image }}
					/>
					<View style={styles.projectBlock__title}>
						<Text style={styles.projectBlock__titleText}>
							{this.props.title}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}


class ListProjects extends Component {

	constructor( props ) {
		super(props);
		this.props.navigator.setOnNavigatorEvent( NavigationHelper.NavigationHelper.onNavigatorEvent.bind( this ) );
		var thisSection = Realm.objectForPrimaryKey( 'Section', this.props.id );
		this.state = {
			hasData: thisSection.projects.length,
			data: thisSection.projects,
		};
	}

	_keyExtractor = ( item, index ) => item.id;

	_goToSlides = ( id, title ) => {
		this.props.navigator.push({
			screen: 'oneWorks.ViewProjectSlides',
			title: title,
			animationType: 'slide',
			backButtonHidden: false,
			passProps: {
				id,
			},
			navigatorStyle: {
				navBarTextFontFamily: 'OpenSans',
				navBarBackgroundColor: colours.white,
				navBarTextColor: colours.black,
				navBarButtonColor: colours.brandBlue,
			},
			navigatorButtons: NavigationHelper.mainNavigation,
		});
	}

	_renderFooter = () => {
		return (
			<View style={styles.flatListSeparator}>
			</View>
		)
	}

	_renderItem = ({item}) => {
		return (
			<ProjectListingItem
				id={item.id}
				onPressItem={this._goToSlides}
				title={item.title}
				image={item.image} />
		)
	}

	render(){
		if (this.state.hasData == 0) {
			return (
				<View style={styles.container}>
					<Text style={styles.instructions}>
						There are no projects, go to update
					</Text>
				</View>
			);
		}
		return (
			<View style={styles.containerFlush}>
				<FlatList
					data={this.state.data}
					numColumns={4}
					ListFooterComponent={this._renderFooter}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
				/>
			</View>
		);
	}
}

module.exports = ListProjects;