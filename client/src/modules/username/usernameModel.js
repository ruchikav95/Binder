import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import IntegerField from 'modules/shared/fields/integerField';
import IntegerRangeField from 'modules/shared/fields/integerRangeField';
import StringField from 'modules/shared/fields/stringField';

function label(name) {
  return i18n(`entities.username.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    "required": true,
    "min": 2,
    "max": 255
  }),
  email: new StringField('email', label('email'), {}),
  password: new StringField('password', label('password'), {}),
  points: new IntegerField('points', label('points'), {}),
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
  pointsRange: new IntegerRangeField(
    'pointsRange',
    label('pointsRange'),
  ),
};

export default {
  fields,
};
