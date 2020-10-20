import React, { Component } from 'react';
import { appVersion } from '../../helpers/config';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: new Date()
        .getFullYear(),
    };
  }

  render() {
    const { currentYear } = this.state;
    return (
      <footer className="footer uk-padding-small">
        <div className="uk-container uk-container-expand uk-flex uk-flex-center">
          <ul className="uk-list">
            <li
              className="uk-visible"
            >
              &copy;
              {' '}
              {currentYear}
              {' '}
              Jack Carpenter
            </li>
            <li>
              version:
              {' '}
              {appVersion}
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}
export default Footer;
