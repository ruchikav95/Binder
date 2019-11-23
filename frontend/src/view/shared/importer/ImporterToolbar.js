import { Button, Icon, Popconfirm, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import Toolbar from 'view/shared/styles/Toolbar';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  class ImporterToolbar extends Component {
    doReset = () => {
      const { dispatch } = this.props;
      dispatch(actions.doReset());
    };

    doPause = () => {
      const { dispatch } = this.props;
      dispatch(actions.doPause());
    };

    doImport = () => {
      const { dispatch } = this.props;
      dispatch(actions.doImport());
    };

    doDownloadTemplate = () => {
      const { dispatch } = this.props;
      dispatch(actions.doDownloadTemplate());
    };

    render() {
      const { hasRows, importing, completed } = this.props;

      const showDownloadTemplate = !hasRows;
      const showImport =
        hasRows && !importing && !completed;
      const showDiscard =
        hasRows && !importing && !completed;
      const showNew = !!completed;
      const showPause = hasRows && importing;

      return (<React.Fragment></React.Fragment>
        );
    }
  }

  function select(state) {
    return {
      hasRows: selectors.selectHasRows(state),
      importing: selectors.selectImporting(state),
      completed: selectors.selectCompleted(state),
    };
  }

  return connect(select)(ImporterToolbar);
};
