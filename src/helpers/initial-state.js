const inputs = [
    'doc',
    'epub',
    'pdf',
    'csv',
]
const initialState = {
    app: {
        menuOpen: false
    },
    home: {
        selectedInput: 'doc',
        inputs,
        outputs: inputs.reduce((acc, input) => {
            acc[input] = {
                outputs: []
            }
            return acc
        }, {}),
    },
    settings: {
        user: {}
    },
    history: {
        items: []
    },
    api: {

    }
}

export default initialState
