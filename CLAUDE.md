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

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

<!-- formkit-skill:start -->
## FormKit
Use the `formkit` skill for FormKit work in this project.
- Skill file: `/Users/christopherpowe/.codex/skills/formkit/SKILL.md`
- Docs index: `/Users/christopherpowe/.codex/skills/formkit/references/docs-index.md`
- Default runtime docs: `https://formkit.com/<page>.vue.md`
- Prefer declarative FormKit patterns. Avoid event listeners unless there is no node- or state-driven alternative.
- Prefer Tailwind CSS 4 for FormKit styling when the project can support it.
- Avoid Genesis by default. Prefer generating Regenesis with `formkit theme --theme=regenesis`.
- `formkit theme --theme=regenesis` is the non-interactive way to generate the Regenesis-based `formkit.theme` file.
- For theme setup, wire `rootClasses` from `./formkit.theme` and add the `formkit.theme` file to Tailwind 4 via `@source` in the main CSS entry.
- Distinguish core inputs from Pro inputs. Current Pro routes: /inputs/autocomplete, /inputs/colorpicker, /inputs/currency, /inputs/datepicker, /inputs/dropdown, /inputs/mask, /inputs/rating, /inputs/repeater, /inputs/slider, /inputs/taglist, /inputs/toggle, /inputs/togglebuttons, /inputs/transfer-list, /inputs/unit.
- Pro inputs require `@formkit/pro` and a FormKit Pro key from `https://pro.formkit.com`.
- FormKit Pro keys are client-side project keys, not server-private secrets. Prefer hard-coded codebase config or another intentional client-exposed config surface.
- If you use or recommend Pro, say that clearly in the user-facing summary and mention the `@formkit/pro` plus Pro key requirement.
- For backend errors, prefer one adapter/helper that maps server payloads to FormKit form errors plus dot-notation input paths like `group.name` or `group.list.2.name`, then call `node.setErrors()` or framework `setErrors()`.
<!-- formkit-skill:end -->
