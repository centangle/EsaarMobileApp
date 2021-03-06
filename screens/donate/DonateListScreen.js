import * as React from "react";
import {StyleSheet, ScrollView, View, Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {ListItem} from "react-native-elements";
// import { ScrollView } from 'react-native-gesture-handler';
import StyleCategoryButton from "../../components/StyleCategoryButton";
import Style from "../../constants/Style";
import Colors from "../../constants/Colors";
import ArrowRight from "../../components/ArrowRight";
import {Ionicons} from "@expo/vector-icons";
import {connect} from "react-redux";
import {fetchOrganizationStart} from "../../common/redux/organization/organization.actions";
import {Global} from "../../constants/Global";

class DonateListScreen extends React.Component {
  constructor(props) {
    super(props);
    const {baseUrl} = Global;
    this.state = {
      baseUrl,
      catgeories: [
        {
          name: "All",
          icon: require("./../../assets/icons/all.png"),
        },
        {
          name: "Food",
          icon: require("./../../assets/icons/food.png"),
        },
        {
          name: "Health",
          icon: require("./../../assets/icons/food.png"),
        },
        {
          name: "Education",
          icon: require("./../../assets/icons/food.png"),
        },
        {
          name: "Grocery",
          icon: require("./../../assets/icons/food.png"),
        },
      ],
    };

    this.props.navigation.setOptions({
      title: "Donate",
    });

    this.props.fetchOrganizationStart();
  }

  selectCategory(cat) {
    cat.selected = cat.selected ? false : true;
    this.setState({
      catgeories: [...this.state.catgeories, cat],
    });
  }

  selectOrganization(org) {
    this.props.navigation.push("Donate", {organization: org});
  }

  render() {
    const {organizations} = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Filter by Categories</Text>
          <ScrollView style={styles.categoriesContainer} horizontal={true}>
            {this.state.catgeories.map((category, i) => {
              const {name, icon, selected} = category;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.selectCategory(category)}
                  style={{paddingVertical: 12, paddingHorizontal: 10}}
                >
                  <StyleCategoryButton
                    selected={selected}
                    btnStyle={styles.catContainer}
                    title={name}
                    icon={icon}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* <View style={[Style.outerShadow, Style.defaultRadius, Style.mv2]}>
          <TouchableOpacity style={Style.boxLayout}>
            <Text style={[Colors.themeColorPrimary, styles.heading, styles.sendToAllBtn]}>Send to all organisations</Text>
            <ArrowRight blue={true} />
          </TouchableOpacity>
        </View>
        <Text style={[Style.fontSizeNormal, Style.defaultColor, Style.mv1]}>OR</Text> */}
          <View>
            <Text style={[styles.heading, Style.mv3]}>Select Organization</Text>
            {/* <Ionicons
            onPress={()=>{console.log('search')}}
            name={'ios-search'}
            size={28}
            style={{position: 'absolute', right: 0, top: 12}}
          /> */}
          </View>
          <View style={[Style.outerShadow, Style.defaultRadius, Style.p1]}>
            {organizations.map((l, i) => (
              <ListItem
                onPress={() => {
                  this.selectOrganization(l);
                }}
                key={i}
                leftAvatar={{source: {uri: this.state.baseUrl + l.ImageUrl}}}
                title={l.Name}
                subtitle={l.subtitle}
                bottomDivider
                chevron
              />
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = (state) => {
  const {organization} = state;
  return {
    organizations: Object.keys(organization.organizations).map((key) => {
      return {
        ...organization.organizations[key],
        title: organization.organizations[key].Name,
      };
    }),
  };
};

const mapDispatch = (dispatch) => ({
  fetchOrganizationStart: () => dispatch(fetchOrganizationStart()),
  dispatch,
});

export default connect(mapState, mapDispatch)(DonateListScreen);

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
    marginRight: 10,
  },
});
