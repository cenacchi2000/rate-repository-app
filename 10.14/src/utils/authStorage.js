import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        // Get the access token for the storage
        const token = await AsyncStorage.getItem(
            `${this.namespace}:Token`,
        );
        return JSON.parse(token);

    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            `${this.namespace}:Token`,
            JSON.stringify(accessToken),
        );
        // Add the access token to the storage
    }
    removeAccessToken() {
        // Remove the access token from the storage
    }
}

export default AuthStorage;
