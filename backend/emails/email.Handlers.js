import { MailTrapclient, sender } from "../lib/mailtrap.js";
import { createCommentNotificationEmailTemplate, createConnectionAcceptedEmailTemplate, createWelcomeEmailTemplate } from "./email.Tempelates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recipient = [
    {
      email,
    },
  ];

  try {
    
    const response = await MailTrapclient.send({
        from : sender,
        to: recipient,
        subject: `Welcome to LinkedIn ${name}`,
        html: createWelcomeEmailTemplate(name, profileUrl),
        category: "Welcome",
    })
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    
    throw new Error(error.message); 
  }
};

export const sendCommentNotificationEmail = async (
	recipientEmail,
	recipientName,
	commenterName,
	postUrl,
	commentContent
) => {
	const recipient = [{ email: recipientEmail }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "New Comment on Your Post",
			html: createCommentNotificationEmailTemplate(recipientName, commenterName, postUrl, commentContent),
			category: "comment_notification",
		});
		console.log("Comment Notification Email sent successfully", response);
	} catch (error) {
		throw error;
	}
};

export const sendConnectionAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {
	const recipient = [{ email: senderEmail }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: `${recipientName} accepted your connection request`,
			html: createConnectionAcceptedEmailTemplate(senderName, recipientName, profileUrl),
			category: "connection_accepted",
		});
	} catch (error) {}
};
