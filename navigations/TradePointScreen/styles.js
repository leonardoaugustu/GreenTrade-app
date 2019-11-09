import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        width: wp('68%')
    },
    safeView: {
        flexDirection: "column",
    },
    profileContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp('0%'),
        height: hp('30%'),
        backgroundColor: '#AFE2FC',
    },
    profileImg: {
        width: wp('22%'),
        height: wp('22%'),
        borderRadius: wp('11%'),
        marginTop: wp('8%')
    },
    nameTxt: {
        marginTop: wp('2%'),
        fontSize: wp('5%')
    },
    emailTxt: {
        marginTop: wp('2%'),
        color: 'dimgrey'
    },
    DrawerComponentScrollView: {
        // marginTop: hp('5"%'),
    },
    menuItem: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    menuIcon: {
        fontSize: wp('5%')
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        width: wp('100%'),
        height: hp('8.4%'),
        backgroundColor: '#87D5FA',
    },
    header: {
        flexDirection: "row",
        width: wp('100%'),
        height: hp('9.4%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        flex: 0.5,
    },
    titleWrapper: {
        flex: 2,
    },
    textTitle: {
        fontSize: wp('5%'),
        marginLeft: wp('18%'),
        color: "#fff"
    },
    drawerIcon: {
        marginLeft: wp('-6%')
    },
    qrcode: {
        shadowColor:"black",
        shadowOffset:{width:5, height:7},
        bottom: hp('0%'),
        height: hp('10%'),
        width: wp('80%'),
        alignSelf: "center",
        padding: wp("3%"),
    },
    rewardInfo: {
        shadowColor:"black",
        shadowOffset:{width:5, height:7},
        shadowOpacity:0.2,
        bottom: hp('0%'),
        height: hp('22%'),
        width: wp('80%'),
        alignSelf: "center",
        padding: wp("3%"),
    },
    point: {
        shadowColor:"black",
        shadowOffset:{width:5, height:7},
        bottom: hp('0%'),
        height: hp('10'),
        width: wp('20%'),
        left: wp("10%"),
        alignSelf: "flex-start",
        padding: wp("3%"),
    },
    scanQrcode: {
        shadowColor:"black",
        shadowOffset:{width:5, height:7},
        bottom: hp('0%'),
        height: hp('35%'),
        width: wp('80%'),
        alignSelf: "center",
        padding: wp("3%"),
    }

})