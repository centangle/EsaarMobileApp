import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Global } from '../../constants/Global';
import { Messages } from '../../constants/Messages';
import { fetchRequestStart } from '../../common/redux/request/request.actions';

const RequestsScreen = ({ data, dispatch, fetchRequestStart, navigation }) => {

  React.useEffect(() => {
    fetchRequestStart();
  }, [fetchRequestStart]);
  // useEffect(()=>{
  //   fetchRequestStatus();
  // },[fetchRequestStatus])

  const { baseUrl } = Global;
  const handleAssign = (item) => {
    dispatch({ type: 'ASSIGN_REQUEST_START', payload: { organizationId: item.Organization.Id, requestId: item.Id } });
  }
  const openRequestThread = (obj) => {
    dispatch({ type: obj.Type + '_SELECTED', payload: obj });
    navigation.push('RequestThread')
    //history.push(history.location.pathname + '/' + obj.Id);
  }

  const mappedData = data ? data.map(request => {
    return {
      Name: request.Organization.Name,
      Description: request.Entity.Name + ' has requested to ' + request.Type + '. The current status is ' + request.Status,
      ImageUrl: request.Organization.ImageUrl,
      children: [], Id: request.Id,
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
                  onPress={() => { openRequestThread(l) }}
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
  const { request, organization } = state;
  return {
    data: Object.keys(request.requests).map(key => {
      return { ...request.requests[key], title: request.requests[key].Organization.Name }
    }),
    organizations: organization.organizations
  }
}

const mapDispatch = dispatch => ({
  fetchRequestStart: () => dispatch(fetchRequestStart()),
  //fetchRequestStatus:()=>dispatch(fetchRequestStatus()),
  dispatch
});

export default connect(mapState, mapDispatch)(RequestsScreen);

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
