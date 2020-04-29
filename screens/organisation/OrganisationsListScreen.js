import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { fetchOrganizationStart } from '../../common/redux/organization/organization.actions';
import { Global } from '../../constants/Global';
import HeaderRightOption from '../../components/HeaderRightOption';
import { Button, Icon } from 'native-base';

const OrganisationsListScreen = ({ data, fetchOrganizationStart, navigation }) => {
  const selectOrganization = (org) => {
    //console.log(org)
    navigation.push('OrganizationProfile', org);
  }

  useEffect(() => {
      fetchOrganizationStart();
      navigation.setOptions({
        headerRight: () => (
          <HeaderRightOption onClick={'AddOrganisation'} icon={'add'} color={'#666'} label={''} navigation={navigation}/>
        ),
      });
  }, [fetchOrganizationStart]);

  const [searchText, setSearchText] = useState('');
  const [showSearch, setSearch] = useState(false);
  const {baseUrl} = Global;

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View>
        <Text style={[styles.heading, Style.mv3]}>
          Organizations
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
    marginBottom: 30
  },
  catContainer: {
    marginRight: 15,
  }
});
