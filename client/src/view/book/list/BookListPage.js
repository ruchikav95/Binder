import React, { Component } from 'react';
import BookListFilter from 'view/book/list/BookListFilter';
import BookListTable from 'view/book/list/BookListTable';
import BookListToolbar from 'view/book/list/BookListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class BookListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.book.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.book.list.title')}
          </PageTitle>

          <BookListToolbar />
          <BookListFilter />
          <BookListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default BookListPage;
