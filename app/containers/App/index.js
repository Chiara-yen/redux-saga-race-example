import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.styl';
import * as actions from '../../actions';
import Race from '../../components/Race'

class App extends Component {
	constructor(props) {
	  super(props)
	}

	render() {
		const { v1, v2, msg, status, ...actions } = this.props;
		return(
			<div>
				<Race v1={v1} v2={v2} msg={msg} status={status} actions={actions} />
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		v1: state.default.v1,
		v2: state.default.v2,
		msg: state.default.msg,
		status: state.default.status,
	}
}

export default connect(mapStateToProps,{
	start: actions.start,
	reset: actions.reset,
})(App);