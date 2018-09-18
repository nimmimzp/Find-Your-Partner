import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "awesome-places.AllUsers",
                    label: "All Users",
                    title: "All Users",
                    icon: sources[0]
                },
                {
                    screen: "awesome-places.UserProfile",
                    label: "User Profile",
                    title: "User Profile",
                    icon: sources[1]
                }
            ]
        });
    });
};

export default startTabs;