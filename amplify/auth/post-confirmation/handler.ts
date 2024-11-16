import type { PostConfirmationTriggerHandler } from "aws-lambda";

export const handler: PostConfirmationTriggerHandler = async (event) => {
  // You can add any logic here to process the event after confirmation
  console.log("Post confirmation event:", event);
  return event;
};
