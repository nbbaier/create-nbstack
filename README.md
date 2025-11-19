# Create Nbstack

A CLI scaffolding tool designed to generate new Node.js projects.

## Codebase Overview

### Purpose
Quickly bootstrap a new project with a basic structure by running `npx create-nbstack <name>`.

### Stack
- **Language**: TypeScript (Node.js)
- **Build Tool**: `tsup` (compiles the CLI to ESM)
- **Package Manager**: npm

### Key Components
1. **CLI Entry Point (`src/cli.ts`)**:
   - Handles user interaction using `node:readline`.
   - Prompts for Project Name and Operating System.
   - Creates the target directory and copies files from `templates/default/`.
   - Performs string replacement in files.

2. **Templates (`templates/default/`)**:
   - Contains the blueprint for the generated project.
   - Includes `package.json`, `index.js`, and `README.md`.

### Flow
1. **User Input**: Prompts for project details.
2. **Template Processing**: Reads files from `templates/default`.
3. **Generation**: Replaces placeholders (e.g., `{{projectName}}`) and writes files.

## Usage

```bash
npx create-nbstack <name>
```

## Template string reference

> Don't forget to remove this before publishing your package!

- {{name}} => create-nbstack
- {{upper name}} => CREATE-NBSTACK
- {{lower name}} => create-nbstack
- {{capital name}} => CreateNbstack
- {{capital name space=true}} => Create Nbstack
- {{camel name}} => createNbstack
- {{snake name}} => create_nbstack
- {{kebab name}} => create-nbstack
- {{space name}} => create nbstack
- {{uuid}} => 870fdc28-426f-4781-8aa6-c3f8e3f5a72c
- {{upper (uuid)}} => 341FCC2A-10EA-4466-A79C-D991303F7760
- {{description}} => 
- {{author}} => Nico Baier
- {{email}} => nico.baier@gmail.com
- {{contact}} => Nico Baier <nico.baier@gmail.com>
- {{license}} => MIT
- {{year}} => 2025
- {{custom}} =>  (undefined until it is defined in `extra` field in `create` function arguments)

See https://github.com/painfulexistence/create-create-x#template for the further details.
