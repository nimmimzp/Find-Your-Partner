import React, {Component} from 'react';
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {cancelIntrestRequest} from '../../store/actions/index';
class SendInterestScreen extends Component {
    constructor(props) {
		super(props);
        console.ignoredYellowBox = ['Setting a timer' ];
        console.log(props)
    }
    userSelectedHandler = (key) =>{
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        console.log(this.props.authUserKey)
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selPlace.firstName+' '+selPlace.lastName,
            passProps: {
                selectedPlace: selPlace,
                loggedinUser: this.props.authUserKey,
                buttonText:"Cancel Request",
                addUserRequest:this.cancelRequest
            }
        });
    }

    cancelRequest = (requestedToDetail,requestByDetail,loggedinUser) => {
        this.props.cancelUserRequest(requestedToDetail,requestByDetail,loggedinUser)
    }
    render () {
        return <PlaceList
        places={this.props.places}
        onItemSelected={this.userSelectedHandler}
      />
    }
}

const mapDispatchToProps = dispatch => {
    return{
        cancelUserRequest: (requestedToDetail,requestByDetail,loggedinUser) => dispatch(cancelIntrestRequest(requestedToDetail,requestByDetail,loggedinUser))
    }
}
  
  

  
export default connect(null,mapDispatchToProps)(SendInterestScreen);