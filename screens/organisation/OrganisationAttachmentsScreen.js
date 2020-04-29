import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import StyleCategoryButton from './../../components/StyleCategoryButton';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';
import { Global } from '../../constants/Global';

const OrganisationAttachmentsScreen = (props) => {
  const {fetchOrgRequestsStart, route, attachments} = props;
  const {baseUrl} = Global;
  const orgParam = route.params;
  const {id} = orgParam;

  React.useEffect(() => {
    fetchOrgRequestsStart('FETCH_ORG_ATTACHMENTS_START',id,'Attachments')
  }, [fetchOrgRequestsStart]);

  const mappedData = attachments ? attachments.map(item => {
    return {
      ImageUrl: item.Url,
      Id: item.Id
    }
  }) : {};

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Attachments
        </Text>
        <View style={styles.grid}>
            {
              attachments ?
              mappedData.map((attachment, i) => {
                const { ImageUrl } = attachment;
                return (
                  <View key={i} style={styles.catItem}>
                    <StyleCategoryButton
                      btnStyle={styles.catContainer}
                      icon={ImageUrl!=null?{uri: baseUrl+ImageUrl}:''}
                    />
                  </View>
                )
              })
              : null
            }
          </View>
      </View>
    </ScrollView>
  );
}

const mapState = (state) => {
  const { organization } = state;
  const { attachments } = organization;
  console.log('attachments:', attachments)
  return {
    attachments
  }
}

const mapDispatch = dispatch => ({
  fetchOrgRequestsStart: (type,id,userType) => dispatch(fetchOrgRequestsStart(type,id,userType)),
  dispatch
});

export default connect(mapState, mapDispatch)(OrganisationAttachmentsScreen);


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
    
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  catItem:{ 
    width: '33.3%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
});
