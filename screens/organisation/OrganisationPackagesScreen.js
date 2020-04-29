import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';

const OrganisationPackagesScreen = (props) => {
  const {fetchOrgRequestsStart, route, packages} = props;
  const orgParam = route.params;
  const {id} = orgParam;
  React.useEffect(() => {
    fetchOrgRequestsStart('FETCH_ORG_PACKAGES_START',id)
  }, [fetchOrgRequestsStart]);

  const mappedData = packages.map(request => {
    return {
      Name: request.Item.Name,
      NativeName:request.Item.NativeName,
      Description:request.Item.Description
    }
  });

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Packages
        </Text>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            packages?
            mappedData.map((l, i) => (
              <ListItem
                key={i}
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

const mapState = (state) => {
  const { organization } = state;
  const { packages } = organization;
  return {
    packages
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (type, id) => {
    dispatch(fetchOrgRequestsStart(type,id))
  },
  dispatch
});

export default connect(mapState, mapDispatch)(OrganisationPackagesScreen);


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
