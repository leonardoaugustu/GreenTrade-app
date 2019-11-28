import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Button, KeyboardAvoidingView, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { SegmentedControls } from 'react-native-radio-buttons';
import { connect } from 'react-redux';
import {purchaseTotal} from '../../actions/Payment/actionCreators';
import {containersToPurchase} from '../../actions/Payment/actionCreators';

const options = [
  "Credit Card",
  "PayPal"
];

class PaymentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'Credit Card',
      confirmDialogVisible: false,
      successDialogVisible: false,
      validationDialogVisible: false,
      creditCard: {
        status: {}
      }
    };
  }

  processPayment = () => {
    console.log(this.state.creditCard);
    if (this.state.creditCard.valid) {
      this.showConfirmmDialog();
    } else {
      this.showValidationErrors();
    }
  }

  showConfirmmDialog = () => {
    this.setState({ confirmDialogVisible: true })
  }

  showValidationErrors = () => {
    this.setState({ validationDialogVisible: true })
  }

  _onChange = (form) => {
    this.setState({ creditCard: form });
  };

  setSelectedOption = (selectedOption) => {
    this.setState({
      selectedOption
    });
  }

  // formatNumber = (number) => {
  //   return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <Icon
                onPress={() => this.props.navigation.openDrawer()}
                type="material"
                name="menu"
                size={30}
                color="#fff"
                containerStyle={styles.drawerIcon}
              />
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.textTitle}>Payment</Text>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView style={styles.container} behavior="padding">

          <ScrollView>

            <View>
              <View style={styles.displayAmount}>
                <Text>Total Amount</Text>
                <Text style={styles.displayText}>$ {this.props.price}</Text>
              </View>

              <View style={styles.paymentMethod}>
                <Text>Payment Method</Text>
                <SegmentedControls
                  options={options}
                  onSelection={this.setSelectedOption.bind(this)}
                  selectedOption={this.state.selectedOption}
                />
              </View>

              {this.state.selectedOption == 'Credit Card' ?
                <View>
                  <CreditCardInput
                    requiresName={true}
                    allowScroll={true}
                    onChange={this._onChange} />

                  <TouchableOpacity style={styles.paymentButton} onPress={this.processPayment}>
                    <Text style={styles.buttonText}>Pay Now</Text>
                  </TouchableOpacity>
                </View>
                :
                <TouchableOpacity style={styles.paymentButton} onPress={this.showConfirmmDialog}>
                  <Text style={styles.buttonText}>PayPal</Text>
                </TouchableOpacity>
              }
            </View>

          </ScrollView>
        </KeyboardAvoidingView>

        <ConfirmDialog
          title="Confirmation"
          message="Do you want to proceed with the payment?"
          visible={this.state.confirmDialogVisible}
          animationType='fade'
          onTouchOutside={() => this.setState({ confirmDialogVisible: false })}
          positiveButton={{
            title: "YES",
            onPress: () => this.setState({ confirmDialogVisible: false, successDialogVisible: true })
          }}
          negativeButton={{
            title: "NO",
            onPress: () => this.setState({ confirmDialogVisible: false })
          }}
        />

        <Dialog
          title="Thank you"
          animationType="fade"
          contentStyle={styles.dialogContent}
          titleStyle={styles.centeredText}
          onTouchOutside={() => this.props.navigation.goBack()}
          visible={this.state.successDialogVisible}>

          <Image style={styles.successImage} source={require('../../assets/success-icon.jpg')} />
          <Text style={styles.dialogMessage} >
              Your payment has been successfully processed.
          </Text>
          <Button
            style={styles.dialogButton}
            onPress={() => this.props.navigation.goBack()}
            title="Continue"
          />
        </Dialog>

        <Dialog
          title="Please check the fields:"
          animationType="fade"
          contentStyle={styles.dialogContent}
          titleStyle={styles.centeredText}
          onTouchOutside={() => this.setState({ validationDialogVisible: false })}
          visible={this.state.validationDialogVisible}>
            
          <View>
            {this.state.creditCard.status.number!='valid' && 
              <Text style={styles.errorMessage}>
                Card Number: {this.state.creditCard.status.number || 'Incomplete'}
              </Text>
            }
            {this.state.creditCard.status.expiry!='valid' && 
              <Text style={styles.errorMessage}>
                Expiry: {this.state.creditCard.status.expiry || 'Incomplete'}
              </Text>
            }
            {this.state.creditCard.status.cvc!='valid' && 
              <Text style={styles.errorMessage}>
                CVC: {this.state.creditCard.status.cvc || 'Incomplete'}
              </Text>
            }
            {this.state.creditCard.status.name!='valid' && 
              <Text style={styles.errorMessage}>
                Name: {this.state.creditCard.status.name || 'Incomplete'}
              </Text>
            }
            <Button
              style={styles.dialogButton}
              onPress={() => this.setState({ validationDialogVisible: false })}
              title="Continue"
            />
          </View>
        </Dialog>

      </SafeAreaView>
    );
  }
}

function mapStateToProps (state){
  return{
    price: state.purchaseTotalReducer.price,
    containers: state.purchaseTotalReducer.containers
  }; 
}

function mapDispatchToProps (dispatch)  {
  return {
      purchaseTotal: (price) => dispatch(purchaseTotal(price)),
      containersToPurchase: (containers) => dispatch(containersToPurchase(containers))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentView);