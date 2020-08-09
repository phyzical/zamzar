import React, {
  Component,
} from 'react';

class UploadComponent extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div
        className="uk-flex uk-child-width-1-3"
        uk-grid=""
      >
        <div className="uk-inline">
          <button className="uk-button uk-button-default" type="button">Input Format</button>
          <div uk-dropdown="mode: click">
            {inputOptions}
          </div>
        </div>
        <div className="arrow">
          <img
            data-src={arrow}
            width=""
            height=""
            uk-svg=""
          />
        </div>
        <div className="uk-inline">
          <button className="uk-button uk-button-default" type="button">Output Format</button>
          <div uk-dropdown="mode: click">
            {outputOptions}
          </div>
        </div>
      </div>
    );
  }
}

UploadComponent.propTypes = {
  selectedInput: PropTypes.string.isRequired,
  inputFormats: PropTypes.array,
  outputFormats: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
};
UploadComponent.defaultProps = {
  outputFormats: {
    in1: {
      outputs: ['out1', 'out2'],
    },
    in2: {
      outputs: ['out3', 'out4'],
    },
  },
  selectedInput: 'in1',
  inputFormats: ['in1', 'in2'],
};
export default connect((state) => ({
  // selectedInput: state.home.selectedInput,
  // inputFormats: state.home.inputs,
  // outputFormats: state.home.outputs
}))(UploadComponent);
