import {connect} from 'react-redux'
import HomeScreen from './HomeView'
import {addPoints, updatePoints, getPoint} from '../../actions/Collector/actionCreator'

const mapStateToProps = (state) => ({
    rewardPoints: state.collectorReducer.rewardPoints,
})

const mapDispatchToProps = (dispatch) => ({
    addPoints: (payload) => dispatch(addPoints(payload)),
    updatePoints: (payload) => dispatch(updatePoints(payload)),
    getPoints: (payload) => dispatch(getPoint(payload)),
 })
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

