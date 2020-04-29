import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
import StyleCategoryButton from './../components/StyleCategoryButton';
import Style from '../constants/Style';
import Colors from './../constants/Colors';
import ArrowRight from './../components/ArrowRight';
import { Ionicons } from '@expo/vector-icons';

export default class RequestListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      catgeories: [
        {
          name: 'All',
          icon: require('./../assets/icons/all.png')
        },
        {
          name: 'Food',
          icon: require('./../assets/icons/food.png')
        },
        {
          name: 'Health',
          icon: require('./../assets/icons/food.png'),
        },
        {
          name: 'Education',
          icon: require('./../assets/icons/food.png')
        },
        {
          name: 'Grocery',
          icon: require('./../assets/icons/food.png')
        }
      ],
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

  selectCategory(cat){
    cat.selected = cat.selected ? false : true;
    this.setState({
      catgeories: [...this.state.catgeories, cat]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Filter by Categories</Text>
        <ScrollView style={styles.categoriesContainer} horizontal={true}>
          {
            this.state.catgeories.map((category, i) => {
              const { name, icon, selected } = category;
              return (
                <TouchableOpacity key={i} onPress={()=>this.selectCategory(category)} style={{paddingVertical:10}}>
                  <StyleCategoryButton
                    selected={selected}
                    btnStyle={styles.catContainer}
                    title={name}
                    icon={icon}
                  />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.mv2]}>
          <TouchableOpacity style={Style.boxLayout}>
            <Text style={[Colors.themeColorPrimary, styles.heading, styles.sendToAllBtn]}>Send to all organisations</Text>
            <ArrowRight blue={true} />
          </TouchableOpacity>
        </View>
        <Text style={[Style.fontSizeNormal, Style.defaultColor, Style.mv1]}>OR</Text>
        <View>
        <Text style={[styles.heading, Style.mv3]}>
          Select Organization
          </Text>
          <Ionicons
            onPress={()=>{console.log('search')}}
            name={'ios-search'}
            size={28}
            style={{position: 'absolute', right: 0, top: 12}}
          />
        </View>
        <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
          {
            this.state.list.map((l, i) => (
              <ListItem
                onPress={() => { console.log(l.name) }}
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
      </View>
    );
  }
}


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
  }
});
