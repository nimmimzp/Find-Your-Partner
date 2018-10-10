import React, {Component} from 'react';
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {cancelIntrestRequest} from '../../store/actions/index';
class ReceiveRequestScreen extends Component {
    constructor(props) {
		super(props);
        console.ignoredYellowBox = ['Setting a timer' ];
        console.log(props)
    }
    userSelectedHandler = (key) =>{
        const selUser = this.props.receivedRequest.find(user => {
            return user.key === key;
        });
       
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selUser.firstName+' '+selUser.lastName,
            passProps: {
                selectedPlace: selUser,
                loggedinUser: this.props.authUserKey,
                buttonText:"Accept Request",
                addUserRequest:this.cancelRequest
            }
        });
    }

    cancelRequest = (requestedToDetail,requestByDetail,loggedinUser) => {
        this.props.cancelUserRequest(requestedToDetail,requestByDetail,loggedinUser)
    }
    render () {
        return <PlaceList
        places={this.props.receivedRequest}
        onItemSelected={this.userSelectedHandler}
      />
    }
}

const mapDispatchToProps = dispatch => {
    return{
        cancelUserRequest: (requestedToDetail,requestByDetail,loggedinUser) => dispatch(cancelIntrestRequest(requestedToDetail,requestByDetail,loggedinUser))
    }
}
  
  

  
export default connect(null,mapDispatchToProps)(ReceiveRequestScreen);