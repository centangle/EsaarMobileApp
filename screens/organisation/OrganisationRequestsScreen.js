import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';
import { Global } from '../../constants/Global';

const OrganisationRequestsScreen = (props) => {
  const {fetchOrgRequestsStart, route, requests} = props;
  const { baseUrl } = Global;
  const orgParam = route.params;
  const {id} = orgParam;

  React.useEffect(() => {
    fetchOrgRequestsStart('FETCH_ORG_REQUESTS_START',id)
  }, [fetchOrgRequestsStart]);

  props.navigation.setOptions({
    title: 'Requests'
  });

  const mappedData = requests.map(request => {
    return {
      Name: request.Organization.Name,
      RequestType:request.Type,
      Date:request.CreatedDate,
      AssignedTo:request.Moderator.Name,
      ReqBy:request.Entity.Name,
      Status:request.Status,
      Description: request.Entity.Name + ' has requested to ' + request.Type + '. The current status is ' + request.Status,
      ImageUrl: organizations[request.Organization.Id] ? organizations[request.Organization.Id].ImageUrl : null,
      children: [], Id: request.Id,
      actions: [
        { id: request.Id + 'assign', item: request, title: 'Self Asign', handleClick: handleAssign, visible: request.IsOpenRequest === true },
        { id: request.Id + 'view', item: request, title: 'View', handleClick: handleClick, visible: request.CanAccessRequestThread === true }
      ]
    }
  });

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Requests
        </Text>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            requests ? 
            mappedData.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: baseUrl+l.ImageUrl } }}
                title={l.Name}
                subtitle={l.Description}
                bottomDivider
              />
            )): null
          }
        </View>
      </View>
    </ScrollView>
  );
}

const mapState = (state, getState) => {
  const { organization } = state;
  const { requests } = organization;
  return {
    requests
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (type,id) => dispatch(fetchOrgRequestsStart(type,id)),
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
