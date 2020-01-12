import model from 'modules/book/bookModel';

const { fields } = model;

export default [
  fields.bookName,
  fields.author,
  fields.subject,
  fields.bookOwner,
];
