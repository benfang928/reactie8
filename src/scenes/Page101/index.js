import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { increaseAction } from '../../action/action';
import { Link } from 'react-router';


export default class Page101 extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {num, onIncreaseClick} = this.props
		return (
			<div>
				 <h3>{num || 0}</h3>
	         	 <button onClick={onIncreaseClick}>添加</button>
         	 </div>
		);
	}
}
Page101.propTypes = {
    num: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { num } = state.num;
  return {
    num: num
  };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncreaseClick: () => {
      		dispatch(increaseAction);
    	}
    };
};
module.exports = connect(mapStateToProps, mapDispatchToProps)(Page101);


// const Home = React.createClass({
//   getInitialState: function() {
//     return {};
//   },
//   click: function() {
//     this.props.click(this.props.num || 0);
//   },
//   render() {
//     return (
//       <div>
//         <Link to="/">home</Link>
//         <h3>{this.props.num || 0}</h3>
//         <button onClick={this.click}>添加</button>
//       </div>
//     );
//   }
// });



// export default connect(mapResourceState, mapDispatchToProps)(Page101);
