import { createStackNavigator, createAppContainer } from 'react-navigation';

import PeoplePage from './src/pages/PeoplePage';
import PeopleDetailPage from './src/pages/PeopleDetailPage';

import { capitalizeFirstLetter } from './src/util';

const navigationHeader = {
	title: 'Pessoas!',
	headerMode: 'float',
		headerTintColor: 'black',
		headerStyle: {
			backgroundColor: '#6ca2f7',
			borderBottomWidth: 1,
			borderBottomColor: '#C5C5C5'
		},
		headerTitleStyle: {
			color: 'white',
			fontSize: 30,
			alignSelf: 'center',
		}
	}

const RootStack = createStackNavigator({
	'Main': {
		screen: PeoplePage, 
		navigationOptions: navigationHeader
	},
	'PeopleDetail': {
		screen: PeopleDetailPage,
		navigationOptions: ({ navigation }) => {
			const peopleName = capitalizeFirstLetter(
				navigation.state.params.people.name.first
			);
			return ({
				title: peopleName,
				headerMode: 'float',
				headerTintColor: 'black',
				headerStyle: {
					backgroundColor: '#6ca2f7',
					borderBottomWidth: 1,
					borderBottomColor: '#C5C5C5'
				},
				headerTitleStyle: {
					color: 'white',
					fontSize: 30,
					alignSelf: 'center'
				}
			});
		}
	},
}
);

const App = createAppContainer(RootStack);
export default App;