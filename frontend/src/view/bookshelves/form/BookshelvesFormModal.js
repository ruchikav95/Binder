import React, { Component } from 'react';
import { Modal } from 'antd';
// @ts-ignore
import { i18n } from 'i18n';
import BookshelvesForm from 'view/bookshelves/form/BookshelvesForm';
import BookshelvesService from 'modules/bookshelves/bookshelvesService';
import Errors from 'modules/shared/error/errors';

class BookshelvesFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await BookshelvesService.create(data);
      const record = await BookshelvesService.find(id);
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
        title={i18n('entities.bookshelves.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <BookshelvesForm
          saveLoading={this.state.saveLoading}
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          modal
        />
      </Modal>
    );
  }
}

export default BookshelvesFormModal;
