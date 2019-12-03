import model from 'modules/book/bookModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import UserViewItem from 'view/iam/view/UserViewItem';

const { fields } = model;

class BookView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <TextViewItem
          label={fields.bookName.label}
          value={fields.bookName.forView(record.bookName)}
        />

        <TextViewItem
          label={fields.author.label}
          value={fields.author.forView(record.author)}
        />

        <TextViewItem
          label={fields.subject.label}
          value={fields.subject.forView(record.subject)}
        />

        <UserViewItem
          label={fields.bookOwner.label}
          value={fields.bookOwner.forView(record.bookOwner)}
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
      </ViewWrapper>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default BookView;
