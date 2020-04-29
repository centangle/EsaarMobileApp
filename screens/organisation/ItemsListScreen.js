import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { fetchOrgRequestsStart } from '../../common/redux/organization/organization.actions';
import { Global } from '../../constants/Global';

const ItemsListScreen = ({ items, fetchOrgRequestsStart, id }) => {
  useEffect(() => {
    fetchOrgRequestsStart(id);
  }, [fetchOrgRequestsStart]);

  const [searchText, setSearchText] = useState('');
  const [showSearch, setSearch] = useState(false);
  const { baseUrl } = Global;

  // filter items
  var mappedItemsArray = items.map(item => item.Item);
  const [mappedItems, setMappedItems] = useState(mappedItemsArray);

  const searchItem = (word) => {
    if (word) {
      const items = mappedItemsArray.filter(asset => {
        return asset.Name.indexOf(word) > -1;
      })
      setMappedItems(items)
    } else {
      setMappedItems(items.map(item => item.Item))
    }
  }

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View>
        <Text style={[styles.heading, Style.mv3]}>
          Items List
          </Text>
        <Ionicons
          onPress={() => { setSearch(!showSearch) }}
          name={'ios-search'}
          size={28}
          style={{ position: 'absolute', right: 0, top: 12 }}
        />
      </View>
      {
        showSearch ?
          <TextInput
          autoFocus={true}
            style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
            placeholder="Search"
            onChangeText={text => searchItem(text)}
            defaultValue={searchText}
          /> : null
      }
      <View style={[Style.outerShadow, Style.defaultRadius, Style.p1, styles.categoriesContainer]}>
        {
          mappedItems.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: baseUrl + l.ImageUrl } }}
              title={l.Name}
              subtitle={l.Description}
              bottomDivider
            />
          ))
        }
      </View>
    </ScrollView>
  );
}

const mapState = (state, getState) => {
  const { organization } = state;
  const id = getState.route.params.id;
  return {
    items: organization.items,
    id
  }
}

const mapDispatch = dispatch => ({
  //fetchOrgRequestsStart: (id) => fetchOrgRequestsStart('FETCH_PERIFERAL_ITEMS_START',id),
  fetchOrgRequestsStart: (id) => dispatch(fetchOrgRequestsStart('FETCH_ORG_ITEMS_START', id)),
  dispatch
});

export default connect(mapState, mapDispatch)(ItemsListScreen);


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
