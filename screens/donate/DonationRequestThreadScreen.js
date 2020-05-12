import * as React from "react";
import {StyleSheet, ScrollView, View, Text} from "react-native";
import Style from "../../constants/Style";
import Colors from "../../constants/Colors";
import {connect} from "react-redux";
import Timeline from "react-native-timeline-flatlist";
import {Global} from "../../constants/Global";
import {
  fetchDonationDetailsStart,
  fetchDonationRequestThreadStart,
  fetchDonationItemsStart,
} from "../../common/redux/donation/donation.actions";
import Moment from "moment";
import HeaderRightOption from "../../components/HeaderRightOption";
import AddReplies from "../../components/AddReplies";
import {Button, Icon} from "native-base";

const DonationRequestThreadScreen = ({
  replies,
  request,
  addRequestThread,
  fetchDonationDetailsStart,
  fetchDonationRequestThreadStart,
  fetchDonationItemsStart,
  navigation,
  route,
}) => {
  const [addReply, setAddReply] = React.useState(false);

  React.useEffect(() => {
    fetchDonationDetailsStart(route.params.id);
    fetchDonationRequestThreadStart(route.params.id);
    fetchDonationItemsStart(route.params.id);
  }, [
    fetchDonationDetailsStart,
    fetchDonationRequestThreadStart,
    fetchDonationItemsStart,
    route.params.id,
  ]);

  navigation.setOptions({
    title: "Requests",
    headerRight: () => (
      <Button transparent onPress={() => setAddReply(!addReply)} iconLeft>
        <Icon style={Style.defaultColor} name={"add"} />
        <Text style={[Style.ml1, Style.mr1, Style.defaultColor]}>
          Add Replies
        </Text>
      </Button>
    ),
  });

  const {baseUrl} = Global;

  const timelineData = replies
    ? replies.map((reply) => {
        return {
          time: Moment(reply.CreatedDate, "YYYY-MM-DD").fromNow(),
          title: reply.Creator.Name,
          description: reply.Type,
          // icon: reply.Organization.ImageUrl
        };
      })
    : [];

  const onchangeModalStatus = (data) => {
    setAddReply(!addReply);
    const payLoadData = {
      Entity: {
        Id: request.DonationRequestOrganization.Id,
      },
      EntityType: "Donation",
      Status: data.Status,
      Type: "General",
      Note: data.Note,
    };
    addRequestThread(payLoadData);
  };

  return (
    <ScrollView>
      {addReply ? (
        <AddReplies
          requestDonationId={request.DonationRequestOrganization.Id}
          onValueSubmit={(data) => onchangeModalStatus(data)}
        />
      ) : null}
      <View style={styles.container}>
        {replies ? (
          <Timeline
            data={timelineData}
            circleSize={20}
            circleColor="rgb(45,156,219)"
            lineColor="rgb(45,156,219)"
            timeContainerStyle={{minWidth: 52, marginTop: 0}}
            timeStyle={{
              textAlign: "center",
              backgroundColor: "#ff9797",
              color: "white",
              padding: 5,
              borderRadius: 13,
              maxWidth: 78,
            }}
            descriptionStyle={{color: "gray"}}
            options={{
              style: {paddingTop: 5},
            }}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

const mapState = (state, getState) => {
  const {donation, region} = state;
  const {route} = getState;
  return {
    replies: donation.replies[route.params.id],
    request: donation.donations[route.params.id],
    regions: region.regions,
  };
};

const mapDispatch = (dispatch) => ({
  fetchDonationDetailsStart: (Id) => dispatch(fetchDonationDetailsStart(Id)),
  fetchDonationRequestThreadStart: (Id) =>
    dispatch(fetchDonationRequestThreadStart(Id)),
  fetchDonationItemsStart: (Id) => dispatch(fetchDonationItemsStart(Id)),
  addRequestThread: (payLoadData) =>
    dispatch({type: "ADD_REQUEST_THREAD_START", payload: payLoadData}),
  dispatch,
});

export default connect(mapState, mapDispatch)(DonationRequestThreadScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.defaultBackground,
  },
  heading: {
    color: Colors.headingColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  sendToAllBtn: {
    fontSize: 18,
  },
  categoriesContainer: {
    paddingVertical: 5,
    paddingHorizontal: 1,
  },
  catContainer: {
    marginRight: 15,
  },
  titleStyle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
