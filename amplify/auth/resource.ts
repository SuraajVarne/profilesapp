import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from './post-confirmation/resource';

export const auth = defineAuth({
  loginWith: {
    email: true,  // Enable sign-up using email
  },
  triggers: {
    postConfirmation,  // Link the Lambda function to the post-confirmation event
  }
});
