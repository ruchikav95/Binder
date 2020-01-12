import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/username/importer/usernameImporterSelectors';
import UsernameService from 'modules/username/usernameService';
import fields from 'modules/username/importer/usernameImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'USERNAME_IMPORTER',
  selectors,
  UsernameService.import,
  fields,
  i18n('entities.username.importer.fileName'),
);
