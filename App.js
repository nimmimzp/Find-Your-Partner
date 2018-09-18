import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";
import UserProfile from './src/screens/UserProfile/UserProfile';
import AllUsers from './src/screens/AllUsers/AllUsers';
// Register Screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("awesome-places.UserProfile", () => UserProfile);
Navigation.registerComponent("awesome-places.AllUsers", () => AllUsers);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});