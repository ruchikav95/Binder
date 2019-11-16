import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/book/importer/bookImporterSelectors';
import BookService from 'modules/book/bookService';
import fields from 'modules/book/importer/bookImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'BOOK_IMPORTER',
  selectors,
  BookService.import,
  fields,
  i18n('entities.book.importer.fileName'),
);
