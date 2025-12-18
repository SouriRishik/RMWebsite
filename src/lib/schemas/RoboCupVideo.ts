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
			name: "order",
			title: "Order",
			type: "number",
			description: "Order in which videos appear",
		},
		{
			name: "createdAt",
			title: "Created At",
			type: "datetime",
		},
	],
};
