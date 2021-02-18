import React from "react";
import { I18nManager } from "react-native";
import Route from "./routes/index.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persister, store } from "./redux";
import I18n from "./translation";
console.disableYellowBox = true;

class App extends React.Component {
  componentDidMount = () => {
    console.log('I18nManager.isRTL===', I18nManager.isRTL)
    if (I18nManager.isRTL) {
      I18n.locale = "ar";
    } else {
      I18n.locale = "en";
    }
  };
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <Route />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
