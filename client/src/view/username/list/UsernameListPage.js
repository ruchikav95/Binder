import React, { Component } from 'react';
import UsernameListFilter from 'view/username/list/UsernameListFilter';
import UsernameListTable from 'view/username/list/UsernameListTable';
import UsernameListToolbar from 'view/username/list/UsernameListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class UsernameListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.username.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.username.list.title')}
          </PageTitle>

          <UsernameListToolbar />
          <UsernameListFilter />
          <UsernameListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default UsernameListPage;
