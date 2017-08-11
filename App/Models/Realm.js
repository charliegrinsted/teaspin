import Realm from 'realm';

class Person extends Realm.Object {}
Person.schema = {
	name: 'Person',
	primaryKey: 'id',
	properties: {
		id: 'int',
		name: 'string',
		photo: 'string',
		completedSpins: {
			type: 'linkingObjects',
			objectType: 'Spin',
			property: 'participants'
		}
	}
};

class Spin extends Realm.Object {}
Spin.schema = {
	name: 'Spin',
	primaryKey: 'id',
	properties: {
		id: 'int',
		type: 'string',
		dateInitiated: 'date',
		loser: {
			type: 'Person'
		},
		participants: {
			type: 'list',
			objectType: 'Person',
		},
	}
};

export default new Realm({schema: [Person, Spin]});
