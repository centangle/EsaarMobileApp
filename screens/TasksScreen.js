import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Style from '../constants/Style';
import { Button, Grid, Col } from 'native-base';

export default function TasksScreen(props) {

  const organizations = [1, 2];
  const onGoingTasks = [1, 2, 3, 4, 5]

  const sellAll = () =>{
    console.log('see all')
  }

  const goToTask = (task=null) =>{
    props.navigation.push('Task');
  }

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View>
        <Text style={[Style.heading]}>
          Select Organization
        </Text>
        <View style={styles.grid}>
          {
            organizations.map((org, i) => {
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
            <Text style={Style.heading}>On Going Tasks</Text>
          </Col>
          <Col style={Style.rightCenter}>
            <TouchableOpacity onPress={()=>sellAll()}><Text style={Style.defaultColor}>See All</Text></TouchableOpacity>
          </Col>
        </Grid>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <View style={styles.grid}>
            {
              onGoingTasks.map((org, i) => {
                return (
                  <Button onPress={()=>goToTask(org)} style={[Style.outerShadow, Style.boxLayout, styles.btnWrapper]} key={i}>
                    <Text style={[Style.alignCenter]}>1730 Hrs</Text>
                    <Text style={[Style.alignCenter, styles.date]}>Sun, 19 Apr</Text>
                    <Text style={[Style.alignCenter, styles.categories]}>Flour, Meal</Text>
                    <Text style={[Style.alignCenter]}>Saylani Razakar Foundation</Text>
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
            <Text style={Style.heading}>Open Tasks</Text>
          </Col>
          <Col style={Style.rightCenter}>
            <TouchableOpacity onPress={()=>sellAll()}><Text style={Style.defaultColor}>See All</Text></TouchableOpacity>
          </Col>
        </Grid>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <View style={styles.grid}>
            {
              onGoingTasks.map((org, i) => {
                return (
                  <Button onPress={()=>goToTask(org)} style={[Style.outerShadow, Style.boxLayout, styles.btnWrapper]} key={i}>
                    <Text style={[Style.alignCenter]}>1730 Hrs</Text>
                    <Text style={[Style.alignCenter, styles.date]}>Sun, 19 Apr</Text>
                    <Text style={[Style.alignCenter, styles.categories]}>Flour, Meal</Text>
                    <Text style={[Style.alignCenter]}>Saylani Razakar Foundation</Text>
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
            <Text style={Style.heading}>Recent Tasks</Text>
          </Col>
          <Col style={Style.rightCenter}>
            <TouchableOpacity onPress={()=>sellAll()}><Text style={Style.defaultColor}>See All</Text></TouchableOpacity>
          </Col>
        </Grid>

        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <View style={styles.grid}>
            {
              onGoingTasks.map((org, i) => {
                return (
                  <Button onPress={()=>goToTask(org)} style={[Style.outerShadow, Style.boxLayout, styles.btnWrapper]} key={i}>
                    <Text style={[Style.alignCenter]}>1730 Hrs</Text>
                    <Text style={[Style.alignCenter, styles.date]}>Sun, 19 Apr</Text>
                    <Text style={[Style.alignCenter, styles.categories]}>Flour, Meal</Text>
                    <Text style={[Style.alignCenter]}>Saylani Razakar Foundation</Text>
                  </Button>
                )
              })
            }
          </View>
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
    height: 130,
    marginRight: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap'
  },
  image: {
    height: 34,
    width: 34
  },
  date: {
    fontSize: 16,
  },
  categories: {
    color: 'blue',
    fontSize: 12,
    marginTop: 15,
    alignSelf: 'flex-end'
  }
});
