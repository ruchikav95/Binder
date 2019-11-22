import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
// import Breadcrumb from 'view/shared/Breadcrumb';
import BookView from 'view/book/view/BookView';
import { i18n } from 'i18n';
import actions from 'modules/book/view/bookViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/book/view/bookViewSelectors';
// import BookViewToolbar from 'view/book/view/BookViewToolbar';

class BookViewList extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        {/* <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.book.menu'), '/book'],
            [i18n('entities.book.view.title')],
          ]}
        /> */}

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.book.view.title')}
          </PageTitle>

          <BookViewList match={this.props.match} />

          <BookView
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

export default connect(select)(BookViewList);
