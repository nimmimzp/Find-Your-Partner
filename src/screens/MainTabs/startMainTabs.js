import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = (props) => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-people" : "ios-people", 30,"#000"),
        Icon.getImageSource(Platform.OS === 'android' ? "md-person" : "ios-person", 30,"#000"),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30,"#000"),
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30,"#000"),
        Icon.getImageSource(Platform.OS === 'android' ? "md-heart-half" : "ios-heart-half", 30,"#000"),
        Icon.getImageSource(Platform.OS === 'android' ? "md-flag" : "ios-flag", 30,"#000")
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                
                {
                    screen: "FYP.ProfileScreen",
                    label: "Profile",
                    title: "User Profile",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "FYP.StateScreen",
                    label: "Howntown",
                    title: "Hometown",
                    icon: sources[3],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "FYP.ReligionScreen",
                    label: "Religion",
                    title: "Religion",
                    icon: sources[5],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "awesome-places.FindPlaceScreen",
                    label: "Matches",
                    title: "Matches",
                    icon: sources[4],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: '#fff',
                tabBarBackgroundColor: '#fff',
                initialTabIndex:0,
            },
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawer"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "#dea732",
                tabBarBackgroundColor: '#900612',
                tabBarButtonColor: '#ffffff',
                tabFontSize:14,
                selectedTabFontSize:18,
            },
            passProps:{
                userData:props
            }
        });
    });
};

export default startTabs;

export const friendsTabs = (props,receivedRequestUserDetail,allYourMatched,authUserKey) =>{
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-people" : "ios-people", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-contact" : "ios-contact", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                
                {
                    screen: "FYP.SendInterestScreen",
                    label: "Your Intrest",
                    title: "Your Intrest",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                
                {
                    screen: "FYP.ReceiveRequestScreen",
                    label: "Recivied Request",
                    title: "Recived Request",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "FYP.AllMatchedIntrest",
                    title: "Your Perfect Match",
                    label: "Match",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: "#dea732",
                initialTabIndex:0,
            },
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawer"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "#dea732"
            },
            passProps:{
                places:props,
                receivedRequest:receivedRequestUserDetail,
                authUserKey:authUserKey,
                allYourMatched:allYourMatched
            }
        });
    });
}