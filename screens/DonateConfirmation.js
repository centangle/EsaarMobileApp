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
import { Grid, Row, Col } from "native-base";

export default function DonateConfirmation(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const { isVisible } = props;
    useEffect(() => {
        //console.log('isVisible: ', isVisible);
        setModalVisible(isVisible);
    });
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.heading}>Confirmation</Text>
                        <View style={{ textAlign: 'left' }}>
                            <Text style={[Style.bold, Style.defaultColor, Style.mb1]}>Organization:</Text>
                            <Text style={Style.colorGray, Style.mb3}>Saylani razakar foundation</Text>

                            <Text style={[Style.bold, Style.defaultColor, Style.mb1]}>Donation:</Text>
                            <View style={{height: 70}}>
                            <Grid>
                                <Row style={[Style.mb1, {height:20}]}>
                                    <Col style={styles.itemLabelWrapper}>
                                        <Text>Flour:</Text>
                                    </Col>
                                    <Col>
                                        <Text>20 Kgs</Text>
                                    </Col>
                                </Row>
                                <Row style={[Style.mb1, {height:20}]}>
                                    <Col style={styles.itemLabelWrapper}>
                                        <Text>Meal:</Text>
                                    </Col>
                                    <Col>
                                        <Text>100 Person</Text>
                                    </Col>
                                </Row>
                            </Grid>
                            </View>
                            <Text style={[Style.bold, Style.defaultColor, Style.mb1]}>Pickup Location:</Text>
                            <Text style={Style.colorGray, Style.mb3}>Gagri Islamabad</Text>
                            <Text style={[Style.bold, Style.defaultColor, Style.mb1]}>Pickup Date & Time:</Text>
                            <Text style={Style.colorGray, Style.mb3}>Sunday, April 12, 2020 : 1730Hrs</Text>
                        </View>

                        <TouchableHighlight
                            style={[{ ...styles.openButton }, Style.defaultBg]}
                            onPress={() => {
                                props.changeModalStatus();
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.textStyle}>Confirm</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
        width: 300
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