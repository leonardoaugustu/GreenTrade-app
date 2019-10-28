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
    pictureDetailContainer: {
        height: hp('88%')
    },
    points: {
        flexDirection: "row",
        top: hp('2%'),
        alignSelf: 'center'
    },
    Txt_h2: {
        fontSize: 25,
    },
    logo: {
        flexDirection: "row",
        alignSelf: 'center',
    },
    logoIcon:
    {
    },
    image:
    {
        top: hp('3%'),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    imageIcon: {
    },
    materials: {
        alignSelf: 'center',
        padding: hp('5%')
    },
    Txt_h3: {
        fontSize: 22,
    },
    button: {
        alignSelf: 'center',
    }, 
    buttonSize: {
        height: hp('6%'), width: wp('30%')
    }
})