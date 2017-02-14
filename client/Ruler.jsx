import React from 'react';

const Ruler = React.createClass({
    render() {
        const rules = [];
        const  { ticks } = this.props;
        let i = 1;
        for (i = 1; i <= ticks + 1; i++) {
            const key = i;
            const value = (i-1)%4 > 0 ? '' : <span className='tick-label'>{(i-1)/4}</span>;
            rules.push(<li key={key}><hr className='tick' />{value}</li>);
        }
        return <div {...this.props}><ul>
            {rules}
        </ul></div>;
    }
});

export default Ruler;
