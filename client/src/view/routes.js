import Permissions from 'security/permissions';
import { i18n } from 'i18n';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    icon: 'home',
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () => import('view/home/HomePage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
  },

  {
    path: '/iam',
    loader: () => import('view/iam/list/IamPage'),
    permissionRequired: permissions.iamRead,
    exact: true,
    icon: 'user-add',
    label: i18n('iam.menu'),
    menu: true,
  },
  {
    path: '/iam/new',
    loader: () => import('view/iam/new/IamNewPage'),
    menu: false,
    permissionRequired: permissions.iamCreate,
    exact: true,
  },
  {
    path: '/iam/importer',
    loader: () =>
      import('view/iam/importer/IamImporterPage'),
    menu: false,
    permissionRequired: permissions.iamImport,
    exact: true,
  },
  {
    path: '/iam/:id/edit',
    loader: () => import('view/iam/edit/IamEditPage'),
    menu: false,
    permissionRequired: permissions.iamEdit,
    exact: true,
  },
  {
    path: '/iam/:id',
    loader: () => import('view/iam/view/IamViewPage'),
    menu: false,
    permissionRequired: permissions.iamRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    icon: 'file-search',
    label: i18n('auditLog.menu'),
    loader: () => import('view/auditLog/AuditLogPage'),
    menu: true,
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    icon: 'setting',
    label: i18n('settings.menu'),
    loader: () => import('view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    menu: true,
  },

  {
    path: '/username',
    loader: () => import('view/username/list/UsernameListPage'),
    permissionRequired: permissions.usernameRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.username.menu'),
    menu: true,
  },
  {
    path: '/username/new',
    loader: () => import('view/username/form/UsernameFormPage'),
    menu: false,
    permissionRequired: permissions.usernameCreate,
    exact: true,
  },
  {
    path: '/username/importer',
    loader: () =>
      import('view/username/importer/UsernameImporterPage'),
    menu: false,
    permissionRequired: permissions.usernameImport,
    exact: true,
  },
  {
    path: '/username/:id/edit',
    loader: () => import('view/username/form/UsernameFormPage'),
    menu: false,
    permissionRequired: permissions.usernameEdit,
    exact: true,
  },
  {
    path: '/username/:id',
    loader: () => import('view/username/view/UsernameViewPage'),
    menu: false,
    permissionRequired: permissions.usernameRead,
    exact: true,
  },

  {
    path: '/book',
    loader: () => import('view/book/list/BookListPage'),
    permissionRequired: permissions.bookRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.book.menu'),
    menu: true,
  },
  {
    path: '/book/new',
    loader: () => import('view/book/form/BookFormPage'),
    menu: false,
    permissionRequired: permissions.bookCreate,
    exact: true,
  },
  {
    path: '/book/importer',
    loader: () =>
      import('view/book/importer/BookImporterPage'),
    menu: false,
    permissionRequired: permissions.bookImport,
    exact: true,
  },
  {
    path: '/book/:id/edit',
    loader: () => import('view/book/form/BookFormPage'),
    menu: false,
    permissionRequired: permissions.bookEdit,
    exact: true,
  },
  {
    path: '/book/:id',
    loader: () => import('view/book/view/BookViewPage'),
    menu: false,
    permissionRequired: permissions.bookRead,
    exact: true,
  },
];

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () => import('view/auth/ForgotPasswordPage'),
  },
];

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () => import('view/auth/EmptyPermissionsPage'),
  },
];

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () => import('view/auth/EmailUnverifiedPage'),
  },
];

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () => import('view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () => import('view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () => import('view/shared/errors/Error404Page'),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};
