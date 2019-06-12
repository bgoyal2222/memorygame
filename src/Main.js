
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Dimensions, StyleSheet, Text, View, CheckBox, TouchableHighlight} from 'react-native';
import GridList from './components/GridList';
const { width, height } = Dimensions.get('window');
import { setTimer} from './actions/gameActions';
import * as Progress from 'react-native-progress';

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      started:'Start',

    };
  }
  componentDidMount(){
    const { timer, duration } = this.props;
    if(timer < duration){
      this.setState({started:'Resume'});
      this.interval = setInterval(()=>{
        const { timer } = this.props;
        console.log(timer);
        if(timer > 0) {
          this.props.setTimer(timer-1);
        }
      },1000);
    }
  }
  
  onPress = (val) =>{
    if(val === 'Pause'){
      console.log(val);
      this.interval = setInterval(()=>{
        const { timer } = this.props;
        console.log(timer);
        if(timer > 0) {
          this.props.setTimer(timer-1);
        }
      },1000);
    }
    else {
      if(this.interval){
        clearInterval(this.interval);
      }
    }
    this.setState({started:val});
  }
  render() {
    const { timer, duration, score, level } = this.props;
    const { started } = this.state;
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            {started ==='Start' && <TouchableHighlight
              underlayColor={'transparent'}
              onPress={()=>this.onPress('Pause')}
              style={styles.button}
            >
              <Text>{started}</Text>
            </TouchableHighlight>}
            {started === 'Pause'  && <TouchableHighlight
              underlayColor={'transparent'}
              onPress={()=>this.onPress('Resume')}
              style={styles.button}
            >
              <Text>{started}</Text>
            </TouchableHighlight>
            }
            {started === 'Resume' && <TouchableHighlight
              underlayColor={'transparent'}
              onPress={()=>this.onPress('Pause')}
              style={styles.button}
            >
              <Text>{started}</Text>
            </TouchableHighlight>}
            <Text>Level {level}</Text>
            <Text>Score {score}</Text>
          </View>
          <View style={styles.header}>
              <View>
                  <Progress.Bar progress={timer/duration} width={200} />
              </View>
              <Text>{timer}</Text>
          </View>
          
          <GridList />
        </View>
    );
  }
}

const mapDispatchToProps = {
  setTimer,
};
function mapStateToProps(state) {
  const { game } = state
    return { timer:game.timer, duration:game.duration, score:game.score, level:game.level }
  }

 export default connect(mapStateToProps, mapDispatchToProps)(Main);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button:{
    padding:10,
    backgroundColor:'#eee',
  },
  thread:{
    flexDirection:'row',
    alignItems:'center'
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width,
    padding: 15,
    //borderBottomWidth: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});