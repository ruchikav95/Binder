import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';


const { Meta } = Card;


export default class HomeBarChart extends Component {
  render() {
    return (
      <Card
      hoverable
      style={{ width: 240, margin:'auto' }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
    );
  }
}
