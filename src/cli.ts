#!/usr/bin/env node

import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const templateRoot = resolve(__dirname, "..", "templates");

interface Answers {
	projectName: string;
	architecture: "macOS" | "Windows" | "Linux";
}

async function prompt(question: string): Promise<string> {
	const readline = require("node:readline");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question(question, (answer: string) => {
			rl.close();
			resolve(answer);
		});
	});
}

async function getAnswers(): Promise<Answers> {
	const projectName = await prompt("What is your project named? ");

	console.log("\nChoose your favorite OS:");
	console.log("1. macOS");
	console.log("2. Windows");
	console.log("3. Linux");

	const osChoice = await prompt("Enter your choice (1-3): ");
	const architectureMap = {
		"1": "macOS" as const,
		"2": "Windows" as const,
		"3": "Linux" as const,
	};

	const architecture =
		architectureMap[osChoice as keyof typeof architectureMap] || "macOS";

	return { projectName, architecture };
}

async function copyTemplate(
	src: string,
	dest: string,
	replacements: Record<string, string>,
) {
	const stats = await readFile(src, "utf-8");
	let content = stats;

	for (const [key, value] of Object.entries(replacements)) {
		content = content.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value);
	}

	await writeFile(dest, content);
}

async function createProject(answers: Answers) {
	const projectDir = resolve(process.cwd(), answers.projectName);

	if (existsSync(projectDir)) {
		console.error(`Error: Directory ${answers.projectName} already exists`);
		process.exit(1);
	}

	await mkdir(projectDir, { recursive: true });

	const templateDir = join(templateRoot, "default");
	const files = await readdir(templateDir, { withFileTypes: true });

	for (const file of files) {
		const srcPath = join(templateDir, file.name);
		const destPath = join(projectDir, file.name);

		if (file.isFile()) {
			await copyTemplate(srcPath, destPath, {
				projectName: answers.projectName,
				architecture: answers.architecture,
			});
		}
	}

	console.log(`\n✅ Project "${answers.projectName}" created successfully!`);
	console.log(`📁 Location: ${projectDir}`);
	console.log(`🖥️  Architecture: ${answers.architecture}`);
	console.log("\nNext steps:");
	console.log(`  cd ${answers.projectName}`);
	console.log("  npm install");
	console.log("  npm start");
}

async function main() {
	try {
		console.log("🚀 Welcome to create-nbstack!");
		console.log("Let's create your new project.\n");

		const answers = await getAnswers();
		await createProject(answers);
	} catch (error) {
		console.error("Error creating project:", error);
		process.exit(1);
	}
}

if (import.meta.main) {
	main();
}
