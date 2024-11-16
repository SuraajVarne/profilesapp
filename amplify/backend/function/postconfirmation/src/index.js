/**
 * @type {import('@types/aws-lambda').CognitoUserPoolTriggerHandler}
 */
 exports.handler = async (event) => {
    // Log the event for debugging purposes
    console.log("Post Confirmation Event: ", JSON.stringify(event, null, 2));

    // You can perform any logic after user confirmation here
    // Example: Add logic to trigger additional workflows, notifications, etc.

    // For example, you can add a custom attribute or log something specific
    const user = event.request.userAttributes;
    console.log(`User ${user.email} confirmed sign-up`);

    // Returning the event so that Cognito can proceed
    return event;
};
