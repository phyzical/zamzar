import '../assets/scss/App.scss';
import React, {
  Component,
} from 'react';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import Home from './pages/Home.jsx';
import History from './pages/History.jsx';
import Settings from './pages/Settings.jsx';
import Header from './common/Header.jsx';
import Footer from './common/Footer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.onBodyClick = this.onBodyClick.bind(this);
  }

  onBodyClick() {
    if (this.props.menuOpen) {
      this.props.dispatch({
        type: 'APP/HIDE_MENU',
      });
    }
  }

  render() {
    return (
      <HashRouter>
        <div
          className="body"
          onClick={
            this.onBodyClick
          }
        >
          <Header />
          <div className="main uk-container">
            <Route
              path="/"
              exact
              component={
                Home
              }
            />
            {' '}
            <Route
              path="/history"
              component={
                History
              }
            />
            {' '}
            <Route
              path="/settings"
              component={
                Settings
              }
            />
            {' '}

          </div>
          {' '}
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

App.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect((state) => ({
  menuOpen: state.app.menuOpen,
}))(App);
