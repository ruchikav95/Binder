import model from 'modules/bookshelves/bookshelvesModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import UserViewItem from 'view/iam/view/UserViewItem';

const { fields } = model;

class BookshelvesView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <UserViewItem
          label={fields.bsBookName.label}
          value={fields.bsBookName.forView(record.bsBookName)}
        />

        <UserViewItem
          label={fields.bsSubjec.label}
          value={fields.bsSubjec.forView(record.bsSubjec)}
        />

        <UserViewItem
          label={fields.bsBookOwner.label}
          value={fields.bsBookOwner.forView(record.bsBookOwner)}
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

export default BookshelvesView;
