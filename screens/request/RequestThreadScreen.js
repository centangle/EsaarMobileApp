import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import { Global } from '../../constants/Global';
import { fetchRequestThreadStart, fetchRequestStatus } from '../../common/redux/request/request.actions';
import Moment from 'moment';
import HeaderRightOption from '../../components/HeaderRightOption';

const RequestThreadScreen = ({ replies, request, fetchRequestThreadStart, navigation, route }) => {

  React.useEffect(() => {
    fetchRequestThreadStart(route.params.id);
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightOption onClick={'UpdateRegionRequest'} icon={'create'} color={'#666'} label={''} navigation={navigation} navParams={{id:request.Organization.Id, requestId: route.params.id}}/>
      ),
    });
  }, [fetchRequestThreadStart]);

  React.useEffect(()=>{
    fetchRequestStatus();
  },[fetchRequestStatus])

  navigation.setOptions({
    title: 'Request Timeline'
  });

  const { baseUrl } = Global;

  const timelineData = replies ? replies.map(reply => {
    return {
      time: Moment(reply.CreatedDate, "YYYY-MM-DD").fromNow(),
      title: reply.Creator.Name,
      description: reply.Type,
      // icon: reply.Organization.ImageUrl
    }
  }) : [];

  return (
    <ScrollView>
      <View style={styles.container}>
        {replies ? <Timeline
          data={timelineData}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
        />: null}
        {/* {replies ? <Timeline
          data={timelineData}
        />: null} */}
      </View>
    </ScrollView>
  );

}

const mapState = (state, getState) => {
  const { request, region, organization } = state;
  const {route} = getState;
  return {
    replies: request.replies[route.params.id],
    request: request.requests[route.params.id],
    regions: region.regions
  }
}

const mapDispatch = dispatch => ({
  fetchRequestThreadStart: (Id) => dispatch(fetchRequestThreadStart(Id)),
  fetchRequestStatus:()=>dispatch(fetchRequestStatus()),
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
