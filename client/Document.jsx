import React from 'react';

const style = {
    backgroundColor: 'lightgray',
    padding: 20
};

const Document = React.createClass({
    render() {
        return <div style={style}>{this.props.children}</div>;
    }
});

export default Document;
