import list from 'modules/bookshelves/list/bookshelvesListReducers';
import form from 'modules/bookshelves/form/bookshelvesFormReducers';
import view from 'modules/bookshelves/view/bookshelvesViewReducers';
import destroy from 'modules/bookshelves/destroy/bookshelvesDestroyReducers';
import importerReducer from 'modules/bookshelves/importer/bookshelvesImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
