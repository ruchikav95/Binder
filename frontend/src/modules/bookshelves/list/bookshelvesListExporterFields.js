import model from 'modules/bookshelves/bookshelvesModel';

const { fields } = model;

export default [
  fields.id,
  fields.bsBookName,
  fields.bsSubjec,
  fields.bsBookOwner,
  fields.createdAt,
  fields.updatedAt
];
