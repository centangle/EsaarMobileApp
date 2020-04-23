import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../constants/Colors';
import { Form, Picker, Icon, Button, Card, CardItem, Body, Right, Col, Row, Toast } from 'native-base';

const OrganisationJoinVolunteerScreen = (props) => {
  const { route, isOrganizationRegion, levels, countries, states, districts, tehsils, ucs, dispatch, regions, currentRegions } = props;
  const orgParam = route.params;
  const organizationId = orgParam.id;

  props.navigation.setOptions({
    title: 'Volunteer'
  });

  const [state, setState] = useState({
    isInit: 'TRUE',
    RegionLevel: { ...levels[Object.keys(levels)[0]] },
    Country: { Id: '', Name: '' }, State: { Id: '', Name: '' }, District: { Id: '', Name: '' }, Tehsil: { Id: '', Name: '' }, UnionCouncil: { Id: '', Name: '' }, saveable: false,
  });
  useEffect(() => {
    switch (state.isInit) {
      case 'TRUE':
        dispatch({ type: 'FETCH_REGION_LEVELS_START', payload: { organizationId, isOrganizationRegion } });
        dispatch({ type: 'FETCH_COUNTRIES_START', payload: { isOrganizationRegion: false } });
        setState({ ...state, isInit: 'FALSE' });
        return;
      default:
        return;
    }
  }, [dispatch, isOrganizationRegion, organizationId, state]);
  useEffect(() => {
    setState({ ...state, RegionLevel: { ...levels[Object.keys(levels)[0]] } });
  }, [levels])
  const handleChange = (event, item, value) => {
    if (event === 'Country') {
      setState({ ...state, [event]: item });
      dispatch({ type: 'FETCH_STATES_START', payload: { countryId: value, isOrganizationRegion, organizationId } });
    } else if (event === 'State') {
      setState({
        ...state,
        District: { Id: '', Name: '' },
        Tehsil: { Id: '', Name: '' },
        UnionCouncil: { Id: '', Name: '' },
        [event]: item
      });
      dispatch({ type: 'FETCH_DISTRICTS_START', payload: { stateId: value, isOrganizationRegion, organizationId } });
    } else if (event === 'District') {
      setState({
        ...state,
        Tehsil: { Id: '', Name: '' },
        UnionCouncil: { Id: '', Name: '' },
        [event]: item
      });
      dispatch({ type: 'FETCH_TEHSILS_START', payload: { districtId: value, isOrganizationRegion, organizationId } });
    } else if (event === 'Tehsil') {
      setState({
        ...state,
        UnionCouncil: { Id: '', Name: '' },
        [event]: item
      });
      dispatch({ type: 'FETCH_UCS_START', payload: { tehsilId: value, isOrganizationRegion, organizationId } });
    } else {
      setState({ ...state, [event]: item });
    }
  }

  const handleSubmit = (event) => {
    dispatch({ type: 'ADD_REGION', payload: { ...state, RegionLevel: state.RegionLevel.Name } });
    Toast.show({
      text: ''
    })
  }
  const handleRemove = (key) => {
    dispatch({ type: 'REMOVE_REGION', payload: key });
  }

  const handleRequest = (type) => {
      const data = {
          "Organization": {
              "Id": organizationId
          },
          "Regions":regions,
          "EntityType": "Member",
          "Type": type,
      };
      dispatch({ type: 'REQUEST_START', payload: data });
      props.navigation.pop();
  }

  return (
    <ScrollView style={[Style.pageContainer]}>
      <View style={Style.mv2}>
        <Text style={[Style.heading, Style.mb2]}>
          Join as Volunteer
        </Text>
        <Form>
          <Picker
            mode="dropdown"
            iosHeader="Select Region"
            placeholder="Select Region"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            selectedValue={state.RegionLevel.Id}
            onValueChange={(value) => handleChange('RegionLevel', levels[value], value)}
          >
            {
              Object.keys(levels).map(key => {
                return (
                  <Picker.Item key={key} label={levels[key].Name} value={key} />
                )
              })
            }
          </Picker>
          <Picker
            mode="dropdown"
            iosHeader="Select Country"
            placeholder="Select Country"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            selectedValue={state.Country.Id}
            onValueChange={(value) => handleChange('Country', countries[value], value)}
          >
            {
              Object.keys(countries).map(key => {
                return (
                  <Picker.Item key={key} label={countries[key].Name} value={countries[key].Id} />
                )
              })
            }
          </Picker>
          {state.RegionLevel.Id > 0 ? <Picker
            mode="dropdown"
            iosHeader="Select State"
            placeholder="Select State"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            selectedValue={state.State.Id}
            onValueChange={(value) => handleChange('State', states[value], value)}
          >
            {
              Object.keys(states).map(key => {
                return (
                  <Picker.Item key={key} label={states[key].Name} value={states[key].Id} />
                )
              })
            }
          </Picker> : null}
          {state.RegionLevel.Id > 1 ? <Picker
            mode="dropdown"
            iosHeader="Select District"
            placeholder="Select District"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            selectedValue={state.District.Id}
            onValueChange={(value) => handleChange('District', districts[value], value)}
          >
            {
              Object.keys(districts).map(key => {
                return (
                  <Picker.Item key={key} label={districts[key].Name} value={districts[key].Id} />
                )
              })
            }
          </Picker> : null}
          {state.RegionLevel.Id > 2 ? <Picker
            mode="dropdown"
            iosHeader="Select Tehsil"
            placeholder="Select Tehsil"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            selectedValue={state.Tehsil.Id}
            onValueChange={(value) => handleChange('Tehsil', tehsils[value], value)}
          >
            {
              Object.keys(tehsils).map(key => {
                return (
                  <Picker.Item key={key} label={tehsils[key].Name} value={tehsils[key].Id} />
                )
              })
            }
          </Picker> : null}
          {state.RegionLevel.Id > 3 ? <Picker
            mode="dropdown"
            iosHeader="Select UnionCouncil"
            placeholder="Select UnionCouncil"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            selectedValue={state.UnionCouncil.Id}
            onValueChange={(value) => handleChange('UnionCouncil', ucs[value], value)}
          >
            {
              Object.keys(ucs).map(key => {
                return (
                  <Picker.Item key={key} label={ucs[key].Name} value={ucs[key].Id} />
                )
              })
            }
          </Picker> : null}
          <Button block onPress={() => handleSubmit()} info><Text style={Style.textWhite}>Add Location</Text></Button>
        </Form>

        <View style={[Style.mt2]}>
          {
            Object.keys(regions).map(key => {
              return <Card style={[Style.mb2, Style.boxLayout, Style.outerShadow, Style.p1]} key={key}>
                <CardItem>
                  <Body>
                    <Button style={styles.closeIconWrapper} onPress={() => handleRemove(key)} transparent><Icon style={styles.closeIcon} name="close" /></Button>
                    <Row><Col size={20}><Text style={[Style.bold, Style.mb1]}>State:</Text></Col><Col size={70}><Text>{regions[key].State.Name}</Text></Col></Row>
                    <Row><Col size={20}><Text style={[Style.bold, Style.mb1]}>Country:</Text></Col><Col size={70}><Text>{regions[key].Country.Name}</Text></Col></Row>
                    <Row><Col size={20}><Text style={[Style.bold, Style.mb1]}>District:</Text></Col><Col size={70}><Text>{regions[key].District.Name}</Text></Col></Row>
                    <Row><Col size={20}><Text style={[Style.bold, Style.mb1]}>Tehsil:</Text></Col><Col size={70}><Text>{regions[key].Tehsil.Name}</Text></Col></Row>
                    <Row><Col size={20}><Text style={[Style.bold, Style.mb1]}>Uc:</Text></Col><Col size={70}><Text>{regions[key].UnionCouncil.Name}</Text></Col></Row>
                  </Body>
                </CardItem>
              </Card>
            })
          }
        </View>
        <Button onPress={() => handleRequest('Volunteer')} block success><Text style={[Style.textWhite, Style.fontSizeNormal]}>Request</Text></Button>

      </View>
    </ScrollView>
  );
}

const mapState = state => {
  const { region } = state;
  return {
    levels: region.levels,
    countries: region.countries,
    states: region.states,
    districts: region.districts,
    tehsils: region.tehsils,
    ucs: region.ucs,
    regions: region.regions
  }
}

export default connect(mapState)(OrganisationJoinVolunteerScreen);


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
  },
  closeIconWrapper: {
    position: 'absolute',
    right: 0,
    top: -15,
    zIndex: 99
  },
  closeIcon: {
    fontSize: 24,
    color: 'red',
  },
  cardLabel: {
    width: 200,
    paddingRight: 5,
  }
});
