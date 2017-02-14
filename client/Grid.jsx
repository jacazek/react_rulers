/*
    Given width height top left and tick count
    Draw a grid
*/

import React from 'react';

const GridLines = React.createClass({
    render() {
        const rules = [];
        const  { ticks } = this.props;
        console.log(ticks);
        let i = 1;
        for (i = 1; i < ticks; i++) {
            const key = i;
            rules.push(<li key={key}><div className='gridline' /></li>);
        }
        return <div {...this.props}><ul>
            {rules}
        </ul></div>;
    }
});

export default GridLines;