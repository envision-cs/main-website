## Design Context

### Users

Envision's primary users are prospective construction clients and prospective employees evaluating the company online. Clients are typically assessing whether Envision is credible, capable, organized, and trustworthy enough to handle high-value, schedule-sensitive work. Recruits are judging culture, professionalism, and whether the company feels established, values-driven, and ambitious. The interface should help both groups quickly understand Envision's services, project quality, people, and reputation without friction.

### Brand Personality

The brand should read as loyal, trustworthy, and efficient. The emotional outcome should balance confidence, trust, ambition, warmth, and calm rather than leaning into hype or sterility. Communication should feel direct, composed, and credible, with enough warmth to reflect the company's people-first and faith-informed identity.

### Aesthetic Direction

Preserve the existing light-mode system built around Envision blue, Envision green, the current gray palette, and the existing Proxima Nova-based typography. The visual direction should be minimal, sharp, and exacting, with every layout decision reflecting presentation, precision, and craftsmanship. Brand expression should come from composition, proportion, typography, spacing, and restrained color use rather than decorative effects or trend-driven treatments. The site should not feel cluttered, cheap, generic, flashy, or overly basic, and it should avoid dated corporate heaviness as well as overly atmospheric or embellished UI. Dark mode is out of scope unless explicitly requested in the future.

### Design Reference

[`app/components/three-uniques.vue`](./app/components/three-uniques.vue) is a strong reference for the intended design sentiment. It demonstrates the preferred balance of hard edges, clean structure, large controlled type, strong negative space, and disciplined use of Envision blue and green. Future UI work should align more closely with that language than with softer, more decorative, or effect-heavy treatments.

### Design Principles

1. Lead with credibility. Use clear hierarchy, disciplined spacing, and strong project imagery to make Envision feel capable, established, and dependable.
2. Preserve the core brand system. Keep the existing blue, green, gray, and font system intact unless there is an explicit request to expand it.
3. Favor minimal sharpness over embellishment. Interfaces should feel polished and confident without softening into generic luxury tropes or becoming flashy.
4. Let craftsmanship show through restraint. Use fewer, stronger elements with clear alignment, intentional proportion, and tight visual discipline.
5. Prefer clean structure over density. Pages should flow clearly, reduce clutter, and make important actions and proof points easy to find.
6. Treat accessibility as a default requirement. New work should target WCAG AA contrast, clarity, focus states, and motion restraint by default.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, but it invokes Vite through `vp dev` and `vp build`.

## Vite+ Workflow

`vp` is a global binary that handles the full development lifecycle. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- staged - Run linters on staged files
- install (`i`) - Install dependencies
- env - Manage Node.js versions

### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt - Format code
- test - Run tests

### Execute

- run - Run monorepo tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as pnpm, npm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- list (`ls`) - List installed packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

### Maintain

- upgrade - Update `vp` itself to the latest version

These commands map to their corresponding tools. For example, `vp dev --port 3000` runs Vite's dev server and works the same as Vite. `vp test` runs JavaScript tests through the bundled Vitest. The version of all tools can be checked using `vp --version`. This is useful when researching documentation, features, and bugs.

## Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ built-in commands (`vp dev`, `vp build`, `vp test`, etc.) always run the Vite+ built-in tool, not any `package.json` script of the same name. To run a custom script that shares a name with a built-in command, use `vp run <script>`. For example, if you have a custom `dev` script that runs multiple services concurrently, run it with `vp run dev`, not `vp dev` (which always starts Vite's dev server).
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

## CI Integration

For GitHub Actions, consider using [`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) to replace separate `actions/setup-node`, package-manager setup, cache, and install steps with a single action.

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    cache: true
- run: vp check
- run: vp test
```

## Review Checklist for Agents

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to validate changes.
<!--VITE PLUS END-->
