import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import Style from "../constants/Style";
import { Icon, Form, Picker, Textarea } from "native-base";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";

function ModifyRequestDelivery(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState({ uom: '', StatusNote: '' })
  const { items, isVisible, changeModalStatus, dispatch } = props;
  useEffect(() => {
    setModalVisible(isVisible);
  });

  const handleDrop = (value, item) => {
    if (state.Status === 'Delivered') {
      dispatch({ type: 'DONATION_UOM_CHANGED', payload: { DeliveredQuantityUOM: value, item, type: 'DeliveredQuantityUOM' } });
    } else if (state.Status === 'Collected') {
      dispatch({ type: 'DONATION_UOM_CHANGED', payload: { CollectedQuantityUOM: value, item, type: 'CollectedQuantityUOM' } });
    } else {
      dispatch({ type: 'DONATION_UOM_CHANGED', payload: { ApprovedQuantityUOM: value, item, type: 'ApprovedQuantityUOM' } });
    }
  }

  const handleQuantityChange = (value, item) => {
    if (state.Status === 'Delivered') {
      dispatch({ type: 'DONATION_QUANTITY_CHANGED', payload: { DeliveredQuantity: value, item, type: 'DeliveredQuantity' } });
    } else if (state.Status === 'Collected') {
      dispatch({ type: 'DONATION_QUANTITY_CHANGED', payload: { CollectedQuantity: value, item, type: 'CollectedQuantity' } });
    } else {
      dispatch({ type: 'DONATION_QUANTITY_CHANGED', payload: { ApprovedQuantity: value, item, type: 'ApprovedQuantity' } });
    }

  }

  const SaveRequest = () => {
    console.log('request modified');
    changeModalStatus(state);
    setModalVisible(false);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={Style.heading}>Modify Request Delivered</Text>
            <View style={{ textAlign: 'left' }}>
              <Form>
                {
                  items.map(item => {
                    let Quantity = item.ApprovedQuantity;
                    let QuantityUOMId = item.ApprovedQuantityUOM.Id;
                    let readonly = false;
                    if (state.Status === 'Delivered') {
                      Quantity = item.DeliveredQuantity;
                      QuantityUOMId = item.DeliveredQuantityUOM.Id;
                    }
                    if (state.Status === 'Collected') {
                      Quantity = item.CollectedQuantity;
                      QuantityUOMId = item.CollectedQuantityUOM.Id;
                    }
                    return (
                      <View key={item.Item.Id}>
                        <Text style={[Style.fontSizeNormal, Style.mv2]}>{item.Item.Name}</Text>
                        <TextInput
                          style={[Style.outerShadow, Style.boxLayout, Style.mb2]}
                          placeholder="Quantity"
                          onChangeText={text => handleQuantityChange(text, item)}
                          defaultValue={Quantity}
                        />
                        <Picker
                          note
                          mode="dropdown"
                          iosHeader="Select Unit"
                          placeholder="Select Unit"
                          iosIcon={<Icon name="arrow-down" />}
                          selectedValue={QuantityUOMId}
                          onValueChange={(value) => handleDrop(value, item)}
                          style={styles.unitPicker}
                        >
                          {
                            item.ItemUOMs.map(uom => {
                              return (
                                <Picker.Item key={uom.Id} label={uom.Name} value={uom.Id} />
                              )
                            })
                          }
                        </Picker>
                      </View>
                    )
                  })
                }
                <Textarea
                  onChangeText={(text) => setState({ ...state, StatusNote: text })}
                  style={[Style.boxLayout, Style.outerShadow, Style.mb3]} rowSpan={5} bordered
                  placeholder="Reply"
                />
              </Form>
            </View>
            <TouchableHighlight
              style={[{ ...styles.openButton }, Style.defaultBg]}
              onPress={() => SaveRequest()}
            >
              <Text style={styles.textStyle}>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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

export default connect(mapState)(ModifyRequestDelivery);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 450,
    maxWidth: 300
  },
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
