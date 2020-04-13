import Colors from './Colors';

export default {
  boxLayout:{
    borderRadius: 10,
    padding: 12
  },
  outerShadow: {
    backgroundColor: '#fbfbfb',
    borderColor: '#eee',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  innerShadow: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 6, height: 6 },
    borderColor: Colors.defaultBackground //'#fff'
  },
  defaultRadius:{
    borderRadius: 10,
  },
  defaultColor:{
    color: Colors.themeColorPrimary
  },
  defaultBg:{
    backgroundColor: Colors.themeColorPrimary
  },
  heading: {
    color: Colors.headingColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
  fontSizeNormal: {
    fontSize: 18,
  },
  m1:{
    margin: 5
  },
  m2:{
    margin: 10
  },
  m3:{
    margin: 15
  },
  m4:{
    margin: 20
  },
  m5:{
    margin: 25
  },
  mr1:{
    marginRight: 5
  },
  mr2:{
    marginRight: 10
  },
  mv1:{
    marginVertical: 5
  },
  mv2:{
    marginVertical: 10
  },
  mv3:{
    marginVertical: 15
  },
  mv4:{
    marginVertical: 20
  },
  mv5:{
    marginVertical: 25
  },
  p1:{
    padding: 5
  },
  p2:{
    padding: 10
  },
  p3:{
    padding: 15
  },
  pageContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.defaultBackground,
  }
};
