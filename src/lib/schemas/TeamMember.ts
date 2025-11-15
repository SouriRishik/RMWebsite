const currentYear = new Date().getFullYear();
const startYear = 2010;
const years = Array.from({ length: currentYear - startYear + 1 })
	.map((_, i) => {
		const y = startYear + i;
		return { title: String(y), value: String(y) };
	})
	.reverse();

export default {
	name: "teamMember",
	title: "Team Member",
	type: "document",
	description: "A team member",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			name: "year",
			title: "Year",
			type: "string",
			options: {
				list: years,
			},
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
			name: "github",
			title: "GitHub",
			type: "url",
		},
		{
			name: "linkedin",
			title: "LinkedIn",
			type: "url",
		},
		{
			name: "mail",
			title: "Mail",
			type: "string",
		},
		{
			name: "subsystem",
			title: "Subsystem",
			type: "string",
			options: {
				list: [
					{ title: "Coding", value: "coding" },
					{ title: "Electronics", value: "electronics" },
					{ title: "Research", value: "research" },
					{ title: "Mechanical", value: "mechanical" },
					{ title: "Management", value: "management" },
					{ title: "Simulation", value: "simulation" },
				],
			},
		},
		{
			name: "role",
			title: "Role",
			type: "string",
			options: {
				list: [
					{ title: "Member", value: "Member" },
					{ title: "Subsystem Head", value: "Subsystem Head" },
					{ title: "Team Manager", value: "Team Manager" },
					{ title: "Team Leader", value: "Team Leader" },
					{ title: "Senior Member", value: "Senior Member" },
					{ title: "Tech Lead", value: "Tech Lead" },
				],
			},
		},
	],
};
