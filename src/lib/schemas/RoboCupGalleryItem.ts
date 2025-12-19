export default {
	name: "roboCupGalleryItem",
	title: "RoboCup Gallery Item",
	type: "document",
	description: "An image for the RoboCup gallery section",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			description: "Image title (e.g., In Action, Precision Engineering)",
		},
		{
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "caption",
			title: "Caption",
			type: "string",
			description: "Short caption for the image",
		},
		{
			name: "order",
			title: "Order",
			type: "number",
			description: "Order in which images appear (natural numbers only: 1, 2, 3...)",
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
