import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import { Row, Col, Card } from 'antd';
import HomeBarChart from 'view/home/HomeBarChart';
import HomeDoughnutChart from 'view/home/HomeDoughnutChart';
import HomeRadarChart from 'view/home/HomeRadarChart';
import HomeMixChartTwo from 'view/home/HomeMixChartTwo';
import HomeMixChartOne from 'view/home/HomeMixChartOne';
import HomeHorizontalBarChart from 'view/home/HomeHorizontalBarChart';
import HomePolarChart from 'view/home/HomePolarChart';
import HomeLineChart from 'view/home/HomeLineChart';
import LoadMoreList from 'view/book/view/LoadMoreList';
// import ContentWrapper from 'view/layout/styles/ContentWrapper';
// import BookView from 'view/book/view/BookView';
class HomePage extends PureComponent {
  render() {


   
    

    return (
      
      <React.Fragment>
        
         <LoadMoreList />
          
      
        
      </React.Fragment>
    );
  }
}

export default connect(null)(HomePage);
