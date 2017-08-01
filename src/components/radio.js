/**
 * Created by cyt on 2017/6/9.
 */
import React from 'react';
import {
  Row,
  Col,
} from 'antd';

import styles from './radio.css';

const isSelected1 = styles.circle1;
const unchecked1 = styles.circle2;
const isSelected2 = styles.circle3;
const unchecked2 = styles.circle4;
let checked = false;
class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: isSelected1,
      unchecked: unchecked1,
      checked: false,
    };
  }
  onClick() {
    console.log(11111, 222);
    checked = !checked;
    if (checked) {
      this.setState({
        isSelected: isSelected1,
        unchecked: unchecked1,
      });
    } else {
      this.setState({
        isSelected: isSelected2,
        unchecked: unchecked2,
      });
    }
  }
  render() {
    return (
      <div onClick={this.onClick.bind(this)}>
        <Row type="flex" className={styles.radio}>
          <Col span={2}>
            <div className={this.state.isSelected}>
              <div className={this.state.unchecked} />
            </div>
          </Col>
          <Col span={22}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Radio;

