import Message from 'view/shared/message';
import { getHistory } from 'modules/store';
import { i18n } from 'i18n';

const DEFAULT_ERROR_MESSAGE = i18n(
  'errors.defaultErrorMessage',
);

function selectErrorMessage(error) {
  if (error && error.response && error.response.data) {
    return error.response.data;
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorCode(error) {
  if (error && error.response && error.response.status) {
    return error.response.status;
  }

  return 500;
}

export default class Errors {
  static handle(error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 403) {
      getHistory().push('/403');
      return;
    }

    if (selectErrorCode(error) === 400) {
      Message.error(selectErrorMessage(error));
      return;
    }

    getHistory().push('/500');
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }

  static showMessage(error) {
    Message.error(selectErrorMessage(error));
  }
}
