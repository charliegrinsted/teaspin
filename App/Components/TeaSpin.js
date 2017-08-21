import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	FlatList,
	Image,
	View,
	TouchableHighlight,
} from 'react-native';

import RealmHelper from '../Helpers/RealmHelper';
import NavigationHelper from '../Helpers/NavigationHelper';

import styles from '../Styles/Main';
import colours from '../Styles/Colours';
import Realm from '../Models/Realm';

var RNFS = require( 'react-native-fs' );

class SpinCandidate extends React.PureComponent {

	_onPress = () => {
		this.props.onPressItem( this.props.id, this.props.name );
	};

	render() {
		return (
			<TouchableHighlight key={this.props.id} onPress={this._onPress} underlayColor={colours.white}>
				<View style={styles.projectBlock}>
					<Image
						style={ styles.projectBlock__image }
						source={{ uri: this.props.image }} />
					{this.props.selected ? <View style={styles.presentationBlock__overlay}></View> : null}
					<View style={styles.projectBlock__title}>
						<Text style={styles.projectBlock__titleText}>
							{this.props.name}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

var selectedPeople = [];

class TeaSpin extends Component {

	constructor( props ) {
		super(props);
		var people = RealmHelper.getMultipleObjectsAsArray( Realm, 'Person' );
		this.state = {
			data: people,
			selected: ( new Map(): Map<string, boolean> ),
		};
	}

	componentWillMount() {
		var alreadySelected = new Map( this.state.selected );
	}

	_keyExtractor = ( item, index ) => item.id;

	_renderFooter = () => {
		return (
			<View style={styles.flatListSeparator}>
			</View>
		)
	}

	_renderItem = ({item}) => {
		return (
			<SpinCandidate
				onPressItem={this._toggleSelected}
				id={item.id}
				name={item.name}
				preference={item.teaPreference}
				selected={!!this.state.selected.get( item.id )}
				image={item.photo} />
		)
	}

	_toggleSelected = ( id ) => {
		console.log( this.state.selectedPeople );
		console.log( id );
		var indexOfSelectedItem = selectedPeople.indexOf( id );
		if ( indexOfSelectedItem == -1 ) {
			selectedPeople.push( id );
		} else {
			selectedPeople.splice( indexOfSelectedItem, 1 );
		}
		this.setState( {
			selectedPeople: selectedPeople,
		} );
		this.setState( ( state ) => {
			const selected = new Map(state.selected);
			selected.set(id, !selected.get(id));
			return {selected};
		} );
	}

	render(){
		if (this.state.hasData == 0) {
			return (
				<View style={styles.container}>
					<Text style={styles.instructions}>
						There are no people
					</Text>
				</View>
			);
		}
		return (
			<View style={styles.containerFlush}>
				<FlatList
					data={this.state.data}
					numColumns={1}
					removeClippedSubviews={false}
					ListFooterComponent={this._renderFooter}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
				/>
			</View>
		);
	}
}

module.exports = TeaSpin;