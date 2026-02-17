interface Tool {
	name: string;
	url: string;
	description: string;
	emoji: string;
}

export const tools = [
	{
		name: "My Kit",
		url: "https://mykit.mikenavales.xyz",
		description: "Developer toolkit",
		emoji: "🧰",
	},
	{
		name: "My Buddy",
		url: "https://mybuddy.mikenavales.xyz",
		description: "AI assistant",
		emoji: "🤖",
	},
] satisfies Tool[];

export type { Tool };
