import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = (props) => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-people" : "ios-people", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-contact" : "ios-contact", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                
                {
                    screen: "FYP.ProfileScreen",
                    label: "User Profile",
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
                    label: "Your Howntown",
                    title: "Hometown",
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
                    screen: "FYP.ReligionScreen",
                    label: "About Your Religion",
                    title: "Religion",
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
                    screen: "awesome-places.FindPlaceScreen",
                    label: "All Users",
                    title: "All Users",
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
                tabBarSelectedButtonColor: "orange",
                initialTabIndex:0,
            },
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawer"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "orange"
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
                tabBarSelectedButtonColor: "orange",
                initialTabIndex:0,
            },
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawer"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "orange"
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