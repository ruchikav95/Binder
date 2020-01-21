<<<<<<< HEAD
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import WrappedRegistrationForm from "./components/Form"
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <WrappedRegistrationForm />
      </React.Fragment>
=======
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, getHistory } from 'modules/store';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RoutesComponent from 'view/shared/routes/RoutesComponent';
import { LocaleProvider } from 'antd';
import { getAntdLanguage } from 'i18n';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <LocaleProvider locale={getAntdLanguage()}>
        <Provider store={store}>
          <ConnectedRouter history={getHistory()}>
            <RoutesComponent />
          </ConnectedRouter>
        </Provider>
      </LocaleProvider>
>>>>>>> 2a09b523d5cda976f5ef8bb31f74ea05389f0f6b
    );
  }
}
