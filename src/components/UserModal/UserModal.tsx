import * as React from 'react';
import { Modal, Form, Input } from 'antd';
import { IUser } from '../../state';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IOwnProps {
    user?: IUser;
    visible: boolean;
    error: string;
    onConfirm(user: IUser, objectId?: string): void;
    onCancel(): void;
    confirmLoading: boolean;
}

interface IProps extends IOwnProps {
    form: WrappedFormUtils<IOwnProps>;
}

class UserModal extends React.Component<IProps> {
    render() {
        const {visible, onCancel, user, error, confirmLoading} = this.props;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 18 },
            },
          };

        return (
            <Modal
                title={user ? "Edit user" : "Create user"}
                okText={user ? "Edit" : "Create"}
                visible={visible}
                confirmLoading={confirmLoading}
                onOk={this.onConfirm}
                onCancel={onCancel}
            >
                <Form layout="vertical" {...formItemLayout}>
                    <Form.Item label="E-mail: " required>
                        {
                            getFieldDecorator(
                                'email', {
                                    rules: [
                                        {
                                          type: 'email',
                                          message: 'The input is not valid E-mail!',
                                        },
                                        {
                                          required: true,
                                          message: 'Please input user E-mail!',
                                        },
                                    ],
                                    initialValue: user ? user.email : ''
                                }
                            )(<Input type="email" />)
                        }
                    </Form.Item>
                    <Form.Item label="Name: " required>
                    {
                            getFieldDecorator(
                                'name', {
                                    rules: [
                                        {
                                          required: true,
                                          message: 'Please input user name!',
                                        },
                                    ],
                                    initialValue: user ? user.name : ''
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <div className="error">{error}</div>
                </Form>
            </Modal>
        );
    }

    onConfirm = async () => {
        const {user, onConfirm, form} = this.props;
        try {
            const userInputs = await form.validateFields() as any;
            onConfirm(userInputs, user ? user.objectId : '');
        } catch(e) {
            console.log(e);
        }
    }
};

export default Form.create<IProps>({ name: 'userForm' })(UserModal);
