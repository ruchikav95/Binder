import list from 'modules/username/list/usernameListReducers';
import form from 'modules/username/form/usernameFormReducers';
import view from 'modules/username/view/usernameViewReducers';
import destroy from 'modules/username/destroy/usernameDestroyReducers';
import importerReducer from 'modules/username/importer/usernameImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
