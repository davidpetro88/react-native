import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const placeList = props => {
    return <FlatList style={styles.listContainer}
                     data={props.places}
                     renderItem={(info) => (
                         <ListItem
                             placeName={info.item.value}
                             placeImage={info.item.image}
                             onItemPressed={() => props.onItemDeleted(info.item.key)} />
                     )}
    />;
};

const styles = StyleSheet.create({
    listContainer: {
        width: "90%"
    }
});

export default placeList;