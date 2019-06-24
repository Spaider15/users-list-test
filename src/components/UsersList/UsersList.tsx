import * as React from 'react';
import { IUser } from '../../state';
import { Table, Button, Divider } from 'antd';
import UserModal from '../UserModal/UserModal';
import User from '../../API/User';
import RemoveUserConfirm from '../RemoveUserConfirm/RemoveUserConfirm';

interface IProps {
    users: IUser[];
    loading: boolean;
    error: string;
    getUsersList(): void;
}

interface IState {
    showUserModal: boolean;
    editableUser?: IUser;
    createUserLoading: boolean;
    createUserError: string;
    editUserLoading: boolean;
    editUserError: string;
    removeUserLoading: boolean;
    removeUserError: string;
    showRemoveUserConfirm: boolean;
    removeUserName: string;
    removeUserId: string;
}

export default class UsersList extends React.Component<IProps, IState> {
    state: IState = {
        showUserModal: false,
        createUserError: '',
        createUserLoading: false,
        editUserError: '',
        editUserLoading: false,
        showRemoveUserConfirm: false,
        removeUserError: '',
        removeUserLoading: false,
        removeUserName: '',
        removeUserId: '',
    }
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Action',
            key: 'action',
            render: (user: IUser) => (
              <span>
                <Button onClick={this.editUser(user)}>Edit</Button>
                <Divider type="vertical" />
                <Button onClick={this.openRemoveUserModal(user)}>Delete</Button>
              </span>
            ),
          },
    ]
    render() {
        const {users, loading, error} = this.props;
        const {editableUser, showUserModal, createUserError, createUserLoading, editUserError, editUserLoading,
            removeUserLoading, showRemoveUserConfirm, removeUserName} = this.state;
        return(
            <div className="users-list">
                <div className="header">
                    <h2>Users list</h2>
                </div>
                <div className="table-actions">
                    <Button onClick={this.openCreateUserModal}>Create user</Button>
                </div>
                <Table 
                    dataSource={users}
                    pagination={false}
                    columns={this.columns}
                    rowKey="objectId"
                    loading={loading} />
                <UserModal
                    user={editableUser}
                    onCancel={this.toggleUserModal}
                    onConfirm={editableUser ? this.updateUser : this.createUser}
                    visible={showUserModal}
                    error={createUserError || editUserError}
                    confirmLoading={editUserLoading || createUserLoading}
                />
                <RemoveUserConfirm
                    visible={showRemoveUserConfirm}
                    userName={removeUserName}
                    confirmLoading={removeUserLoading}
                    onConfirm={this.removeUser}
                    onCancel={this.toggleRemoveUserModal}
                />
                <div className="error">
                    {error}
                </div>
            </div>
        );
    }

    editUser = (user: IUser) => () => {
        this.setState({editableUser: user, showUserModal: true});
    }

    openCreateUserModal = () => {
        this.setState({editableUser: undefined}, this.toggleUserModal);
    }

    openRemoveUserModal = (user: IUser) => () => {
        this.setState({removeUserId: user.objectId, removeUserName: user.name, showRemoveUserConfirm: true});
    }

    toggleUserModal = () => {
        this.setState((prevState: IState) => {
            return { showUserModal: !prevState.showUserModal }
        });
    }

    toggleRemoveUserModal = () => {
        this.setState((prevState: IState) => {
            return { showRemoveUserConfirm: !prevState.showRemoveUserConfirm }
        });
    }

    createUser = async (user: IUser) => {
        this.setState({createUserLoading: true});
        try {
            await User.createUser(user);
            this.setState({createUserLoading: false, createUserError: ''});
            this.props.getUsersList();
            this.toggleUserModal();
        } catch(e) {
            this.setState({createUserError: e.message, createUserLoading: false});
        }

    }

    updateUser = async (user: IUser, userId: string) => {
        this.setState({editUserLoading: true});
        try {
            await User.editUser(user, userId);
            this.setState({editUserLoading: false, createUserError: ''});
            this.props.getUsersList();
            this.toggleUserModal();
        } catch(e) {
            this.setState({editUserError: e.message, editUserLoading: false});
        }
    }

    removeUser = async () => {
        this.setState({removeUserLoading: true});
        await User.removeUser(this.state.removeUserId);
        this.setState({removeUserLoading: false, removeUserError: ''});
        this.props.getUsersList();
        this.toggleRemoveUserModal();
    }
}