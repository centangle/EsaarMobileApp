import * as React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Textarea, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native-gesture-handler';
import StyleCategoryButton from './../components/StyleCategoryButton';
import Style from '../constants/Style';
import Colors from './../constants/Colors';
import QuantityField from '../components/QuantityField';
import DateTimeOption from './../components/DateTimeOption';
import ImagePickerOption from '../components/ImagePickerOption';
import StyleButton from '../components/StyleButton';

export default class DonateScreen extends React.Component {
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

  selectCategory(cat) {
    cat.selected = cat.selected ? false : true;
    this.setState({
      catgeories: [...this.state.catgeories, cat]
    })
  }

  donate(){
    console.log(this.props.navigation)
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Organization</Text>
          <View style={styles.selectedOrg}>
            <View style={[Style.mr2, Style.outerShadow, Style.boxLayout]}>
              <Image style={styles.selectedOrgImage} source={require('./../assets/images/saylani.png')} />
            </View>
            <Text style={styles.selectedOrgText}>Saylani Razakar Foundation</Text>
          </View>

          <View>
            <Text style={[styles.heading, Style.mv1]}>
              Select Organization
          </Text>
            <Ionicons
              onPress={() => { console.log('search') }}
              name={'ios-search'}
              size={28}
              style={{ position: 'absolute', right: 0, top: 12 }}
            />
            <Text style={styles.selectedCategories}>Selected Category: Food, Shelter</Text>
          </View>

          <ScrollView style={styles.categoriesContainer} horizontal={true}>
            {
              this.state.catgeories.map((category, i) => {
                const { name, icon, selected } = category;
                return (
                  <TouchableOpacity key={i} onPress={() => this.selectCategory(category)} style={{ paddingVertical: 10 }}>
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
          <View>
            <Text style={[styles.heading]}>
              Quantity
          </Text>
            <QuantityField name={'Floor'} />
            <QuantityField name={'Books'} />
            <QuantityField name={'Health'} />
          </View>
          <View style={Style.mv3}>
            <Text style={[styles.heading]}>
              Donation Details
          </Text>
            <Textarea style={[Style.boxLayout, Style.outerShadow]} rowSpan={5} bordered placeholder="Any extra detail about donation" />
          </View>
          <View style={Style.mv3}>
            <Text style={[styles.heading, Style.mv1]}>
              Pickup Date & Time
          </Text>
            <DateTimeOption />
          </View>
          <View style={Style.mv3}>
            <Text style={[styles.heading, Style.mv1]}>
              Photos
          </Text>
            <ImagePickerOption />
          </View>
          <Button onPress={()=>this.donate()} block style={[Style.defaultBg, Style.defaultRadius, Style.mv4]}>
            <Text style={{fontSize: 20, color: '#fff'}}>Donate</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
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
  selectedOrg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  selectedOrgImage: {
    width: 40
  },
  selectedOrgText: {
    fontSize: 20
  },
  selectedCategories: {
    color: '#999'
  }
});
