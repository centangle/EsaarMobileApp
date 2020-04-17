import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

import { fetchOrganizationStart } from '../../common/redux/organization/organization.actions';
import { Global } from '../../constants/Global';

const OrganisationsListScreen = ({ data, dispatch, fetchOrganizationStart, navigation }) => {

  //fetchOrganizationStart();
  const selectOrganization = (org) => {
    console.log(org)
    navigation.push('OrganizationProfile', org);
  }

  useEffect(() => {
      fetchOrganizationStart();
  }, [fetchOrganizationStart]);

  const [state, setState] = useState({treeData:data});
  const [searchText, setSearchText] = useState();
  const [showSearch, setSearch] = useState(false);
  const {baseUrl} = Global;

  // const limitString = (str,length) =>{
  //   if(typeof str !== 'undefined')
  //     return str.substring(0, length)+'...';
  //   else
  //     return str;
  // }

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View>
        <Text style={[styles.heading, Style.mv3]}>
          Organizations
          </Text>
        <Ionicons
          onPress={() => { setSearch(!state.showSearch) }}
          name={'ios-search'}
          size={28}
          style={{ position: 'absolute', right: 0, top: 12 }}
        />
      </View>
      {
        state.showSearch ?
          <TextInput
            style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
            placeholder="Search"
            onChangeText={text => setSearchText(text)}
            defaultValue={state.searchText}
          /> : null
      }
      <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
        {
          state.treeData.map((l, i) => (
            <ListItem
              onPress={() => selectOrganization(l)}
              key={i}
              leftAvatar={{ source: { uri: baseUrl+l.ImageUrl } }}
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

export default connect(mapState, mapDispatch)(OrganisationsListScreen);


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
