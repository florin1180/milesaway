import React , { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Context as AuthContext } from '../context/AuthContext'



export function DrawerContent(props) {

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const {signOut} = useContext(AuthContext)


    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://cdn.pixabay.com/photo/2020/07/25/13/47/boat-5436748_960_720.jpg'
                                }}
                                size={70}
                            />
                            <View style={{marginLeft:35, marginTop: 12, flexDirection:'column'}}>
                                <Title style={styles.title}>Journeys App</Title>
                                {/* <Caption style={styles.caption}>by Florin Iordache</Caption> */}
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                    icon={({color, size}) => (
                        <Icon
                        name="home-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label='Home'
                    onPress={() => {props.navigation.navigate('Journey')}}
                    />
                    <DrawerItem 
                    icon={({color, size}) => (
                        <Icon
                        name="bookmark-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label='History'
                    onPress={() => {props.navigation.navigate('History')}}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon
                        name="account-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label='Account'
                    onPress={() => {props.navigation.navigate('Account')}}
                />
                    </Drawer.Section>
                    <Drawer.Section title='Preferences'>
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Night mode</Text>
                            <View pointerEvents='none'>
                                <Switch value={isDarkTheme}/>
                            </View>
                            </View>
                        </TouchableRipple>

                    </Drawer.Section>            

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )}
                    label='Sign Out'
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>

        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft:20,
        
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontWeight:'bold',
    },
    caption:{
        fontSize: 14,
        lineHeight:14,
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems: 'center',
    },
    section: {
        flexDirection:'row',
        alignItems: 'center',
        marginRight:15,
    },
    paragraph:{
        fontWeight: 'bold',
        marginRight:3,
    },
    drawerSection: {
        marginTop:15,
    },
    bottomDrawerSection:{
        marginBottom: 15,
        borderTopColor:'#f4f4f4',
        borderTopWidth:1,
    },
    preference:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
})