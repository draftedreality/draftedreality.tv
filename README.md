# fantasy.tv

# Setup

Run `bun install` to install dependencies.

# Development

- Run `bun dev` to start the backend Convex server.
- Run `cd mobile && bun run start` to start the mobile app.

## Code Quality

This project uses ESLint for linting and Prettier for code formatting.

### Available Scripts

- `bun run lint` - Run ESLint to check for code issues
- `bun run lint:fix` - Run ESLint and automatically fix issues
- `bun run format` - Format all files with Prettier
- `bun run format:check` - Check if files are properly formatted
- `bun run check` - Run both linting and format checking

### Pre-commit Workflow

Before committing code, run:

```bash
bun run check
```

If there are formatting issues, run:

```bash
bun run format
```

### CI/CD

The project includes a GitHub Actions workflow that automatically checks:

- ESLint compliance
- Prettier formatting
- TypeScript compilation

All pull requests must pass these checks before merging.

# Deployment

Run `bun deploy` to deploy the backend Convex server.
