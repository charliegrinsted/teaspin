import { StyleSheet } from 'react-native';
import colours from './Colours';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: colours.white,
	},
	mainLogo: {
		width: 174,
		height: 174,
	},
	homeMenuButton: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		marginBottom: 20,
		borderRadius: 5,
	},
	form__row: {
		flex: 1,
		flexDirection: 'column',
	},
	projectBlock: {
		borderTopColor: colours.blck,
		flex: 1,
		flexDirection: 'row',
		marginTop: 40,
	},
	projectBlock__image: {
		width: 100,
		height: 100,
	},
	projectBlock__title: {
		width: 220,
		paddingLeft: 20,
		paddingTop: 10,
		borderTopWidth: 1,
	},
	projectBlock__titleText: {
		fontSize: 14,
		lineHeight: 24,
		color: colours.brandBlue,
	},
	presentation__nameForm: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	presentation__nameLabel: {
		fontSize: 14,
		alignSelf: 'flex-start',
		marginBottom: 12,
	},
	presentationBlock__overlay: {
		position: 'absolute',
		top: 36,
		left: 62,
		height: 48,
		width: 48,
		borderRadius: 24,
		backgroundColor: colours.brandBlue,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	addPerson__textInput: {
		fontSize: 20,
		width: 320,
		height: 80,
		paddingLeft: 40,
		paddingTop: 16,
		paddingBottom: 16,
		borderColor: colours.grey,
		borderWidth: 1,
		borderRadius: 4,
		marginBottom: 24,
		marginTop: 24,
	},
	presentation__nameSubmitOuter: {
		backgroundColor: colours.grey,
		width: 119,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		alignSelf: 'center',
	},
	presentation__nameSubmitInner: {
		fontSize: 14,
		color: colours.white,
	},
});

module.exports = styles;