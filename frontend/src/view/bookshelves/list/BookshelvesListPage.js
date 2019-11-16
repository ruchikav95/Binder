import React, { Component } from 'react';
import BookshelvesListFilter from 'view/bookshelves/list/BookshelvesListFilter';
import BookshelvesListTable from 'view/bookshelves/list/BookshelvesListTable';
import BookshelvesListToolbar from 'view/bookshelves/list/BookshelvesListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class BookshelvesListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.bookshelves.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.bookshelves.list.title')}
          </PageTitle>

          <BookshelvesListToolbar />
          <BookshelvesListFilter />
          <BookshelvesListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default BookshelvesListPage;
