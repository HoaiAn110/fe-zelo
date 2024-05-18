import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextComponent from "../../components/TextComponent";
import { COLORS, APPINFOS } from "../../constants";
import { globalStyles } from "../../styles/globalStyle";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponet";
import { groupApi } from "../../apis/groupApi";
import userApi from "../../apis/userApi";
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import groupAvatar from "../../assets/images/group.png";



const ListGroupScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(authSelector);
    const userId = user.id;

    const [friendsAndGroups, setFriendsAndGroups] = useState([]);



    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupsResponse = await groupApi.handleGroups(
                    `/get-group-list/${userId}`,
                    {},
                    "GET"
                );

                setFriendsAndGroups(groupsResponse.data.map((group) => ({
                    ...group,
                    type: "group"
                })));
            } catch (error) {
                console.error(error);
            }
        };
        fetchGroups();
    }, []
    )

    return (
        <View style={styles.container} >
            {/* <HeaderComponent
                style={{
                    flexDirection: "row",
                    backgroundColor: COLORS.primary,
                    height: APPINFOS.sizes.HEIGHT * 0.06,
                    alignItems: "center",
                    paddingLeft: 16,
                    justifyContent: "space-between",

                }}
                title="Danh sách nhóm"
                fontFamily={"medium"}
                color={COLORS.white}
                size={18}
            /> */}
            <FlatList
                data={friendsAndGroups}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            if (item.type === "group") {
                                navigation.navigate("GroupDetailScreen", { groupId: item.id });
                            } else {
                                navigation.navigate("ChatScreen", { userId: item.id });
                            }
                        }}
                    >
                        <View style={globalStyles.listItemContainer}>
                            <View style={styles.listItem}>
                                <Avatar.Image
                                    size={40}
                                    source={item.type === "group" ? groupAvatar : { uri: item.Image }}
                                />
                                <View style={styles.listItemContent}>
                                    <TextComponent
                                        style={styles.listItemTitle}
                                        fontFamily={"medium"}
                                        color={COLORS.black}
                                        size={16}
                                        text={item.name}
                                    >
                                    </TextComponent>

                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />


        </View>
    )
}
const styles = StyleSheet.create({
    inputsContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
    },
    listItemContent: {
        marginLeft: 10,
    },


});

export default ListGroupScreen;