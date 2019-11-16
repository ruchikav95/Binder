module.exports = (app) => {
  app.post(`/bookshelves`, require('./bookshelvesCreate'));
  app.put(`/bookshelves/:id`, require('./bookshelvesUpdate'));
  app.post(`/bookshelves/import`, require('./bookshelvesImport'));
  app.delete(`/bookshelves`, require('./bookshelvesDestroy'));
  app.get(
    `/bookshelves/autocomplete`,
    require('./bookshelvesAutocomplete'),
  );
  app.get(`/bookshelves`, require('./bookshelvesList'));
  app.get(`/bookshelves/:id`, require('./bookshelvesFind'));
};
