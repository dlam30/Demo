import React, { Component } from 'react'

import {
   StyleSheet,
   Text,
   Navigator,
   TouchableOpacity,
   TouchableHighlight
} from 'react-native'

import Index from './DemoIndex'
import Login from './DemoLogin'

import MyPickups from './Hauler/MyPickups'

import MyListings from './Poster/MyListings'
import NewListing from './Poster/NewListing'
import NewListingContinued from './Poster/NewListingContinued'
import ItemList from './Poster/ItemList'

import ItemPage from './Item/DemoItem'
import DemoItem from './Item/ItemPage'

import Root from './Root'



export default class DemoRoute extends Component {
    render() {
        return (
            <Navigator
                initialRoute = {{ title: 'Index', name: 'Index' }}
                renderScene = { this.renderScene }
                style={{paddingTop: 56}} //FIXME: Sloppy way to prevent nav bar from overlaying contents
                navigationBar={
								<Navigator.NavigationBar
									routeMapper={{
									  LeftButton: (route, navigator, index, navState) =>
									  {
										    if (route.title == "Index") {
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
									   { return null; }, //TODO: use for DONE button on posting
									  Title: (route, navigator, index, navState) =>
									   { return (<Text>{route.title}</Text>); },
									}}
									style={{backgroundColor: 'orange'}}
									/>
						  }
            />
        );
    }

    renderScene(route, navigator) {
        if (route.name == 'Index') {
            return (
                <Index
                    navigator = { navigator }
                    {...route.passProps}
                />
            )
        }

    {/*Hauler Routes*/}

        if (route.name == 'MyPickups') {
            // console.log("in Router to MyPickups" + route.username);
            return (
                <MyPickups
                    navigator = { navigator }
                    username = { route.username }
                    // {...route.passProps}
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
            // console.log("in Router to DemoItem " + route.username);
            return (
                <DemoItem
                    navigator = { navigator }
                    {...route.passProps}
                />
            )
        }

        if (route.name == 'ItemPage') {
            // console.log("in Router to ItemPage " + route.username);
            return (
                <ItemPage
                    navigator = { navigator }
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
    }
}
