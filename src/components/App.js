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
import Home from './pages/Home';
import History from './pages/History';
import Settings from './pages/Settings';
import Header from './common/Header';
import Footer from './common/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.onBodyClick = this.onBodyClick.bind(this);
  }

  onBodyClick() {
    const { menuOpen, dispatch } = this.props;
    if (menuOpen) {
      dispatch({
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
          tabIndex={0}
          role="button"
          onKeyDown={this.onBodyClick}
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
            <Route
              path="/history"
              component={
                History
              }
            />
            <Route
              path="/settings"
              component={
                Settings
              }
            />
          </div>
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
