#!/usr/bin/env node

import { resolve } from "node:path";
import { create } from "create-create-x";

const templateRoot = resolve(__dirname, "..", "templates");

const caveat = `
This is a caveat!
You can change this in \`src/cli.ts\`.
`;

// See https://github.com/painfulexistence/create-create-x/blob/main/README.md for other options.

create("create-nbstack", {
	templateRoot,
	extra: {
		architecture: {
			type: "list",
			describe: "choose your fave os",
			choices: ["macOS", "Windows", "Linux"],
			prompt: "if-no-arg",
		},
	},
	after: ({ answers }) => console.log(`Ok you chose ${answers.architecture}.`),
	caveat,
});
