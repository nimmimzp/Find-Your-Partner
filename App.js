import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import AuthScreen from "./src/screens/Auth/Auth";
import FirstScreen  from "./src/screens/FirstScreen/FirstScreen";
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import SecondScreen from './src/screens/SecondScreen/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen/ThirdScreen';
//import UserProfile from './src/screens/UserProfile/UserProfile';
//import AllUsers from './src/screens/AllUsers/AllUsers';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen  from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import configureStore from "./src/store/configureStore";

const store = configureStore();

// Register Screens

Navigation.registerComponent(
    "FYP.FirstScreen",
    () => FirstScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "FYP.SecondScreen",
    () => SecondScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "FYP.ThirdScreen",
    () => ThirdScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "FYP.ProfileScreen",
    () => ProfileScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.AuthScreen",
    () => AuthScreen,
    store,
    Provider
);
Navigation.registerComponent(
	"awesome-places.FindPlaceScreen",
	() => FindPlaceScreen,
	store,
	Provider
);
Navigation.registerComponent("awesome-places.SharePlaceScreen", 
	() => SharePlaceScreen,
	store,
	Provider
);

Navigation.registerComponent(
	"awesome-places.PlaceDetailScreen",
	() => PlaceDetailScreen,
	store,
	Provider
);
Navigation.registerComponent(
	"awesome-places.SideDrawer",
	() => SideDrawer
);

// Start a App
Navigation.startSingleScreenApp({
	screen: {
		screen: "awesome-places.AuthScreen",
		title: "Login"
	}
});