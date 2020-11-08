import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { checkRole } from 'utils';

class Can extends React.Component {
    static propTypes = {
        roles: PropTypes.array.isRequired
    }

    static defaultProps = {
        roles: []
    }

    render() {
        const {roles, auth: {userInfo}, children} = this.props;
        if(checkRole(roles, userInfo.permissions))
            return children;
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    };
}

export default connect(
    mapStateToProps,
)(Can);
