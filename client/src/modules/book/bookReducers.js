import list from 'modules/book/list/bookListReducers';
import form from 'modules/book/form/bookFormReducers';
import view from 'modules/book/view/bookViewReducers';
import destroy from 'modules/book/destroy/bookDestroyReducers';
import importerReducer from 'modules/book/importer/bookImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
