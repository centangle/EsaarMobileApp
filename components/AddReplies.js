import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import Style from "./../constants/Style";
import { Icon, Form, Picker, Textarea } from "native-base";
import { connect } from "react-redux";
import ModifyRequestDelivery from './ModifyRequestDelivery';

function AddReplies(props) {
  const [state, setState] = useState({ Note: '', Status: '', uom: '', StatusNote: '', showModifyRequestModal: false })
  const { statuses, items, requestDonationId, dispatch } = props;

  const onStatusChange = (value) => {
    if (value === 'Approved' || value === 'Collected' || value === 'Delivered' || value === 'StatusNote') {
      //dispatch({type:'OPEN_MODAL'})
      //console.log('open modal')
      setState({ ...state, showModifyRequestModal: !state.showModifyRequestModal, Status: value })
    }else{
      setState({ ...state, Status: value })
    }
  }

  const addReply = () => {
    //console.log('reply added');
    props.onValueSubmit(state);
  }

  const onModalValueSubmit = (data=null) =>{
    setState({ ...state, showModifyRequestModal: !state.showModifyRequestModal})
    console.log('on modal value added', data);
    dispatch({type:'ADD_DONATION_APPROVAL_START',payload:{items,donationRequestOrganizationId:requestDonationId,status:state.Status,note:data.StatusNote}})
  }

  return (
    <View style={[Style.ph2, Style.mt2]}>
      <ModifyRequestDelivery isVisible={state.showModifyRequestModal} changeModalStatus={(data=null) => onModalValueSubmit(data)} />
      <Text style={Style.defaultColor}>Add Replies</Text>
      <View>
        <Form>
          {statuses ? <Picker
            note
            mode="dropdown"
            iosHeader="Select Progress"
            placeholder="Select Progress"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={state.Status}
            onValueChange={(value) => onStatusChange(value)}
          >
            {
              Object.keys(statuses).map(key => {
                return <Picker.Item key={key} label={key} value={key} />
              })
            }
          </Picker> : null}
          <Textarea
            onChangeText={(text) => setState({ ...state, Note: text })}
            style={[Style.boxLayout, Style.outerShadow, Style.mb3]} rowSpan={3} bordered
            placeholder="Reply"
          />
        </Form>
      </View>
      <TouchableHighlight
        style={[{ ...styles.openButton }, Style.defaultBg]}
        onPress={() => addReply()}
      >
        <Text style={styles.textStyle}>Add Reply</Text>
      </TouchableHighlight>
    </View>
  );
}

const mapState = (state) => {
  const { request } = state;
  const { item } = state;
  return {
    statuses: request.status,
    items: item.items,
    modal: item.modal
  }
}

export default connect(mapState)(AddReplies);

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  heading: {
    marginBottom: 30,
    textAlign: "center",
    fontSize: 30
  }
});
