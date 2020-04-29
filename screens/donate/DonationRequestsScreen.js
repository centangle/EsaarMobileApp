import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Global } from '../../constants/Global';
import { Messages } from '../../constants/Messages';
import { fetchDonationRequestStart, fetchDonationRequestStatus } from '../../common/redux/donation/donation.actions';

const DonationRequestsScreen = ({ data, fetchDonationRequestStatus, fetchDonationRequestStart, navigation }) => {

  React.useEffect(() => {
    fetchDonationRequestStart();
    fetchDonationRequestStatus();
  }, [fetchDonationRequestStart, fetchDonationRequestStatus]);
  
  navigation.setOptions({
    title: 'Donation Requests'
  });

  const { baseUrl } = Global;

  const openRequestThread = (obj) => {
    console.log('object: ', obj)
    navigation.push('DonationRequestThread', {id: obj.DonationRequestOrganization.Id})
  }

  const mappedData = data ? data.map(request => {
    return {
      Name: request.Member.Name,
      Description: request.Member.Name + ' has requested to ' + request.Type + '. The current status is ' + request.DonationRequestOrganization.Status,
      ImageUrl: request.Member.ImageUrl,
      children: [], Id: request.Id,
      Type: request.Type,
      item: request
    }
  }) : [];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={[styles.heading, Style.mv3]}>
            Organization
          </Text>
        </View>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            mappedData.length > 0 ?
              mappedData.map((l, i) => (
                <ListItem
                  onPress={() => { openRequestThread(l.item) }}
                  key={i}
                  leftAvatar={{ source: { uri: baseUrl + l.ImageUrl } }}
                  title={l.Name}
                  titleStyle={styles.titleStyle}
                  subtitle={l.Description}
                  bottomDivider
                  chevron
                />
              )) : <Text style={[Style.p2, Style.colorGray]}>
                {Messages.No_data}
              </Text>
          }
        </View>
      </View>
    </ScrollView>
  );

}

const mapState = (state) => {
  const { donation, organization } = state;
  return {
    data: Object.keys(donation.donations).map(key => {
      return { ...donation.donations[key], title: donation.donations[key].Member.Name }
    }),
    organizations: organization.organizations
  }
}

const mapDispatch = dispatch => ({
  fetchDonationRequestStart: () => dispatch(fetchDonationRequestStart()),
  fetchDonationRequestStatus: ()=>dispatch(fetchDonationRequestStatus()),
  dispatch
});

export default connect(mapState, mapDispatch)(DonationRequestsScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.defaultBackground,
  },
  heading: {
    color: Colors.headingColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
  sendToAllBtn: {
    fontSize: 18
  },
  categoriesContainer: {
    paddingVertical: 5,
    paddingHorizontal: 1,
  },
  catContainer: {
    marginRight: 15,
  },
  titleStyle:{
    fontWeight: 'bold',
    marginBottom: 5
  }
});
