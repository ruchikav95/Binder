import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import UsernameForm from 'view/username/form/UsernameForm';
import UsernameService from 'modules/username/usernameService';
import Errors from 'modules/shared/error/errors';

class UsernameFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await UsernameService.create(data);
      const record = await UsernameService.find(id);
      this.props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      this.setState({
        saveLoading: false,
      });
    }
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Modal
        title={i18n('entities.username.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <UsernameForm
          saveLoading={this.state.saveLoading}
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          modal
        />
      </Modal>
    );
  }
}

export default UsernameFormModal;
