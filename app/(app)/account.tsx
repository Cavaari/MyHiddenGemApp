import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSession } from "../../providers/ctx"; // Import the session provider
import { getAuth } from "firebase/auth";

import { NavigationProp } from '@react-navigation/native';

const AccountScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { signOut } = useSession(); // Sign out from session
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          const role = idTokenResult.claims.role || "user"; 
          setIsAdmin(role === "admin");
          // console.log("user role:", idTokenResult.claims.role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        Alert.alert("Error", "Unable to fetch user role.");
      }
    };

    fetchUserRole();
  }, []);

  const handleAdminButtonPress = () => {
    navigation.navigate("AdminPage"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Page</Text>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Admin Features */}
      {isAdmin && (
        <TouchableOpacity style={styles.adminButton} onPress={handleAdminButtonPress}>
          <Text style={styles.buttonText}>Manage Locations</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: "#00BFFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  adminButton: {
    backgroundColor: "#FF6347", // Different color for admin button
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AccountScreen;
