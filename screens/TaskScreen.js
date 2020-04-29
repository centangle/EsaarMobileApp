import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Style from '../constants/Style';
import { Button, Grid, Col, Row, Icon } from 'native-base';

export default function TaskScreen() {

  const organizations = [1, 2];
  const onGoingTasks = [1, 2, 3, 4, 5]

  const sellAll = () => {
    console.log('see all')
  }

  return (
    <ScrollView style={[Style.pageContainer]}>
      {/* Items Info */}
      <View>
        <Grid style={Style.mb2}>
          <Col style={Style.justifyContent}>
            <Text style={Style.heading}>Items</Text>
          </Col>
          <Col style={Style.rightCenter}>
            <Button style={Style.ph2} onPress={() => sellAll()}><Text style={Style.textWhite}>Donation Details</Text></Button>
          </Col>
        </Grid>

        <Grid>
          <Row style={Style.mb1}>
            <Col style={styles.itemLabelWrapper}>
              <Text>Flour:</Text>
            </Col>
            <Col>
              <Text>20 Kgs</Text>
            </Col>
          </Row>
          <Row style={Style.mb1}>
            <Col style={styles.itemLabelWrapper}>
              <Text>Meal:</Text>
            </Col>
            <Col>
              <Text>100 Person</Text>
            </Col>
          </Row>
        </Grid>
      </View>

      {/* Location Info */}
      <Grid style={Style.mv2}>
        <Col>
          <Text style={[Style.bold, Style.mb1, Style.defaultColor]}>Pickup Location <Icon style={styles.pin} name={'pin'} /></Text>
          <Text style={Style.ml2}>F-10, Islamabad</Text>
        </Col>
        <Col>
          <Text style={[Style.bold, Style.mb1, Style.defaultColor]}>Drop off Location <Icon style={styles.pin} name={'pin'} /></Text>
          <Text style={Style.ml2}>D-12, Islamabad</Text>
        </Col>
      </Grid>

      {/* Donate Contact */}
      <Grid style={Style.mv2}>
        <Col>
          <Text style={[Style.bold, Style.mb1, Style.defaultColor]}>Donate Contact</Text>
          <Button block light style={[Style.outerShadow, styles.callBtn]}>
            <Text><Icon style={Style.defaultColor} name={'call'} /></Text>
          </Button>
        </Col>
        <Col>
          <Text style={[Style.bold, Style.mb1, Style.defaultColor]}>Receiver Contact</Text>
          <Button block light style={[Style.outerShadow, styles.callBtn]}>
            <Text><Icon style={Style.defaultColor} name={'call'} /></Text>
          </Button>
        </Col>
      </Grid>

      {/* Pick Up Info */}
      <View>
      <Text style={[Style.heading, Style.mv2]}>Pickup Date & Time</Text>
      <Grid>
          <Col>
            <Text>1730 Hrs</Text>
            <Text style={Style.mv1}>Sunday</Text>
            <Text>April 5, 2020</Text>
          </Col>
          <Col style={Style.rightCenter}>
            <Text style={[Style.defaultColor, styles.timeLeftLabel]}>12:01:57</Text>
            <Text style={Style.defaultColor}>Time Remaining</Text>
          </Col>
        </Grid>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  itemLabelWrapper: {
    maxWidth: 80,
    paddingLeft: 10
  },
  pin: {
    fontSize: 17
  },
  callBtn:{
    width: 50,
    marginLeft: 10
  },
  timeLeftLabel:{
    fontSize: 36,
    fontWeight: 'bold'
  }
});
