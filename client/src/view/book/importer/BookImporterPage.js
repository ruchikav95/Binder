import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/book/importer/bookImporterSelectors';
import actions from 'modules/book/importer/bookImporterActions';
import fields from 'modules/book/importer/bookImporterFields';

class BookImportPage extends Component {
  render() {
    const Importer = importerHoc(
      selectors,
      actions,
      fields,
      i18n('entities.book.importer.hint'),
    );

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [
              i18n('entities.book.menu'),
              '/book',
            ],
            [
              i18n(
                'entities.book.importer.title',
              ),
            ],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n(
              'entities.book.importer.title',
            )}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default BookImportPage;
