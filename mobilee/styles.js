import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        minHeight: 60,
        backgroundColor: "#bbb",
        borderRadius: 15,
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },

    title: {
        fontSize: 18,
        fontWeight: "bold"
    },

    text: {
        fontSize: 18
    },

    button: {
        height: 40,
        backgroundColor: "#888",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 10
    }
});

export default styles;