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
			description: "Order in which images appear",
		},
		{
			name: "createdAt",
			title: "Created At",
			type: "datetime",
		},
	],
};
