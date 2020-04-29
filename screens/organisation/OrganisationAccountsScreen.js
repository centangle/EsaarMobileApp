import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { fetchUomStart } from '../../common/redux/setting/setting.actions';
import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';

const OrganisationAccountsScreen = (props) => {
  const {fetchOrgRequestsStart, campaigns, route, accounts} = props;
  const orgParam = route.params;
  const {id} = orgParam;

  React.useEffect(() => {
    fetchOrgRequestsStart('FETCH_ORG_ACCOUNTS_START',id,'Accounts')
  }, [fetchOrgRequestsStart]);

  const mappedData = accounts.map(request => {
      return {
          Name: request.Name,
          NativeName: request.NativeName,
          Description: request.Description,
          AccountNo: request.AccountNo
      }
  });

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Accounts
        </Text>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            mappedData.map((l, i) => (
              <ListItem
                key={i}
                title={l.Name}
                subtitle={l.Description+', '+l.AccountNo}
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
  const { accounts } = organization;
  console.log('accounts: ', accounts)
  return {
    accounts
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (type,id,userType) => {
    dispatch(fetchOrgRequestsStart(type,id,userType));
    dispatch(fetchUomStart())
  },
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
