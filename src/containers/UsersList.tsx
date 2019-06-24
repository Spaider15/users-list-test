import * as React from 'react';
import { IUsers, IState } from '../state';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { getUsers } from '../state/actions';
import { ThunkDispatch } from 'redux-thunk';
import UsersList from '../components/UsersList/UsersList';

interface IStateToProps extends IUsers {}

interface IDispatchToProps {
    getUsersList(): void;
}

type IProps = IStateToProps & IDispatchToProps;

class UsersListContainer extends React.Component<IProps> {
    componentDidMount() {
        this.props.getUsersList();
    }
    render() {
        const {data, loading, error, getUsersList} = this.props;
        return(
            <UsersList users={data} loading={loading} error={error} getUsersList={getUsersList} />
        );
    }
};

export default connect<IStateToProps, IDispatchToProps>(
    (state: IState) => ({...state.users}),
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
        getUsersList: () => (dispatch(getUsers()))
    }),
)(UsersListContainer)
