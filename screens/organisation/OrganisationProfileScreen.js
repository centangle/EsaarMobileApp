import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Style from '../../constants/Style';
import { Button, Grid, Col, Icon, Row } from 'native-base';
import { Global } from '../../constants/Global';
import StyleCategoryButton from './../../components/StyleCategoryButton';
import { ListItem } from 'react-native-elements';

export default function OrganisationProfileScreen(props) {

  const onGoingTasks = [1, 2, 3, 4, 5]

  const { route } = props;
  const { baseUrl } = Global;
  const organization = route.params;
  const Image_Http_URL = { uri: baseUrl + organization.ImageUrl };

  const catgeories = [
    {
      name: 'All',
      icon: require('./../../assets/icons/all.png')
    },
    {
      name: 'Food',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Health',
      icon: require('./../../assets/icons/food.png'),
    },
    {
      name: 'Education',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Grocery',
      icon: require('./../../assets/icons/food.png')
    }
  ];

  const locations = [
    { name: 'Alkhidmar Foundation, 3KM, Khayaban-E-Jinnah, Lahore' },
    { name: 'Alkhidmar Foundation, 23KM, Saddar, Rawalpindi' },
    { name: 'Alkhidmar Foundation, 3KM, Khayaban-E-Jinnah, Lahore' },
    { name: 'Alkhidmar Foundation, 18KM, Modal Town, Lahore' },
  ]

  const goToScreen = (screen) => {
    props.navigation.push(screen);
  }

  return (
    <ScrollView style={[Style.pageContainer]}>
      <Grid style={Style.mb3}>
        <Col style={{ width: 100 }}>
          <View style={[Style.boxLayout, Style.outerShadow, styles.imageWrapper]}>
            <Image style={{ width: 70, height: 70 }} resizeMode={'contain'} source={Image_Http_URL} />
          </View>
        </Col>
        <Col style={styles.userInfo}>
          <Text style={Style.heading}>{organization.Name}</Text>
          <Row style={Style.mv1}>
            <Col><Button onPress={() => goToScreen('VolunteerList')} block style={[Style.outerShadow, styles.headerActBtn]}><Text style={Style.defaultColor}>Volunteer</Text></Button></Col>
            <Col><Button onPress={() => goToScreen('Donate')} block style={[Style.outerShadow, styles.headerActBtn]}><Text style={Style.defaultColor}>Donate</Text></Button></Col>
            <Col><Button onPress={() => goToScreen('RequestList')} block style={[Style.outerShadow, styles.headerActBtn]}><Text style={Style.defaultColor}>Request</Text></Button></Col>
          </Row>
        </Col>
      </Grid>

      <View style={Style.mv1}>
        <Text style={Style.heading}>Categories</Text>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <View style={styles.grid}>
            {
              catgeories.map((category, i) => {
                const { name, icon, selected } = category;
                return (
                  <View key={i} style={{ paddingVertical: 12 }}>
                    <StyleCategoryButton
                      btnStyle={styles.catContainer}
                      title={name}
                      icon={icon}
                    />
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </View>

      <View>
        <Text style={[Style.heading]}>
          About Us
        </Text>
        <Text>{organization.Description}</Text>
      </View>

      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Dropoff locations
        </Text>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            locations.map((l, i) => (
              <ListItem
                key={i}
                title={l.name}
                bottomDivider
              />
            ))
          }
        </View>
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
  imageWrapper: { height: 90, width: 90, justifyContent: 'center' },
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
  pin: {
    fontSize: 18
  },
  address: {
    fontSize: 18
  },
  userInfo: {
    justifyContent: 'center',
    paddingLeft: 10
  },
  headerActBtn: {
    marginRight: 4,
  },
  catContainer: {
    marginRight: 8,
  }
});
