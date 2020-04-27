import * as React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Textarea, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native-gesture-handler';
import StyleCategoryButton from '../../components/StyleCategoryButton';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import QuantityField from '../../components/QuantityField';
import DateTimeOption from '../../components/DateTimeOption';
import ImagePickerOption from '../../components/ImagePickerOption';
import StyleButton from '../../components/StyleButton';
import DonateConfirmation from './DonateConfirmation';
import { connect } from 'react-redux';
import { Global } from '../../constants/Global';
import { fetchOrgItemsStart } from '../../common/redux/organization/organization.actions';

class DonateScreen extends React.Component {
  constructor(props) {
    super(props);
    const { baseUrl } = Global;
    const { navigation, fetchOrgItemsStart, route } = this.props;
    this.state = {
      organisation: route.params.organization,
      donateConfirm: false,
      baseUrl
    }

    navigation.setOptions({
      title: 'Donate'
    });

    fetchOrgItemsStart(this.state.organisation.Id)
  }

  selectItem(item) {
    console.log('items select', item);
    this.props.addDonationItem(item);
  }

  onchangeModalStatus() {
    this.setState({
      donateConfirm: false
    })
    this.props.navigation.popToTop();
  }

  handleSubmitDonation = ()=>{
    const {cartItems, addDonationStart} = this.props;
    const mappedItems = cartItems.map(item=>{
        //console.log(item);
        return {
            Item: {...item},
            Quantity:item.quantity,
            QuantityUOM:item.ItemUOMs?item.ItemUOMs[0]:''
        }
    });

    const payLoadData = {Items:mappedItems,Note:this.state.note,OrganizationId:this.state.organisation.Id};
    addDonationStart(payLoadData);
    
    this.setState({
      donateConfirm: true
    })
  }

  render() {
    //console.log('organisation', this.props)
    const { Name, ImageUrl } = this.state.organisation;
    const Image_Http_URL = { uri: this.state.baseUrl + ImageUrl };
    const { items, cartItems } = this.props;
    console.log('cart items', cartItems)
    const mapItems = items.map(item => {
      return { ...item.Item, ItemUOMs: item.ItemUOMs, Description: "" }
    });
    return (
      <ScrollView>
        <DonateConfirmation isVisible={this.state.donateConfirm} changeModalStatus={() => this.onchangeModalStatus()} />
        <View style={styles.container}>
          <Text style={styles.heading}>Organization</Text>
          <View style={styles.selectedOrg}>
            <View style={[Style.mr2, Style.outerShadow, Style.boxLayout]}>
              <Image style={styles.selectedOrgImage} resizeMode={'contain'} source={Image_Http_URL} />
            </View>
            <Text style={styles.selectedOrgText}>{Name}</Text>
          </View>

          {/* Organisation Items start */}
          <View>
            <Text style={[styles.heading, Style.mv1]}>
              Select Items
          </Text>
            <Ionicons
              onPress={() => { console.log('search') }}
              name={'ios-search'}
              size={28}
              style={{ position: 'absolute', right: 0, top: 12 }}
            />
            <Text style={styles.selectedCategories}>Selected Category: Food, Shelter</Text>

            <ScrollView style={styles.categoriesContainer} horizontal={true} nestedScrollEnabled={true}>
              {
                mapItems.map((item, i) => {
                  const { Name, ImageUrl } = item;
                  const IMAGE_URL = ImageUrl ? this.state.baseUrl + ImageUrl : ''
                  const selected = false;
                  return (
                    <TouchableOpacity key={i} onPress={() => this.selectItem(item)} style={{ paddingVertical: 10 }}>
                      <StyleCategoryButton
                        selected={selected}
                        btnStyle={styles.catContainer}
                        title={Name}
                        icon={IMAGE_URL}
                      />
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
          {/* Organisation Items ends */}

          <View>
            <Text style={[styles.heading]}>Quantity</Text>
            {
              cartItems.map(item => {
                return <QuantityField item={item} />
              })
            }
          </View>

          {/* Notes */}
          <View style={Style.mv3}>
            <Text style={[styles.heading]}>
              Donation Details
          </Text>
            <Textarea
              onChangeText={ (text)=> this.setState({note: text}) }
              style={[Style.boxLayout, Style.outerShadow]} rowSpan={5} bordered 
              placeholder="Any extra detail about donation"
              />
          </View>

          {/* Pickup info */}
          <View style={Style.mv3}>
            <Text style={[styles.heading, Style.mv1]}>Pickup Date & Time</Text>
            <DateTimeOption />
          </View>

          {/* Photos */}
          <View style={Style.mv3}>
            <Text style={[styles.heading, Style.mv1]}>Photos</Text>
            <ImagePickerOption />
          </View>
          <Button onPress={() => this.handleSubmitDonation()} block style={[Style.defaultBg, Style.defaultRadius, Style.mv4]}>
            <Text style={{ fontSize: 20, color: '#fff' }}>Donate</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const mapState = (state) => {
  const { donation, organization } = state;
  return {
    items: organization.items,
    cartItems: Object.keys(donation.cartItems).map(key => donation.cartItems[key])
  }
}

const mapDispatch = dispatch => ({
  fetchOrgItemsStart: (id) => dispatch(fetchOrgItemsStart(id)),
  addDonationItem: (item) => dispatch({ type: 'ADD_DONATION_ITEM', payload: item }),
  addDonationStart: (payLoadData) => dispatch({ type: 'ADD_DONATION_START', payload: payLoadData }),
  dispatch
});

export default connect(mapState, mapDispatch)(DonateScreen);

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
    width: 50,
    height: 50
  },
  selectedOrgText: {
    fontSize: 20
  },
  selectedCategories: {
    color: '#999'
  }
});
