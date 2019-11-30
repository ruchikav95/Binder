module.exports = (app) => {
  app.post(`/username`, require('./usernameCreate'));
  app.put(`/username/:id`, require('./usernameUpdate'));
  app.post(`/username/import`, require('./usernameImport'));
  app.delete(`/username`, require('./usernameDestroy'));
  app.get(
    `/username/autocomplete`,
    require('./usernameAutocomplete'),
  );
  app.get(`/username`, require('./usernameList'));
  app.get(`/username/:id`, require('./usernameFind'));
};
