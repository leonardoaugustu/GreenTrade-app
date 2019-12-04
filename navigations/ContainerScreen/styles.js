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
        flexDirection: "column",
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
        marginLeft: wp('14%'),
        color: "#fff"
    },
    drawerIcon: {
        marginLeft: wp('-6%')
    },
    imgContainer: {
        width: wp('20%'),
        height: wp('20%')
    },
    list: {
        flex: 1,
        marginHorizontal: wp('5%'),
        marginVertical: hp('2%'),
    },
    displayBox: {
        alignItems: "center",
        marginHorizontal: wp('9%'),
        marginVertical: hp('2%'),
        backgroundColor: '#e1ecf4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c3defa',
        height: hp('7%')
    },
    displayText: {
        marginTop: wp('2%'),
        fontSize: wp('10%'),
        justifyContent: "center",
        fontSize: wp('5%'),
        color: "#3973ad"
    },
    displayMessage: {
        marginTop: wp('2%'),
        marginHorizontal: wp('9%'),
        justifyContent: "center",
        fontSize: wp('5%'),
        color: "#3973ad"
    },
})