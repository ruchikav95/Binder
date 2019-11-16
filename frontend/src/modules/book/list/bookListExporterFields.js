import model from 'modules/book/bookModel';

const { fields } = model;

export default [
  fields.id,
  fields.bookName,
  fields.author,
  fields.subject,
  fields.bookOwner,
  fields.createdAt,
  fields.updatedAt
];
