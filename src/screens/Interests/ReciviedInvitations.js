import React, {Component} from 'react';
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {cancelReceivedRequest,acceptUserRequest} from '../../store/actions/index';
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
                cancelRequest:this.cancelRequest,
                acceptRequest:this.acceptRequest
            }
        });
    }

    cancelRequest = (receivedByDetail,loggedinUser) => {
        this.props.cancelUserRequest(receivedByDetail,loggedinUser)
    }
    acceptRequest = (receivedByDetail,loggedinUser) => {
        this.props.acceptUserRequest(receivedByDetail,loggedinUser);
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
        cancelUserRequest: (receivedByDetail,loggedinUser) => dispatch(cancelReceivedRequest(receivedByDetail,loggedinUser)),
        acceptUserRequest: (receivedByDetail,loggedinUser) => dispatch(acceptUserRequest(receivedByDetail,loggedinUser))
    }
}
  
  

  
export default connect(null,mapDispatchToProps)(ReceiveRequestScreen);