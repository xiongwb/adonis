/**
 * Created by cyt on 2017/6/6.
 */
import React from 'react';
import { connect } from 'dva';
import NavBar from '../../components/nav_bar';


function Protocol1({ cardadd }) {
  return (
    <div>
      <NavBar title={cardadd.protocol.protocoltitle} />
      <div style={{ marginTop: '4.5rem' }} />
      {cardadd.protocol.protocolcontent}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    cardadd: state.cardadd,
  };
}
export default connect(mapStateToProps)(Protocol1);
