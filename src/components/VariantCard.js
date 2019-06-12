
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { flipCard } from '../actions/gameActions';
const { width, height } = Dimensions.get('window');


class VaraiantCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  onPress = () => {
    const { flipCard, index, item, flipCount } = this.props;
    if (item.isFlipped == true) {
      return;
    }
    this.setState({ visible: true });
    setTimeout(() => {
      this.setState({ visible: false });
    }, 1000);
    flipCard(index);
  }
  render() {
    const { item, column } = this.props;
    const { visible } = this.state;
    console.log(this.props);

    if (item.show === true) {
      return (<TouchableOpacity onPress={this.onPress}>
        <View style={[styles.container, { width: (width / column) - 50, height: (width / column) - 50 }]}>
          {(item.isFlipped == true || visible) && <Text>{item.val}</Text>}
        </View>
      </TouchableOpacity>)
    }
    else {
      return <View style={[styles.container, { width: (width / column) - 50, height: (width / column) - 50, backgroundColor: 'red' }]}>
        {(item.isFlipped == true || visible) && <Text>{item.val}</Text>}
      </View>
    }
  }
}
const mapDispatchToProps = {
  flipCard,
};
function mapStateToProps(state) {
  const { game } = state;
  const { column, flipCount } = game;
  return { column, flipCount };
}

export default connect(mapStateToProps, mapDispatchToProps)(VaraiantCard);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    margin: 10,
  },
  pickerStyle: {
    width: width / 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent:'space-between'
  },
  key: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    width: 80
  },
  val: {
    fontSize: 14,
    color: '#000'
  }
});
