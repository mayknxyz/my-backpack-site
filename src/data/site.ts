interface SiteMetadata {
	name: string;
	description: string;
	url: string;
	og: {
		title: string;
		description: string;
		type: string;
	};
}

export const site = {
	name: "My Backpack",
	description:
		"A curated directory of online tools and web apps — everything you need, in one backpack.",
	url: "https://mybackpack.mikenavales.xyz",
	og: {
		title: "My Backpack",
		description:
			"A curated directory of online tools and web apps — everything you need, in one backpack.",
		type: "website",
	},
} satisfies SiteMetadata;
