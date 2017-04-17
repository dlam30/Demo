import React, { Component } from 'react'

import {
   StyleSheet,
   Text,
   Navigator,
   TouchableOpacity,
   TouchableHighlight,
   StatusBar
} from 'react-native'

import Index from './DemoIndex'
//import Login from './DemoLogin'

import MyPickups from './Hauler/MyPickups'

import MyListings from './Poster/MyListings'
import NewListing from './Poster/NewListing'
import NewListingContinued from './Poster/NewListingContinued'
import ItemList from './Poster/ItemList'

import DemoItem from './Item/DemoItem'
import ItemPage from './Item/ItemPage'
import ItemPagePickup from './Item/ItemPagePickup'

import DemoInbox from './Inbox/DemoInbox'

import ProfilePageHauler from './Profile/ProfilePageHauler'
import ProfilePagePoster from './Profile/ProfilePagePoster'

import Root from './Root'
import Login from './Login/Login'
import Map from './Map/Map'
import Register from './Login/Register'
import Camera from './Camera/Camera'


export default class Route extends Component {
    render() {
        return (
            <Navigator
                initialRoute = {{ title: 'LoginScreen', name: 'Login' }}
                renderScene = { this.renderScene }
                style={{paddingBottom: 0}} //FIXME: Sloppy way to prevent nav bar from overlaying contents
                /*navigationBar={
								<Navigator.NavigationBar
									routeMapper={{
									  LeftButton: (route, navigator, index, navState) =>
									  {
										    if (route.title == "LoginScreen") {
										      return null;
										    } else {
										      return (
										        <TouchableHighlight onPress={() => navigator.pop()}>
										          <Text>Back</Text>
										        </TouchableHighlight>
										      );
										    }
										},
									  RightButton: (route, navigator, index, navState) =>
									  {
                                        //return null;
                                         return (
										        <TouchableHighlight onPress={() => navigator.pop()}>
										          <Text>Forward</Text>
										        </TouchableHighlight>
										      );
                                        }, //TODO: use for DONE button on posting
									  Title: (route, navigator, index, navState) =>
									   { return (<Text>{route.title}</Text>); },
									}}
									style={{backgroundColor: 'red', bottom: 0, top: null}}
									/>

						  }*/
            />
        );
    }

    renderScene(route, navigator) {
        if (route.name == 'Login') {
            return (
                <Login
                    navigator = { navigator }
                    {...route.passProps}
                />
            )
        }

    {/*Routes*/}
        if (route.name =='Camera') {
          return (
            <Camera
              navigator = { navigator }
              {...route.passProps}
            />
          )
        }
        if (route.name == 'Map') {
            return (
                <Map
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'Register') {
            return (
                <Register
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'MyPickups') {
            // console.log("in Router to MyPickups" + route.username);
            return (
                <MyPickups
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'DemoInbox') {
            // console.log("in Router to MyPickups" + route.username);
            return (
                <DemoInbox
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'Root') {
            // console.log("in Router to Root" + route.username);
            return (
                <Root
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }


    {/*Poster Routes*/}

        if (route.name == 'MyListings') {
            // console.log("in Router " + route.username);
            return (
                <MyListings
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }
        if (route.name == 'NewListing') {
            // console.log("in Router " + route.username);
            return (
                <NewListing
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }
        if (route.name == 'NewListingContinued') {
            // console.log("in Router to NewListingContinued " + route.username);
            return (
                <NewListingContinued
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

    {/*Item Routes*/}

        if (route.name == 'DemoItem') {
            // console.log("in Router to DemoItem" + route.username);
            return (
                <DemoItem
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'ItemPage') {
            // console.log("in Router to ItemPage" + route.username);
            return (
                <ItemPage
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'ItemPagePickup') {
            // console.log("in Router to ItemPagePickup" + route.username);
            return (
                <ItemPagePickup
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'ItemList') {
            // console.log("in Router to ItemList" + route.username);
            return (
                <ItemList
                    navigator = { navigator }
                    // username = { route.username }
                    {...route.passProps}
                />
            )
        }

        {/*Profile Routes*/}

        if (route.name == 'ProfilePageHauler') {
            // console.log("in Router to ProfilePageHauler" + route.username);
            return (
                <ProfilePageHauler
                    navigator = { navigator }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'ProfilePagePoster') {
            // console.log("in Router to ProfilePagePoster" + route.username);
            return (
                <ProfilePagePoster
                    navigator = { navigator }
                    {...route.passProps}
                />
            )
        }
    }
}
