
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import VariantCard from './VariantCard';
import { createGrid } from '../actions/gameActions';

class GridList extends Component {
  componentDidMount() {
    const { grid, row, column, createGrid } = this.props;
    if (grid.length <= 0) {
      createGrid(row * column);
    }
  }
  render() {
    const { grid, column } = this.props;
    console.log(this.props);
    return (
      <View style={styles.container}>
        {grid.map((item, index) => {
          return <VariantCard item={item} index={index} />
        })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
const mapDispatchToProps = {
  createGrid,
};
function mapStateToProps(state) {
  const { game } = state;
  const { row, column, grid, flipCount } = game;
  return { row, column, grid, flipCount };
}

export default connect(mapStateToProps, mapDispatchToProps)(GridList);