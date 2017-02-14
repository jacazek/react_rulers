
import React from 'react';
import {connect} from 'react-redux';
import Ruler from './Ruler.jsx';
import GridLines from './Grid.jsx';

const pixelsPerQuarterInch = 24;

const containerStyle =   {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    position: 'relative'
};

const style = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    top: 0,
    left: 0
};

const mapStateToProps = (state) => {
    const { showGridlines, showGuides, showRulers } = state.snapping;
    return {
        mousePosition: state.mousePosition,
        pages: state.pages,
        showGridlines,
        showGuides,
        showRulers
    };
};

const Rulers = React.createClass({
    getInitialState() {
        return {
            verticalScrollTop: 0,
            container: { offsetTop: 0, offsetLeft: 0 }
        };
    },
    componentDidMount() {
        const rect = this.refs.snappingContainer;
        this.setState(Object.assign({}, this.state, {
            container: { 
                offsetTop: rect.offsetTop, 
                offsetLeft: rect.offsetLeft 
                
            }
        })); 
    },
    handleScroll(e) {
        this.setState(Object.assign({}, this.state, {verticalScrollTop: e.target.scrollTop})); 
        //this.refs.verticalRuler.scrollTop = e.target.scrollTop;
    },
    render() {
        const container = this.state.container;
        console.log(container);
        const mousePosition = this.props.mousePosition;
        // not dynamic enough.. should not have direct access to page
        const pages = Object.keys(this.props.pages).map((key) => {
            return this.props.pages[key];
        });
        let gridlines = [];
        if (this.props.showGridlines) {
            gridlines = pages.map((page) => {
                return [
                <GridLines className='gridlines horizontal-gridlines' style={{position: 'absolute', top: page.offsetTop, left: page.offsetLeft, height: page.height,  width: page.width  }} ticks={page.width/pixelsPerQuarterInch} />,
                <GridLines className='gridlines vertical-gridlines' style={{ position: 'absolute', top: page.offsetTop, left: page.offsetLeft, width: page.width, height: page.height }} ticks={page.height/pixelsPerQuarterInch} />];
            });
        }
        const page = this.props.pages['1'];
        const page2 = this.props.pages['2'];
        let guides = [];
        let rulers = [];
        //let gridlines = [];
        const verticalRulerHeight = page2.offsetTop + page2.height - page.offsetTop;
        rulers = [
            <div className='ruler-container horizontal'>
                <Ruler className='ruler horizontal-ruler' style={{position: 'absolute', left: page.offsetLeft, width: page.width + pixelsPerQuarterInch, height: '.25in' }} ticks={page.width/pixelsPerQuarterInch}/>
            </div>,
            <div className='ruler-container vertical' style={{top: -this.state.verticalScrollTop }}>
                {pages.map((page) => {
                    return (<Ruler className='ruler vertical-ruler' style={{ position: 'absolute', top: page.offsetTop, height: page.height, width: '.25in' }} ticks={page.height/pixelsPerQuarterInch}/>);  
                })}
            </div>];
        if (mousePosition.x != 0 || mousePosition.y != 0) {
            
            guides = [
                <hr className='ruler-guide' style={{top:container.offsetTop, left: mousePosition.x, height: mousePosition.y}}/>,
                <hr className='ruler-guide' style={{top:mousePosition.y, left: 0, width: mousePosition.x}} />];
        }
        
       return (<div style={style} ref='snappingContainer'>
            <div style={containerStyle} onScroll={this.handleScroll}>
                {this.props.children}
            </div>
            <div ref='gridlinecontainer' className='gridline-container' style={{position: 'absolute', top: -this.state.verticalScrollTop, left:0}}>
                {gridlines}
            </div>
            {rulers}
           {guides}
       </div>);
    } 
});

export default connect(mapStateToProps)(Rulers);
