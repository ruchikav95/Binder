const Roles = require('./roles');
const roles = Roles.values;

/**
 * List of Permissions and the Roles allowed of using them.
 */
class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
          roles.viewer,
        ],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,

          roles.bookEditor,
          roles.bookViewer,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.owner, roles.auditLogViewer, roles.viewer],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.owner],
      },
      usernameImport: {
        id: 'usernameImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.usernameEditor,
        ],
      },
      usernameCreate: {
        id: 'usernameCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.usernameEditor,
        ],
        allowedStorageFolders: ['username'],
      },
      usernameEdit: {
        id: 'usernameEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.usernameEditor,
        ],
        allowedStorageFolders: ['username'],
      },
      usernameDestroy: {
        id: 'usernameDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.usernameEditor,
        ],
        allowedStorageFolders: ['username'],
      },
      usernameRead: {
        id: 'usernameRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.usernameEditor,
          roles.usernameViewer,
        ],
      },
      usernameAutocomplete: {
        id: 'usernameAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.usernameEditor,
          roles.usernameViewer,

        ],
      },

      bookImport: {
        id: 'bookImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.bookEditor,
        ],
      },
      bookCreate: {
        id: 'bookCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.bookEditor,
        ],
        allowedStorageFolders: ['book'],
      },
      bookEdit: {
        id: 'bookEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.bookEditor,
        ],
        allowedStorageFolders: ['book'],
      },
      bookDestroy: {
        id: 'bookDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.bookEditor,
        ],
        allowedStorageFolders: ['book'],
      },
      bookRead: {
        id: 'bookRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.bookEditor,
          roles.bookViewer,
        ],
      },
      bookAutocomplete: {
        id: 'bookAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.bookEditor,
          roles.bookViewer,

        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

module.exports = Permissions;
