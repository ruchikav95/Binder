import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// import LoadMoreList from 'view/book/view/LoadMoreList';
// import ContentWrapper from 'view/layout/styles/ContentWrapper';
import BookListTable from 'view/book/list/BookListTable';
import BookListToolbar from 'view/book/list/BookListToolbar';
class HomePage extends PureComponent {
  render() {
    return (
      <React.Fragment>
        {/* //display list of books */}
        <BookListToolbar />
        <BookListTable />

      </React.Fragment>
    );
  }
}

export default connect(null)(HomePage);
