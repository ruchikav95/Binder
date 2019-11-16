/**
 * Starts the application on the port specified.
 */

const api = require('./src/api');
const PORT = process.env.PORT || 8080;

api.listen(PORT, () => {
  console.log(`🌎 ==> Server now on running on http://localhost:${PORT}`);
  console.log(`🌎 ==> GraphiQL now on running on http://localhost:${PORT}/graphql`);
});
