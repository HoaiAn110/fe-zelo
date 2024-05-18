import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponet';
import { COLORS, APPINFOS } from "../../constants";
import { globalStyles } from "../../styles/globalStyle";
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import ButtonComponent from '../../components/ButtonComponent';

const DetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { contact } = route.params;

    const handleRemove = () => {
        console.log('Remove contact:', contact);
        navigation.goBack();
    }

    return (
        <View style={globalStyles.container}>
            <HeaderComponent
                style={{
                    flexDirection: "row",
                    backgroundColor: COLORS.primary,
                    height: APPINFOS.sizes.HEIGHT * 0.06,
                    alignItems: "center",
                    paddingLeft: 16,
                    justifyContent: "space-between",
                }}
                title="Chi tiết liên hệ"
                fontFamily={"medium"}
                onBackPress={() => navigation.goBack()}
                color={COLORS.white}
                size={18}
            />
            <View style={styles.detailsContainer}>
                <Avatar.Image size={100} source={{ uri: contact.image }} style={styles.contactImage} />
                <Text style={styles.name}>{contact.name}</Text>
                <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
                <Text style={styles.phoneNumber}>{contact.email}</Text>
                <ButtonComponent
                    title="Sửa"
                    style={{
                        backgroundColor: COLORS.primary,
                        width: APPINFOS.sizes.WIDTH * 0.4,
                        height: APPINFOS.sizes.HEIGHT * 0.06,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => navigation.navigate('EditContactScreen', { contact })}
                />
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                <ButtonComponent
                    title="Xóa"
                    style={{
                        backgroundColor: COLORS.red,
                        width: APPINFOS.sizes.WIDTH * 0.4,
                        height: APPINFOS.sizes.HEIGHT * 0.06,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                    }}
                    onPress={handleRemove}
                />


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    contactImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    phoneNumber: {
        fontSize: 18,
        color: 'gray',
    },
});

export default DetailsScreen;