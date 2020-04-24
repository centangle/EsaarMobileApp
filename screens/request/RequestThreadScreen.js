import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import { Global } from '../../constants/Global';
import { fetchRequestThreadStart } from '../../common/redux/request/request.actions';

const RequestThreadScreen = ({ data, dispatch, fetchRequestThreadStart, navigation }) => {

  // React.useEffect(() => {
  //   fetchRequestThreadStart();
  // }, [fetchRequestThreadStart]);

  navigation.setOptions({
    title: 'Request Timeline'
  });

  const { baseUrl } = Global;

  const timelineData = [
    { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
    { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
    { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
    { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
    { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
  ]

  return (
    <ScrollView>
      <View style={styles.container}>
        <Timeline
          data={timelineData}
        />
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
  fetchRequestThreadStart: (Id) => dispatch(fetchRequestThreadStart(Id)),
  dispatch
});

export default connect(mapState, mapDispatch)(RequestThreadScreen);

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
  titleStyle: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});
