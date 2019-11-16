import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class HomePage extends PureComponent {
  render() {
    return (
      <React.Fragment>
        {<h1>Stop buying. Start sharing</h1>}
      </React.Fragment>
    );
  }
}

export default connect(null)(HomePage);
