import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import UsernameView from 'view/username/view/UsernameView';
import { i18n } from 'i18n';
import actions from 'modules/username/view/usernameViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/username/view/usernameViewSelectors';
import UsernameViewToolbar from 'view/username/view/UsernameViewToolbar';

class UsernamePage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.username.menu'), '/username'],
            [i18n('entities.username.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.username.view.title')}
          </PageTitle>

          <UsernameViewToolbar match={this.props.match} />

          <UsernameView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(UsernamePage);
