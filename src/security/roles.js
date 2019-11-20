/**
 * List of Roles available for the Users.
 */
class Roles {
  static get values() {
    return {
      owner: 'owner',
      editor: 'editor',
      viewer: 'viewer',
      auditLogViewer: 'auditLogViewer',
      iamSecurityReviewer: 'iamSecurityReviewer',
      entityEditor: 'entityEditor',
      entityViewer: 'entityViewer',
      usernameEditor: 'usernameEditor',
      usernameViewer: 'usernameViewer',
      bookEditor: 'bookEditor',
      bookViewer: 'bookViewer',
    };
  }
}

module.exports = Roles;
