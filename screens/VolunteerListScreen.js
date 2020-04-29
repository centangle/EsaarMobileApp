import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Style from '../constants/Style';
import Colors from './../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

export default class VolunteerListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      searchText: null,
      list: [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        }
      ]
    }
  }

  selectOrganization(org) {
    this.props.navigation.push('Donate');
  }

  render() {
    const { showSearch } = this.state;
    return (
      <ScrollView style={[Style.pageContainer]}>
        <View>
          <Text style={[styles.heading, Style.mv3]}>
            Select Organization
          </Text>
          <Ionicons
            onPress={() => { this.setState({ showSearch: !this.state.showSearch }) }}
            name={'ios-search'}
            size={28}
            style={{ position: 'absolute', right: 0, top: 12 }}
          />
        </View>
        {
          showSearch ?
            <TextInput
              style={[Style.outerShadow, Style.boxLayout, styles.quantityInput, Style.mb2]}
              placeholder="Search"
              onChangeText={text => setText(text)}
              defaultValue={this.state.searchText}
            /> : null
        }
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            this.state.list.map((l, i) => (
              <ListItem
                onPress={() => { this.selectOrganization(l) }}
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
                bottomDivider
                chevron
              />
            ))
          }
        </View>
      </ScrollView>
    );
  }
}


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
