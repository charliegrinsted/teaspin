import { Navigation } from 'react-native-navigation';

const self = {
	openOverlay: () => {

	}
}
const NavigationHelper = {
	onNavigatorEvent: ( event ) => {
		if ( event.type == 'NavBarButtonPress' ) {
			if ( event.id == 'menu' ) {
				self.openOverlay();
			}
		}
	}
}
module.exports = { NavigationHelper }