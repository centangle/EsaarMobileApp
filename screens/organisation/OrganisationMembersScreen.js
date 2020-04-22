import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';
import { Global } from '../../constants/Global';

const OrganisationMembersScreen = (props) => {
  const {fetchOrgRequestsStart, route, members} = props;
  const { baseUrl } = Global;
  const orgParam = route.params;
  const {id} = orgParam;

  React.useEffect(() => {
    fetchOrgRequestsStart('FETCH_ORG_MEMBERS_START',id,'Member')
  }, [fetchOrgRequestsStart]);

  const mappedData = members?members.map(member => {
    return {
      Name: member.Member.Name,
      Description: member.Member.Name,
      ImageUrl: member.Member.ImageUrl,
      children: [], Id: member.Id,
      actions: [

      ]
    }
  }):{};

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Members
        </Text>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            members ? 
            mappedData.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: baseUrl+l.ImageUrl } }}
                title={l.Name}
                // subtitle={l.Description}
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
  const { members } = organization;
  return {
    members
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (type,id,userType) => dispatch(fetchOrgRequestsStart(type,id,userType)),
  dispatch
});

export default connect(mapState, mapDispatch)(OrganisationMembersScreen);


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
