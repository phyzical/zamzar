import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uikit from 'uikit';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }

  showMenu() {
    const { dispatch } = this.props;
    uikit.offcanvas('#offcanvas-slide')
      .show();
    dispatch({
      type: 'APP/SHOW_MENU',
    });
  }

  hideMenu() {
    const { dispatch } = this.props;
    uikit.offcanvas('#offcanvas-slide')
      .hide();
    dispatch({
      type: 'APP/HIDE_MENU',
    });
  }

  render() {
    const { menuOpen } = this.props;

    return (
      <div
        className="header"
        uk-sticky="show-on-up: true; animation: uk-animation-slide-top; bottom: #bottom"
      >
        <nav
          className="uk-navbar-container uk-navbar-transparent"
          uk-navbar="uk-navbar"
        >
          <span
            hidden={menuOpen}
            uk-icon="menu"
            className="uk-navbar-right"
            role="button"
            label="Menu"
            onClick={this.showMenu}
            onKeyDown={this.showMenu}
            tabIndex={0}
          />
        </nav>
        <div
          id="offcanvas-slide"
          uk-offcanvas="flip: true; mode: reveal"
        >
          <div
            className="uk-offcanvas-bar"
            onClick={this.hideMenu}
            onKeyDown={this.hideMenu}
            role="button"
            label="Menu"
            tabIndex={0}
          >
            <div className="left-menu-border" />
            <ul
              className="uk-nav uk-nav-default"
            >
              <li>
                <Link to="/">Home</Link>
                <Link to="/history">History</Link>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({
  menuOpen: state.app.menuOpen,
}))(Header);
