import { useState, useEffect } from "react";
import { Button, Heading, Flex, View, Grid, Divider } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";  // Replace this with the correct path to your config file if necessary

// Configure Amplify
Amplify.configure(outputs);  // Ensure your Amplify configuration is correct
const client = generateClient({
  authMode: "userPool",  // This tells Amplify to use the user pool for authentication
});

export default function App() {
  const [userProfiles, setUserProfiles] = useState([]);
  const { signOut, user } = useAuthenticator((context) => [context.user]); // Accessing the user state

  // Fetch user profiles when the component mounts or user changes
  useEffect(() => {
    if (user) {
      console.log('User data:', user);  // Log the entire user object to see its structure
      fetchUserProfile();
    } else {
      console.log('User not logged in yet');
    }
  }, [user]); // This runs whenever the 'user' state changes

  // Fetch user profile
  async function fetchUserProfile() {
    if (user && user.signInDetails && user.signInDetails.loginId) {
      const dummyProfile = [{ email: user.signInDetails.loginId }];
      setUserProfiles(dummyProfile);
    } else {
      console.log("User email not available");
    }
  }

  return (
    <Flex
      className="App"
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="70%"
      margin="0 auto"
    >
      {/* Name is displayed here, on the main page, above the sign-in */}
      <Heading level={1}>Developed by: Suraj Varnesheela</Heading>  {/* Your name here */}

      {/* Conditional rendering based on user login */}
      {!user ? (  // Show this section if the user is not signed in
        <Heading level={2}>Please Sign In</Heading>
      ) : (
        <>
          <Heading level={1}>My Profile</Heading>
          <Divider />

          <Grid
            margin="3rem 0"
            autoFlow="column"
            justifyContent="center"
            gap="2rem"
            alignContent="center"
          >
            {userProfiles.map((userProfile) => (
              <Flex
                key={userProfile.email} // Use email as the key since it should be unique
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="2rem"
                border="1px solid #ccc"
                padding="2rem"
                borderRadius="5%"
                className="box"
              >
                <View>
                  <Heading level="3">{userProfile.email}</Heading>
                </View>
              </Flex>
            ))}
          </Grid>

          <Button onClick={signOut}>Sign Out</Button>
        </>
      )}
    </Flex>
  );
}
