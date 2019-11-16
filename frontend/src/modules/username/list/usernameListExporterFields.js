import model from 'modules/username/usernameModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.email,
  fields.password,
  fields.points,
  fields.createdAt,
  fields.updatedAt
];
