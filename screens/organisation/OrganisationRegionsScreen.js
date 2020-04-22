import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';
import { Card, CardItem, Body } from 'native-base';

const OrganisationRegionsScreen = (props) => {
  const { fetchOrgRequestsStart, route, regions } = props;
  const orgParam = route.params;
  const { id } = orgParam;
  React.useEffect(() => {
    fetchOrgRequestsStart(id)
  }, [fetchOrgRequestsStart]);

  const mappedData = regions?regions.map(request => {
    return {
      Country: request.Country.Name,
      State: request.State.Name,
      District: request.District.Name,
      Tehsil: request.Tehsil.Name,
      Uc: request.UnionCouncil.Name
    }
  }):{};

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Regions
        </Text>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            regions ?
              mappedData.map((l, i) => (
                <Card style={Style.mb2}>
                  <CardItem header>
              <Text>{l.State}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>Uc: {l.Uc}</Text>
                      <Text>Tehsil: {l.Tehsil}</Text>
                      <Text>District: {l.District}</Text>
                      <Text>State: {l.State}</Text>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Text>{l.Tehsil}</Text>
                  </CardItem>
                </Card>
              )) : null
          }
        </View>
      </View>
    </ScrollView>
  );
}

const mapState = (state) => {
  const { organization } = state;
  const { regions } = organization;
  return {
    regions
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (id) => {
    dispatch(fetchOrgRequestsStart('FETCH_REGION_LEVELS_START', id));
    dispatch(fetchOrgRequestsStart('FETCH_COUNTRIES_START', id));
    dispatch(fetchOrgRequestsStart('FETCH_ORG_REGIONS_START', id));
  },
  dispatch
});

export default connect(mapState, mapDispatch)(OrganisationRegionsScreen);


const styles = StyleSheet.create({
  heading: {
    color: Colors.headingColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
  sendToAllBtn: {
    fontSize: 18
  },
  categoriesContainer: {
    marginBottom: 30
  },
  catContainer: {
    marginRight: 15,
  }
});
