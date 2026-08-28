/* eslint-disable react/jsx-filename-extension */
import './styles/index.css';

import React, { useState } from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SplashScreen from './components/SplashScreen';
import { Notification } from './components/Notification';
import store, { persistor } from './redux/store';
import reportWebVitals from './reportWebVitals';
import Router from './router';

const App = () => {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem("splashShown"));

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      {!showSplash && (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Router />
            <Notification />
          </PersistGate>
        </Provider>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
