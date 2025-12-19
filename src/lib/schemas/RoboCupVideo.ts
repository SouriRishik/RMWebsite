export default {
	name: "roboCupVideo",
	title: "RoboCup Video",
	type: "document",
	description: "A video for the RoboCup section",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			description: "Video title (e.g., 1st video, 2nd video)",
		},
		{
			name: "video",
			title: "Video",
			type: "file",
			options: {
				accept: "video/mp4,video/webm,video/ogg",
			},
		},
		{
			name: "caption",
			title: "Caption",
			type: "string",
			description: "Caption to display below the video",
		},
		{
			name: "order",
			title: "Order",
			type: "number",
			description: "Order in which videos appear (natural numbers only: 1, 2, 3...)",
			// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			validation: (Rule: any) => Rule.required().min(1).integer(),
		},
		{
			name: "createdAt",
			title: "Created At",
			type: "datetime",
		},
	],
};
