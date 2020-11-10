import React from 'react';
import {
  Drawer,
  Form,
  Input,
  Button,
  notification
} from "antd";
import {changePassword} from 'services/auth';

class ChangePassword extends React.Component {

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = async ({oldPassword, newPassword, confirmPassword}) => {
    if(!oldPassword){
      this.form.submit();
      return;
    }
    if(newPassword !== confirmPassword) {
      return notification.error({msg: 'Mật khẩu nhập lại không đúng'});
    }
    try {
      await changePassword(oldPassword, newPassword);
      this.form.resetFields();
      this.props.onClose();
      notification.success({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
      notification.error({ message: error.message });
    }

  }

  CustomFooter = () => {
    return (
        <div
            style={{
                textAlign: "right",
            }}
        >
            <Button
                onClick={this.handleClose}
                style={{
                    float: "left",
                }}
            >
                Đóng
            </Button>
            <Button onClick={this.handleSubmit} htmlType="submit" type="primary">
                Đổi mật khẩu
            </Button>
        </div>
    );
  };

  render() {
    const { visible } = this.props;
    return (
      <div>
                <Drawer
                    title="Đổi mật khẩu"
                    placement="right"
                    width={500}
                    closable={true}
                    destroyOnClose={true}
                    onClose={this.handleClose}
                    visible={visible}
                    footer={this.CustomFooter()}
                >
                  <Form
                        ref={(el) => (this.form = el)}
                        fields={[]}
                        initialValues={{
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                        }}
                        onFinish={this.handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="oldPassword"
                            label="Mật khẩu hiện tại"
                            rules={[
                              {
                                  required: true,
                                  message: "Vui lòng nhập mật khẩu",
                              },
                            ]}>
                            <Input
                                type="password"
                                placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label="Mật khẩu mới"
                            rules={[
                              {
                                  required: true,
                                  message: "Vui lòng nhập mật khẩu",
                              },
                            ]}>
                            <Input
                                type="password"
                                placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu"
                            rules={[
                              {
                                  required: true,
                                  message: "Vui lòng nhập mật khẩu",
                              },
                            ]}>
                            <Input
                                type="password"
                                placeholder="Nhập mật khẩu" />
                        </Form.Item>
                    </Form>
                </Drawer>
        </div>
    )
  }


}

export default ChangePassword;
