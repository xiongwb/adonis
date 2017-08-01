/**
 * Created by cyt on 2017/5/24.
 */
import React from 'react';
import { Row, Col, Icon } from 'antd';
import { browserHistory } from 'react-router';
import { connect } from 'dva';
import styles from './nav_bar.css';

class NavBar extends React.Component {
  render() {
    const onClick = () => {
      if (this.props.onClick) {
        this.props.onClick();
      }
      browserHistory.goBack();
    };
    return (
      <div className={styles.head}>
        <Row >
          <Col span={6}>
            <div className={styles.top1}>{this.props.left ||
            <Icon onClick={onClick} type="left" className={styles.icon} />}</div>
          </Col>
          <Col span={12}>
            <div className={styles.top2}>{this.props.title}</div>
          </Col>
          <Col span={6}>
            <div className={styles.top3} onClick={this.props.onClick}>{this.props.right}</div>
          </Col>
        </Row>
      </div>
    );
  }
}


export default connect()(NavBar);
