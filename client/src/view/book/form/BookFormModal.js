import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import BookForm from 'view/book/form/BookForm';
import BookService from 'modules/book/bookService';
import Errors from 'modules/shared/error/errors';

class BookFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await BookService.create(data);
      const record = await BookService.find(id);
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
        title={i18n('entities.book.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <BookForm
          saveLoading={this.state.saveLoading}
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          modal
        />
      </Modal>
    );
  }
}

export default BookFormModal;
