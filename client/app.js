/*
    Main app
        Scroll area
            Pages
            Rulers (make full width and height.  Let the scroll with the container.  Fixed to viewport?  that would be easier.)
                Horizontal ruler
                Vertical ruler
                
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import Document from './Document.jsx';
import Page from './Page.jsx';
import Rulers from './Rulers.jsx';

const style = {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    position: 'relative',
};

const data = { 
    mousePosition: { x:0, y:0, height: 0, width: 0 },
    pages: { '1': { offsetLeft: 0, offsetTop: 0, height: 0, width: 0 }, '2': { offsetLeft: 0, offsetTop: 0 } },
    snapping: {
        showGridlines: true,
        showRulers: true,
        showGuides: true,
    }
};

const app = (store = data, action) => {
    let retval = store;
    switch (action.type) {
        case "PAGE_MOUSE_POSITION":
            retval = Object.assign({}, store, {
                mousePosition: action.payload
            });
        break;
        case "UPDATE_PAGE":
            retval = Object.assign({}, store, {
                pages: Object.assign({}, store.pages, {
                    [action.index]: action.payload
                })
            });
        break;
        case "UPDATE_SNAPPING":
            retval = Object.assign({}, store, {
               snapping: Object.assign({}, store.snapping, action.payload) 
            });
        break;
    }
    return retval;
};

const store = createStore(app);

const ToggleGrid = connect(
    null,
    (dispatch) => {
        return {
            updateSnapping: (showGridlines) => {
                dispatch({
                    type: 'UPDATE_SNAPPING',
                    payload: {
                        showGridlines
                    }
                });
            }
        };
    })(React.createClass({
        getInitialState() {
            return {
                showGridlines: true
            }
        },
        handleClick() {
            const newState = !this.state.showGridlines;
            this.setState({ showGridlines: newState });
            this.props.updateSnapping(newState);
        },
    render() {
        return <button {...this.props} onClick={this.handleClick} style={{position: 'fixed', top: 0, right: 10}}>Toggle Grid</button>;
    }
}));

const App = React.createClass({
   render() {
       return (
        <Provider store={store}>
        <div>
            
            <div style={{position:'relative'}}>
            <Rulers style={style}>
                <Document>
                    <Page index={1}>This is page 1</Page>
                    <Page index={2}>This is page 2</Page>
                </Document>
                <ToggleGrid />
            </Rulers>
            
            </div>
            
            </div>
        </Provider>);
   } 
});

ReactDOM.render(<App />, document.getElementById('myapp'));
