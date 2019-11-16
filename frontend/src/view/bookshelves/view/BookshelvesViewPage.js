import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import BookshelvesView from 'view/bookshelves/view/BookshelvesView';
import { i18n } from 'i18n';
import actions from 'modules/bookshelves/view/bookshelvesViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/bookshelves/view/bookshelvesViewSelectors';
import BookshelvesViewToolbar from 'view/bookshelves/view/BookshelvesViewToolbar';

class BookshelvesPage extends Component {
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
            [i18n('entities.bookshelves.menu'), '/bookshelves'],
            [i18n('entities.bookshelves.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.bookshelves.view.title')}
          </PageTitle>

          <BookshelvesViewToolbar match={this.props.match} />

          <BookshelvesView
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

export default connect(select)(BookshelvesPage);
