import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Style from '../constants/Style';
import { Button, Grid, Col, Icon } from 'native-base';
import HeaderRightOption from '../components/HeaderRightOption';

export default function ProfileScreen(props) {
  console.log(props)
  const organizations = [1, 2];
  const onGoingTasks = [1, 2, 3, 4, 5]

  const sellAll = () => {
    console.log('see all')
  }

  const goToTask = (page,task = null) => {
    props.navigation.push(page, task);
  }

  return (
    <ScrollView style={[Style.pageContainer]}>
      <Grid style={Style.mb3}>
        <Col style={{ width: 100 }}>
          <View style={[Style.boxLayout, Style.outerShadow, styles.imageWrapper]}>
            <Image style={{ width: 70 }} resizeMode={'contain'} source={require('./../assets/images/robot-dev.png')} />
          </View>
        </Col>
        <Col style={styles.userInfo}>
          <Button onPress={()=>goToTask('Settings')} transparent><Text><Icon name={'settings'}/></Text></Button>
          <Text style={Style.heading}>Hadi Mustafa</Text>
          <Text style={styles.address}><Icon name="pin" style={styles.pin}/> DHA Phase II, Islamabad</Text>
        </Col>
      </Grid>

      <View>
        <Text style={[Style.heading]}>
          Affilications
        </Text>
        <View style={styles.grid}>
          {
            organizations.map((org,i) => {
              return (
                <Button style={[Style.outerShadow, Style.boxLayout, styles.btnWrapper]} key={i}>
                  <Image style={styles.image} source={require('./../assets/images/saylani.png')} />
                  <Text style={[Style.alignCenter, Style.bold, Style.mb1]}>Saylani Razakar Foundation</Text>
                  <Text style={[Style.alignCenter]}>Open Task 2</Text>
                </Button>
              )
            })
          }
        </View>
      </View>

      <View style={Style.mv2}>
        <Grid>
          <Col>
            <Text style={Style.heading}>Donations</Text>
          </Col>
          <Col style={Style.rightCenter}>
            <TouchableOpacity onPress={() => sellAll()}><Text style={Style.defaultColor}>See All</Text></TouchableOpacity>
          </Col>
        </Grid>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <View style={styles.grid}>
            {
              onGoingTasks.map((org, i) => {
                return (
                  <Button onPress={() => goToTask('Task',org)} style={[Style.outerShadow, Style.boxLayout, styles.btnWrapper]} key={i}>
                    <Text>Food</Text>
                    <Text style={[Style.alignCenter, styles.categories]}>Flour, Meal</Text>
                    <Text style={[Style.alignCenter, Style.mb1]}>Saylani Razakar Foundation</Text>
                    <Text style={[Style.alignCenter, styles.status]}>Under Approval</Text>
                  </Button>
                )
              })
            }
          </View>
        </ScrollView>
      </View>

      <View style={Style.mv2}>
        <Grid>
          <Col>
            <Text style={Style.heading}>Request</Text>
          </Col>
          <Col style={Style.rightCenter}>
            <TouchableOpacity onPress={() => sellAll()}><Text style={Style.defaultColor}>See All</Text></TouchableOpacity>
          </Col>
        </Grid>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <Text style={Style.mv1}>No request made so far.</Text>
        </ScrollView>
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
  grid: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15
  },
  btnWrapper: {
    borderRadius: 20,
    width: 120,
    height: 140,
    marginRight: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap'
  },
  imageWrapper: {height: 90,width: 90, justifyContent: 'center'},
  status: {
    fontSize: 12,
    color: 'orange'
  },
  categories: {
    color: 'blue',
    fontSize: 12,
    marginTop: 15,
    alignSelf: 'flex-end'
  },
  pin:{
    fontSize: 18
  },
  address:{
    fontSize: 18
  },
  userInfo:{
    justifyContent: 'center',
    paddingLeft: 10
  }
});
