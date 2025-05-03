import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link } from "expo-router";
import { useRouter } from 'expo-router';


const register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
            />

            <Text style={styles.label}>User Name</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={true}
            />
            <Button title="register" />
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, }}>
                <Text>Already have an account ? </Text>
                <Link href="/login" style={{ color: "red" }}>Login</Link>
                <Link href="./(tabs)/chat" style={{ color: "red" }}>tab</Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontWeight:"bold",
        color: "gray"
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default register;