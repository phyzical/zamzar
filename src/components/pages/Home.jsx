import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrow from '../../assets/images/arrow-1.svg';
import UploadComponent from '../common/UploadComponent';

class Home extends Component {
  render() {
    const { outputFormats, inputFormats, currentQueue } = this.props;

    const inputOptions = inputFormats.map((inputFormat, i) => (
      <p
        key={`input-${i}`}
      >
        {inputFormat}

      </p>
    ));

    const outputOptions = outputFormats.map((outputFormat, i) => (
      <p
        key={`output-${i}`}
      >
        {outputFormat}

      </p>
    ));

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
  currentQueue: PropTypes.array,
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
