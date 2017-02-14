import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        onMouseMove(event) {
            dispatch({
                type: 'PAGE_MOUSE_POSITION',
                payload: {
                    x: event.clientX,
                    y: event.clientY
                }
            });
        },
        onMouseLeave(event) {
            dispatch({
                type: 'PAGE_MOUSE_POSITION',
                payload: {
                    x: 0,
                    y: 0
                }
            });
        },
        updatePage(index, data) {
            dispatch({
                type: 'UPDATE_PAGE',
                index,
                payload: data
            });
        }
    }
}

const styles = {
    margin: '50px auto',
    width: '8.5in',
    height: '11in',
    backgroundColor: 'white',
    boxShadow: '10px 5px 5px darkgray'
};

const Page = React.createClass({
    getInitialState() {
        return {
            offsetTop: 0,
            offsetLeft: 0
        };
    },
    componentDidMount() {
        this.throttledHandleResize = _.debounce(this.handleResize, 100);
		window.addEventListener('resize', this.throttledHandleResize);
		this.throttledHandleResize();
		
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.throttledHandleResize);  
    },
    handleResize() {
        const { offsetTop: newTop, offsetLeft: newLeft, offsetWidth: width, offsetHeight: height } = this.refs.page;
		let top = this.state.offsetTop;
		let left = this.state.offsetLeft;
		
		if (top !== newTop || left !== newLeft) {
			this.props.updatePage(this.props.index, { offsetTop: newTop, offsetLeft: newLeft, width, height });
		}
    },
    render() {
        const { onMouseLeave, onMouseMove } = this.props;
        const props = {
            onMouseMove,
            onMouseLeave
        };
        return <div ref={'page'} {...props} style={styles}>{this.props.children}</div>;
    }
});

export default connect(null, mapDispatchToProps)(Page);
