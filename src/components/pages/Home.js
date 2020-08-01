import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import arrow from '../../assets/images/arrow-1.svg';

class Home extends Component {
    render() {
        const { outputFormats, inputFormats, currentQueue } = this.props

        const inputOptions = inputFormats.map((inputFormat, i) => (
            <p
                key={`input-${i}`}
            >{inputFormat}</p>
        ))

        const outputOptions = outputFormats.map((outputFormat, i) => (
            <p
                key={`output-${i}`}
            >{outputFormat}</p>
        ))

        const currentQueueList = currentQueue.map((item, i) => (
            <div
                key={`queue-${i}`}
            >
                <p>{item.name}</p>
            </div>
        ))

        return (
            <div className="home">
                <h1 className="uk-text-center">Zamzar</h1>
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
                <div>
                    {currentQueueList}
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    currentQueue: PropTypes.array,
    inputFormats: PropTypes.array,
    outputFormats: PropTypes.array,
    dispatch: PropTypes.func.isRequired
}
Home.defaultProps = {
    currentQueue: [{ file: 'test.pdf', name: 'test' }, { file: 'test2.pdf', name: 'test2' }],
    outputFormats: ['test1', 'test2'],
    inputFormats: [
        'epub',
        'pdf',
        'csv'
    ],

}
export default connect()(Home)
