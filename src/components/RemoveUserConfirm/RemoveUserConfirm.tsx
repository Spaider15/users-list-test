import * as React from 'react';
import { Modal } from 'antd';

interface IProps {
    onConfirm(): void;
    onCancel(): void;
    userName: string;
    visible: boolean;
    confirmLoading: boolean;
}

export default class RemoveUserConfirm extends React.Component<IProps> {
    render() {
        const {userName, onCancel, onConfirm, visible, confirmLoading} = this.props;
        return(
            <Modal
                title="User Remove"
                okText="Yes"
                cancelText="No"
                onCancel={onCancel}
                onOk={onConfirm}
                visible={visible}
                confirmLoading={confirmLoading}
            >
                <div>You are going to delete user with name: {userName}</div>
                <div>Are you sure?</div>
            </Modal>
        )
    }
}