import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../constants/Style';
import Colors from './../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { fetchOrganizationStart } from '../common/redux/organization/organization.actions';
import { Global } from '../constants/Global';

const VolunteerListScreen = ({ navigation, data, fetchOrganizationStart }) => {

  const [searchText, setSearchText] = React.useState('');
  const [showSearch, setSearch] = React.useState(false);
  const { baseUrl } = Global;

  const selectOrganization = (org) => {
    navigation.push('JoinAsVolunteer',{ id: org.Id });
  }

  navigation.setOptions({
    title: 'Join Organisation'
  });

  React.useEffect(() => {
    fetchOrganizationStart();
  }, [fetchOrganizationStart]);

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View>
        <Text style={[styles.heading, Style.mv3]}>
          Select Organization
          </Text>
        {/* <Ionicons
          onPress={() => { setSearch(!showSearch) }}
          name={'ios-search'}
          size={28}
          style={{ position: 'absolute', right: 0, top: 12 }}
        /> */}
      </View>
      {
        showSearch ?
          <TextInput
            style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
            placeholder="Search"
            onChangeText={text => setSearchText(text)}
            defaultValue={searchText}
          /> : null
      }
      <View style={[Style.outerShadow, Style.defaultRadius, Style.p1, styles.categoriesContainer]}>
        {
          data.map((l, i) => (
            <ListItem
              onPress={() => selectOrganization(l)}
              key={i}
              leftAvatar={{ source: { uri: baseUrl + l.ImageUrl } }}
              title={l.Name}
              bottomDivider
              chevron
            />
          ))
        }
      </View>
    </ScrollView>
  );
}

const mapState = (state) => {
  const { organization } = state;
  return {
    data: Object.keys(organization.organizations).map(key => {
      return { ...organization.organizations[key], title: organization.organizations[key].Name }
    })
  }
}

const mapDispatch = dispatch => ({
  fetchOrganizationStart: () => dispatch(fetchOrganizationStart()),
  dispatch
});

export default connect(mapState, mapDispatch)(VolunteerListScreen);

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
    paddingVertical: 5,
    paddingHorizontal: 1,
  },
  catContainer: {
    marginRight: 15,
  }
});
