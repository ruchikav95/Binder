import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/bookshelves/importer/bookshelvesImporterSelectors';
import BookshelvesService from 'modules/bookshelves/bookshelvesService';
import fields from 'modules/bookshelves/importer/bookshelvesImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'BOOKSHELVES_IMPORTER',
  selectors,
  BookshelvesService.import,
  fields,
  i18n('entities.bookshelves.importer.fileName'),
);
