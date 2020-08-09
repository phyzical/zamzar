import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadComponent from '../common/UploadComponent';

class Home extends Component {
  render() {
    const { currentQueue } = this.props;

    const currentQueueList = currentQueue.map((item, i) => (
      <div
        key={`queue-${i}`}
      >
        <p>{item.name}</p>
      </div>
    ));

    return (
      <div className="home">
        <h1 className="uk-text-center">Zamzar</h1>
        <UploadComponent />
        <div>
          {currentQueueList}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  currentQueue: PropTypes.arrayOf(PropTypes.shape({})),
  dispatch: PropTypes.func.isRequired,
};
Home.defaultProps = {
  currentQueue: [
    { input: 'doc', file: 'test.pdf', name: 'test' },
    { input: 'pdf', file: 'test2.pdf', name: 'test2' },
  ],
};
export default connect((state) => ({
}))(Home);
