import Realm from 'realm';
var RNFS = require( 'react-native-fs' );
import styles from '../Styles/Main';

const path = RNFS.DocumentDirectoryPath + '/';

const RealmHelper = {
	createRealm: ( schema ) => {
		return new Realm({schema: [schema]});
	},
	deleteAll: ( realm ) => {
		realm.write(() => {
			realm.deleteAll();
		} );
	},
	addPerson: ( realm, name, photo, teaPreference ) => {
		var randomisedPersonId = Math.random().toString( 36 ).substr( 2, 9 );
		realm.write(() => {
			realm.create( 'Person', {
				id: randomisedPersonId,
				name: name,
				photo: photo,
				teaPreference: teaPreference,
			}, true );
		} );
	},
	startSpin: ( realm, type ) => {
		var randomisedPresentationId = Math.random().toString( 36 ).substr( 2, 9 );
		var dateInitiated = Date.now();
		realm.write(() => {
			realm.create( 'Presentation', {
				id: randomisedPresentationId,
				title: title,
				dateCreated: Date.now()
			}, true );
		} );
		return randomisedPresentationId;
	},
	deletePresentation: ( realm, id ) => {
		let presentation = realm.objectForPrimaryKey( 'Presentation', id );
		realm.write(() => {
			realm.delete( presentation );
		} );
	},
	addProjectsToPresentation: ( realm, presentation, projectsToAdd ) => {
		realm.write( () => {
			let updatedPresentation = realm.create( 'Presentation', {
				id: presentation.id,
				projects: [],
			}, true );
			let projectList = updatedPresentation.projects;
			for ( let i = 0; i < projectsToAdd.length; i++ ) {
				let project = realm.objectForPrimaryKey( 'Project', projectsToAdd[i] );
				projectList.push( project );
			}
		} );
	},
	setSections: ( realm, object, context ) => {
		for ( let i = 0; i < object.length; i++ ) {
			var fullImageURL = 'https://one-works.com' + object[i].app_thumbnail.path;
			var fileNameToStore = object[i].id + '_SectionThumbnail.jpg';
			FileSystemHelper.downloadImage( fullImageURL, fileNameToStore, context );
			realm.write(() => {
				realm.create( 'Section', {
					id: parseInt( object[i].id, 10 ),
					name: object[i].name,
					dateUpdated: parseInt( object[i].timestamp, 10 ),
					image: fileNameToStore,
				}, true );
			});
		}
	},
	setProjects: ( realm, allProjects, context ) => {
		setAllProjects( 0, allProjects );
		function writeProject( projectFromFeed, response ) {
			var projectCounter = projectFromFeed.counter;
			realm.write(() => {
				// Create initial project
				let project = realm.create( 'Project', {
					id: parseInt( projectFromFeed.id, 10 ),
					title: projectFromFeed.title,
					dateUpdated: parseInt( projectFromFeed.timestamp, 10 ),
					image: projectFromFeed.id + '_ProjectThumbnail.jpg',
					client: projectFromFeed.client,
					project_location: projectFromFeed.project_location,
					project_year: projectFromFeed.project_year,
					sections: [],
					slides: [],
				}, true );
				// Add list of sections
				var sectionList = project.sections;
				if ( projectFromFeed.project_sector_ids != null ) {
					for ( var sectionLoopCount = 0; sectionLoopCount < projectFromFeed.project_sector_ids.length; sectionLoopCount++ ) {
						let sectionToAdd = realm.objectForPrimaryKey( 'Section', projectFromFeed.project_sector_ids[sectionLoopCount] );
						if ( sectionToAdd ) {
							sectionList.push( sectionToAdd );
						}
					}
				}
				// Add slides
				if ( projectFromFeed.app_gallery != null ) {
					var slidesFromFeed = projectFromFeed.app_gallery.app_slides;
					var slideCounter = 0;
					setAllSlides( slideCounter, slidesFromFeed, project );
					projectCounter++;
					setAllProjects( projectCounter, allProjects );
				}
				else {
					projectCounter++;
					setAllProjects( projectCounter, allProjects );
				}
			});
		}
		function setAllSlides( slideCounter, slidesFromFeed, project ) {
			if ( slideCounter === undefined ) {
				slideCounter = 0;
			}
			if( slideCounter >= slidesFromFeed.length ) {
				return;
			}
			var thisSlide = slidesFromFeed[slideCounter];
			var thisSlideId = parseInt( '0000' + thisSlide.id, 10 );
			var existingSlide = realm.objectForPrimaryKey( 'Slide', thisSlideId );
			// need to check if the timestamp has changed here
			if ( !existingSlide ) {
				var slideFullImageURL = 'https://one-works.com' + thisSlide.path;
				var slideFileName = 'Slide_' + thisSlide.id + '.jpg';
				var slidePath = path + slideFileName;
				RNFS.downloadFile( {
					fromUrl: slideFullImageURL,
					toFile: slidePath,
				} )
				.promise.then( res => {
					realm.write(() => {
						project.slides.push( {
							id: thisSlideId,
							image: slideFileName,
							timestamp: thisSlide.timestamp
						} );
					} );
					slideCounter++;
					setAllSlides( slideCounter, slidesFromFeed, project );
				} )
				.catch( ( err ) => {
					console.log( err.message );
				} );
			}
			else {
				project.slides.push( existingSlide );
				slideCounter++;
				setAllSlides( slideCounter, slidesFromFeed, project );
			}
		};
		function setAllProjects( projectCounter, allProjects ) {
			if ( projectCounter === undefined ) {
				projectCounter = 0;
			}
			if( projectCounter >= allProjects.length ) {
				context.setState( {
					downloadProgress: 'Update complete',
					downloadProgressValue: 1,
					updateButtonStyle: styles.update__ButtonOuter,
					isUpdating: false,
				} );
				return;
			}
			var fullImageURL = 'https://one-works.com' + allProjects[projectCounter].app_thumbnail.path;
			var fileName = allProjects[projectCounter].id + '_ProjectThumbnail.jpg';
			var fileImagePath = path + fileName;
			var projectFromFeed = allProjects[projectCounter];
			projectFromFeed.counter = projectCounter;
			context.setState( {
				isUpdating: true,
				downloadProgress: 'Updating ' + projectCounter + ' of ' + allProjects.length,
				downloadProgressValue: ( projectCounter / allProjects.length ),
			} );
			RNFS.downloadFile( {
				fromUrl: fullImageURL,
				toFile: fileImagePath,
			} )
			.promise.then( writeProject.bind( null, projectFromFeed ) )
			.catch( ( err ) => {
				console.log( err.message );
			} );
		};
	},
	getMultipleObjectsAsArray: ( realm, objectName ) => {
		return realm.objects( objectName );
	}
}

module.exports = RealmHelper;