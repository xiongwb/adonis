/**
 * Created by cyt on 2017/6/6.
 */
import React from 'react';
import { connect } from 'dva';
import NavBar from '../../components/nav_bar';


function Protocol2({ newCard }) {
  return (
    <div>
      <NavBar title={newCard.protocol.protocoltitle} />
      <div style={{ marginTop: '4.5rem' }} />
      {newCard.protocol.protocolcontent}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    newCard: state.newCard,
  };
}
export default connect(mapStateToProps)(Protocol2);
