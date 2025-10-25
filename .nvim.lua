-- .nvim.lua
if not pcall(require, "conform") then
	return
end

local conform = require("conform")
local util = require("conform.util")

conform.setup({
	format_on_save = { timeout_ms = 500, lsp_fallback = false },
	formatters = {
		eslint_d = {
			command = "bunx",
			args = { "eslint_d", "--fix-to-stdout", "--stdin", "--stdin-filename", "$FILENAME" },
			stdin = true,
			cwd = util.root_file({
				"eslint.config.js",
				"eslint.config.mjs",
				"eslint.config.cjs",
				".eslintrc",
				".eslintrc.js",
				".eslintrc.cjs",
				".eslintrc.json",
				"package.json",
			}),
		},
	},
	formatters_by_ft = {
		javascript = { "eslint_local" },
		typescript = { "eslint_local" },
		vue = { "eslint_local" },
	},
})
