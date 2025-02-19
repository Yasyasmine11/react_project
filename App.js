// import React from "react";
// import RootTabNavigator from "./navigation/RootTabNavigator";
// import { Provider } from 'react-redux';
// import { store } from './store/store';

// export default App = () => {
//   return (
//     <Provider store={store}>
//       <RootTabNavigator />
//     </Provider>
//   );
// };



import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import DrawerNavigator from "./navigation/DrawerNavigator"; 

const App = () => {
  return (
    <Provider store={store}>
        <DrawerNavigator />  
    </Provider>
  );
};

export default App;

