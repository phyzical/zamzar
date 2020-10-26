import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrow from '../../assets/images/arrow-1.svg';

class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInput: null,
    };
  }

  selectInput(val) {
    this.setState({
      selectedInput: val,
    });
  }

  render() {
    const {
      inputs,
      outputs,
    } = this.props;

    const {
      selectedInput,
    } = this.state;

    const inputOptions = inputs.map((inputFormat) => (
      <p
        key={`input-${inputFormat}`}
        onClick={() => this.selectInput(inputFormat)}
      >
        {inputFormat}
      </p>
    ));
    const selectedOutput = outputs.find((output) => output.name === selectedInput);
    const outputOptions = selectedOutput ? selectedOutput.targets.map(({ name }) => (
      <p
        key={`output-${name}`}
      >
        {name}
      </p>
    )) : null;

    return (
      <div
        className="uk-flex uk-child-width-1-3"
        uk-grid=""
      >
        <div className="uk-inline">
          <button className="uk-button uk-button-default" type="button">{selectedInput || 'Input Format'}</button>
          <div uk-dropdown="mode: click">
            {inputOptions}
          </div>
        </div>
        <div className="arrow">
          <img
            data-src={arrow}
            alt="arrow"
            width=""
            height=""
            uk-svg=""
          />
        </div>
        <div className="uk-inline">
          <button disabled={!selectedInput} className="uk-button uk-button-default" type="button">Output Format</button>
          <div uk-dropdown="mode: click">
            {outputOptions}
          </div>
        </div>
      </div>
    );
  }
}

UploadComponent.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.string),
  outputs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    targets: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      cost: PropTypes.number,
    })),
  })),
  dispatch: PropTypes.func.isRequired,
};
UploadComponent.defaultProps = {
  inputs: [],
  outputs: [],
};
export default connect((state) => ({
  inputs: state.home.inputs,
  outputs: state.home.outputs,
}))(UploadComponent);
