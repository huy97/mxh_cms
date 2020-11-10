import React, { Component } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Button, Radio, notification } from 'antd';
import PropTypes from 'prop-types';
import { updateUserRole } from 'services/auth';

export default class UpdateRole extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        editData: PropTypes.object.isRequired,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
    };

    static defaultProps = {
        visible: false,
        editData: {},
        onOk: () => {},
        onCancel: () => {}
    };

    state = {
        checked: []
    }

    handleChange = (e) => {
        this.setState({checked: e.target.value});
    }

    handleOk = async () => {
        try{
            const {editData, onOk} = this.props;
            const {checked} = this.state;
            const result = await updateUserRole(editData._id, checked);
            notification.success({
                message: "Phân quyền thành công.",
            });
            onOk(result.data);
            this.handleCancel();
        }catch(e){
            notification.error({message: e.message});
        }
    }

    handleCancel = () => {
        this.setState({checked: []});
        this.props.onCancel();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(snapshot){
            const {editData} = this.props;
            this.setState({checked: editData.roles[0].roleId});

        }
    }
    

    getSnapshotBeforeUpdate = (prevProps) => {
        return (prevProps.editData !== this.props.editData) && !!this.props.editData._id;
    }

    render() {
        const {checked} = this.state;
        const {visible, listRoles} = this.props;
        return (
            <Modal
                visible={visible}
                title="Phân quyền người dùng"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Huỷ
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        Cập nhật
                    </Button>,
                ]}
            >
                <Radio.Group options={listRoles} value={checked} onChange={this.handleChange}/>
            </Modal>
        )
    }
}
