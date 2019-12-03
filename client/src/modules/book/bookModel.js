import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

function label(name) {
  return i18n(`entities.book.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  bookName: new StringField('bookName', label('bookName'), {
    "required": true,
    "min": 2,
    "max": 255
  }),
  author: new StringField('author', label('author'), {
    "max": 21845
  }),
  subject: new StringField('subject', label('subject'), {
    "required": true
  }),
  bookOwner: new RelationToManyField('bookOwner', label('bookOwner'), {
    "required": true
  }),
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
