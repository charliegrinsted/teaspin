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
	presentation__nameInput: {
		fontSize: 12,
		height: 30,
		paddingTop: 16,
		paddingBottom: 16,
		borderColor: colours.grey,
		borderWidth: 1,
		borderRadius: 4,
		marginBottom: 24,
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