import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default {

    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      },
    logoText: {
        fontSize: 35,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
        color: 'grey'
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    googleSignInButton: {
        height: 45,
        marginTop: 10,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    GooglePlusStyle: {
        height: 45,
        marginTop: 10,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'grey',
      },    
      ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 40,
        width: 40,
        resizeMode: 'stretch',
      },
    
      TextStyle: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 16,
      },
    
      SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
      },      

      ErrorTextStyle: {
        color: 'red',
        marginLeft: 15,
        paddingLeft: 10,
      },
};