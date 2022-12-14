import { NavigationContainer } from "@react-navigation/native";
import tw from "twrnc";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/Store/store";
import AuthStack from "./src/Screens/authStack";
import "react-native-gesture-handler";
import { useEffect } from "react";
// import BackgroundActivity from "./src/Screens/backgroundActivity";

export default function App() {
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     if (!state.isConnected) {
  //       toast.error("Connection error. Check your internet connection");
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer style={tw`bg-white`}>
          <PaperProvider>
            <AuthStack />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
