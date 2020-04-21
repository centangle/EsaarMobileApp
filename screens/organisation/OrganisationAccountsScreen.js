import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';

const OrganisationAccountsScreen = (props) => {
  const {fetchOrgRequestsStart, campaigns, route} = props;
  const orgParam = route.params;

  React.useEffect(() => {
    fetchOrgRequestsStart(orgParam.id);
  }, [fetchOrgRequestsStart]);

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Volunteers
        </Text>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            campaigns.map((l, i) => (
              <ListItem
                key={i}
                title={l.Name}
                subtitle={l.Description}
                bottomDivider
              />
            ))
          }
        </View>
      </View>
    </ScrollView>
  );
}

const mapState = (state, getState) => {
  const { organization } = state;
  const { campaigns } = organization;
  return {
    campaigns
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (id) => dispatch(fetchOrgRequestsStart('FETCH_ORG_MEMBERS', id)),
  dispatch
});

export default connect(mapState, mapDispatch)(OrganisationAccountsScreen);


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
