import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Style from '../../constants/Style';
import { Button, Grid, Col, Icon, Row } from 'native-base';
import { Global } from '../../constants/Global';
import StyleCategoryButton from './../../components/StyleCategoryButton';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchOrgItemsStart, fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';

function OrganisationProfileScreen(props) {
  
  const {fetchOrgRequestsStart, route, organization} = props;
  const {categories, offices} = organization;
  const { baseUrl } = Global;
  const orgParam = route.params;
  const {ImageUrl, Name, Id, Description} = orgParam;
  const Image_Http_URL = { uri: baseUrl + ImageUrl };

  React.useEffect(() => {
    fetchOrgRequestsStart(Id);
    console.log('props:',props)
  }, [fetchOrgRequestsStart]);

  props.navigation.setOptions({
    title: Name
  });

  const organisationOpts = [
    {
      name: 'Campaigns',
      route: 'CampaignsList',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Items',
      route: 'ItemsList',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Regions',
      route: 'RegionsList',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Volunteers',
      route: 'VolunteersList',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Members',
      route: 'MembersList',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Accounts',
      route: 'AccountsList',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Attachments',
      route: 'AttachmentsList',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Packages',
      route: 'PackagesList',
      icon: require('./../../assets/icons/food.png')
    },
    {
      name: 'Requests',
      route: 'OrgRequestList',
      icon: require('./../../assets/icons/food.png')
    }
  ];

  const goToScreen = (screen) => {
    props.navigation.push(screen, { id: Id });
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
          <Text style={Style.heading}>{orgParam.Name}</Text>
          <Row style={Style.mv1}>
            <Col><Button onPress={() => goToScreen('JoinAsVolunteer')} block style={[Style.outerShadow, styles.headerActBtn]}><Text style={Style.defaultColor}>Join</Text></Button></Col>
            <Col><Button onPress={() => goToScreen('Donate')} block style={[Style.outerShadow, styles.headerActBtn]}><Text style={Style.defaultColor}>Donate</Text></Button></Col>
            <Col><Button onPress={() => goToScreen('RequestList')} block style={[Style.outerShadow, styles.headerActBtn]}><Text style={Style.defaultColor}>Request</Text></Button></Col>
          </Row>
        </Col>
      </Grid>

      <View style={Style.mv1}>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <View style={styles.grid}>
            {
              organisationOpts.map((option, i) => {
                const { name, icon, route } = option;
                return (
                  <TouchableOpacity onPress={() => goToScreen(route)} key={i} style={{ paddingVertical: 12 }}>
                    <StyleCategoryButton
                      btnStyle={styles.catContainer}
                      title={name}
                      icon={icon}
                    />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>


      <View style={Style.mv1}>
        <Text style={Style.heading}>Categories</Text>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <View style={styles.grid}>
            {
              categories ?
              categories.map((category, i) => {
                const { Name, ImageUrl } = category;
                return (
                  <View key={i} style={{ paddingVertical: 12 }}>
                    <StyleCategoryButton
                      btnStyle={styles.catContainer}
                      title={Name}
                      icon={ImageUrl!=null?{uri: ImageUrl}:''}
                    />
                  </View>
                )
              })
              : null
            }
          </View>
        </ScrollView>
      </View>

      <View>
        <Text style={[Style.heading]}>
          About Us
        </Text>
        {Description?<Text>{Description}</Text>:'-'}
      </View>

      {offices.length>0 ? <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Offices
        </Text>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            offices.map((l, i) => (
              <ListItem
                key={i}
                title={l.Name}
                subtitle={l.Address}
                bottomDivider
              />
            ))
          }
        </View>
      </View>: null}

    </ScrollView>
  );
}

const mapState = (state) => {
  const { organization } = state;
  return {
    organization
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (id) => {
    dispatch(fetchOrgRequestsStart('FETCH_ORG_OFFICES_START', id, 'Offices'));
    //dispatch(fetchOrgRequestsStart('FETCH_ORG_ATTACHMENTS_START', id, 'Attachments'));
    dispatch(fetchOrgRequestsStart('FETCH_ORG_CATEGORIES_START', id));
    dispatch(fetchOrgItemsStart(id));
    dispatch(fetchOrgRequestsStart('FETCH_ORG_MEMBERS_START',id,'Owner'))
  },
  dispatch
});

export default connect(mapState, mapDispatch)(OrganisationProfileScreen);

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
    paddingHorizontal: 2
  }
});
