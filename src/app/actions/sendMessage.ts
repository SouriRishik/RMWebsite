"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const ContactSchema = z.object({
	firstName: z.string().min(3).max(50),
	lastName: z.string().min(3).max(50),
	email: z.string().email(),
	message: z.string().min(10).max(500),
});

export type ContactFormType = z.infer<typeof ContactSchema>;

interface ResponseSchema {
	errors?: Record<string, string[]>;
}

export async function sendMessage(data: ContactFormType): Promise<ResponseSchema> {
	const validatedData = ContactSchema.safeParse(data);
	if (!validatedData.success) {
		return {
			errors: validatedData.error.flatten().fieldErrors,
		};
	}
	const discordWebhook = process.env.DISCORD_WEBHOOK_URL ?? "";
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
	const { firstName, lastName, email, message } = data;
	const embed = {
		title: "New Message!",
		description: message,
		fields: [
			{
				name: "Name",
				value: `${firstName} ${lastName}`,
				inline: true,
			},
			{
				name: "Email",
				value: email,
				inline: true,
			},
		],
		color: 0x5865f2,
		timestamp: new Date().toISOString(),
		thumbnail: {
			url: `${baseUrl}/logo.png`,
		},
		url: baseUrl,
	};
	const body = JSON.stringify({ embeds: [embed] });
	await fetch(discordWebhook, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	try {
		const smtpHost = process.env.SMTP_HOST;
		const smtpPort = Number(process.env.SMTP_PORT ?? "465");
		const smtpUser = process.env.SMTP_USER;
		const smtpPass = process.env.SMTP_PASS;
		const emailTo = process.env.EMAIL_TO;

		if (smtpHost && smtpUser && smtpPass && emailTo) {
			const transporter = nodemailer.createTransport({
				host: smtpHost,
				port: smtpPort,
				secure: smtpPort === 465,
				auth: {
					user: smtpUser,
					pass: smtpPass,
				},
			});

			await transporter.sendMail({
				from: `"${firstName} ${lastName}" <${smtpUser}>`,
				to: emailTo,
				replyTo: email,
				subject: `New Contact Form Message from ${firstName} ${lastName}`,
				text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
				html: `
					<div style="font-family: Arial, sans-serif;">
						<img src="${baseUrl}/logo.png" alt="RoboManipal" width="80" height="80" />
						<h2>New Contact Form Submission</h2>
						<p><strong>Name:</strong> ${firstName} ${lastName}</p>
						<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
						<hr />
						<p><strong>Message:</strong></p>
						<p>${message.replace(/\n/g, "<br />")}</p>
					</div>
				`,
			});
		}
	} catch (err) {
		console.error("Failed to send email:", err);
	}

	return {};
}
