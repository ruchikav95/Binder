import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/bookshelves/importer/bookshelvesImporterSelectors';
import actions from 'modules/bookshelves/importer/bookshelvesImporterActions';
import fields from 'modules/bookshelves/importer/bookshelvesImporterFields';

class BookshelvesImportPage extends Component {
  render() {
    const Importer = importerHoc(
      selectors,
      actions,
      fields,
      i18n('entities.bookshelves.importer.hint'),
    );

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [
              i18n('entities.bookshelves.menu'),
              '/bookshelves',
            ],
            [
              i18n(
                'entities.bookshelves.importer.title',
              ),
            ],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n(
              'entities.bookshelves.importer.title',
            )}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default BookshelvesImportPage;
