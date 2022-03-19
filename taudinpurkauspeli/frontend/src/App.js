import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { initializeCasesAndUser } from './App/case/casesReducer';
import Navigationbar from './App/navigation/Navbar';
import Sidebar from './App/navigation/Sidebar';
import Routing from './App/navigation/Routing';
import MessageBanner from './utils/MessageBanner';
import Footer from './App/navigation/Footer';

const App = () => {
  const dispatch = useDispatch();

  /* istanbul ignore next */
  React.useEffect(() => {
    dispatch(initializeCasesAndUser());
  }, []);

  return (
    <Router>
      <Navigationbar />
      <Sidebar />
      <MessageBanner />
      <Routing />
      <Footer />
    </Router>
  );
};

export default (App);
