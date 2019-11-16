import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

function label(name) {
  return i18n(`entities.bookshelves.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  bsBookName: new RelationToManyField('bsBookName', label('bsBookName'), {}),
  bsSubjec: new RelationToManyField('bsSubjec', label('bsSubjec'), {}),
  bsBookOwner: new RelationToManyField('bsBookOwner', label('bsBookOwner'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),

};

export default {
  fields,
};
