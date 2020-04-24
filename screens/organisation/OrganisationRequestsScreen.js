import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';
import { Global } from '../../constants/Global';
import { Card, CardItem, Body, Image, Left, Thumbnail } from 'native-base';

const OrganisationRequestsScreen = (props) => {
  const { fetchOrgRequestsStart, route, organization } = props;
  const { requests, organizations } = organization;
  const { baseUrl } = Global;
  const orgParam = route.params;
  const { id } = orgParam;

  React.useEffect(() => {
    fetchOrgRequestsStart('FETCH_ORG_REQUESTS_START', id)
  }, [fetchOrgRequestsStart]);

  props.navigation.setOptions({
    title: 'Requests'
  });

  const mappedData = requests.map(request => {
    return {
      Name: request.Organization.Name,
      RequestType: request.Type,
      Date: request.CreatedDate,
      AssignedTo: request.Moderator.Name,
      ReqBy: request.Entity.Name,
      Status: request.Status,
      Description: request.Entity.Name + ' has requested to ' + request.Type + '. The current status is ' + request.Status,
      ImageUrl: organizations[request.Organization.Id] ? organizations[request.Organization.Id].ImageUrl : null,
      children: [], Id: request.Id
    }
  });

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Requests
        </Text>
        <View>
          {
            requests ?
              mappedData.map((l, i) => (
                <Card style={[Style.outerShadow, Style.defaultRadius, Style.mb2]} key={i}>
                  <CardItem header bordered>
                    <Left>
                      <Thumbnail source={{ uri: baseUrl + l.ImageUrl }} />
                      <Body>
                        <Text style={Style.bold}>{l.Name}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text style={Style.colorGray}>{l.Description}</Text>
                    </Body>
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
  return {
    organization
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (type, id) => dispatch(fetchOrgRequestsStart(type, id)),
  dispatch
});

export default connect(mapState, mapDispatch)(OrganisationRequestsScreen);


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
