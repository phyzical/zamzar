import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import uikit from 'uikit'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Header extends Component {
    constructor(props) {
        super(props);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    showMenu() {
        uikit.offcanvas('#offcanvas-slide').show();
        this.props.dispatch({
            type: 'APP/SHOW_MENU'
        })
    }

    hideMenu() {
        uikit.offcanvas('#offcanvas-slide').hide()
        this.props.dispatch({
            type: 'APP/HIDE_MENU'
        })
    }

    render() {
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
                        hidden={this.props.menuOpen}
                        uk-icon="menu"
                        className='uk-navbar-right'
                        onClick={this.showMenu}
                    />
                </nav>
                <div
                    id="offcanvas-slide"
                    uk-offcanvas="flip: true; mode: reveal"
                >
                    <div className="uk-offcanvas-bar">
                        <div className="left-menu-border" />
                        <ul className="uk-nav uk-nav-default">
                            <li
                                onClick={this.hideMenu}
                            >
                                <Link to="/">Home</Link>
                                <Link to="/history">History</Link>
                                <Link to="/settings">Settings</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
    menuOpen: state.app.menuOpen
}))(Header)
