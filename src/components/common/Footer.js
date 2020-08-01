import React, { Component } from 'react'
import { appVersion } from '../../helpers/config'

class Footer extends Component {
    currentYear() {
        return new Date().getFullYear();
    }
    render() {
        return (
            <footer className="footer uk-padding-small">
                <div className="uk-container uk-container-expand uk-flex uk-flex-center">
                    <ul className="uk-list">
                        <li
                            className="uk-visible"
                        >
                            &copy; {this.currentYear()} Jack Carpenter
                        </li>
                        <li>
                            version: {appVersion}
                        </li>
                    </ul>
                </div>
            </footer>
        )
    }
}
export default Footer
