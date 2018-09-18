import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import AuthScreen from "./src/screens/Auth/Auth";
import UserProfile from './src/screens/UserProfile/UserProfile';
import AllUsers from './src/screens/AllUsers/AllUsers';
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import configureStore from "./src/store/configureStore";

const store = configureStore();

// Register Screens
Navigation.registerComponent(
    "awesome-places.AuthScreen",
    () => AuthScreen,
    store,
    Provider
);
Navigation.registerComponent(
	"awesome-places.UserProfile",
	() => UserProfile,
	store,
	Provider
);
Navigation.registerComponent("awesome-places.AllUsers", 
	() => AllUsers,
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