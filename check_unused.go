package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

// Helper to convert to PascalCase
func toPascalCase(s string) string {
	parts := strings.Split(s, "-")
	for i, p := range parts {
		if len(p) > 0 {
			parts[i] = strings.ToUpper(p[:1]) + p[1:]
		}
	}
	return strings.Join(parts, "")
}

func main() {
	componentsDir := "app/components"
	appDir := "app"

	type Component struct {
		FilePath   string
		PascalName string
		KebabName  string
	}

	var components []Component

	// 1. Identify all components
	err := filepath.WalkDir(componentsDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() && strings.HasSuffix(d.Name(), ".vue") {
			// Calculate component name
			relPath, _ := filepath.Rel(componentsDir, path)
			
			// Handle .client.vue, .server.vue
			name := relPath
			name = strings.TrimSuffix(name, ".vue")
			name = strings.TrimSuffix(name, ".client")
			name = strings.TrimSuffix(name, ".server")

			parts := strings.Split(name, "/")
			
			// Handle index.vue (remove "index" from parts if it's not the only part)
			if parts[len(parts)-1] == "index" && len(parts) > 1 {
				parts = parts[:len(parts)-1]
			}

			// Clean up parts (remove generic extension stuff if any) and join
			kebabParts := make([]string, 0)
			for _, p := range parts {
				// if file was "my-component.vue", p is "my-component"
				kebabParts = append(kebabParts, p)
			}
			
			kebabName := strings.Join(kebabParts, "-")
			pascalName := toPascalCase(kebabName)

			components = append(components, Component{
				FilePath:   path,
				PascalName: pascalName,
				KebabName:  kebabName,
			})
		}
		return nil
	})

	if err != nil {
		fmt.Printf("Error walking components: %v\n", err)
		return
	}

	// 2. Scan all files in app/ for usages
	usedComponents := make(map[string]bool)

	err = filepath.WalkDir(appDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}
		// Only check .vue and .ts files
		if !strings.HasSuffix(path, ".vue") && !strings.HasSuffix(path, ".ts") {
			return nil
		}

		contentBytes, err := os.ReadFile(path)
		if err != nil {
			return nil // Skip unreadable
		}
		content := string(contentBytes)

		for _, c := range components {
			// Don't count self-usage (though recursive components are a thing, 
			// usually we want to know if *other* things use it)
			if path == c.FilePath {
				continue
			}

			// Simple check: Check for <PascalName or <kebab-name
			// Also check for :is="PascalName" or similar? stricter regex is better but simple strings usually work.
			// Nuxt components are usually auto-imported.
			
			// Check PascalCase usage: <AppHeader
			if strings.Contains(content, "<"+c.PascalName) {
				usedComponents[c.FilePath] = true
			}
			// Check kebab-case usage: <app-header
			if strings.Contains(content, "<"+c.KebabName) {
				usedComponents[c.FilePath] = true
			}
			// Check for dynamic components or imports might be harder, but let's check basic string presence too
			// if it looks like a component usage.
			// Regex for strictly tag usage to avoid false positives in text?
			// Let's stick to the simple contains for <Tag first.
		}

		return nil
	})

	if err != nil {
		fmt.Printf("Error walking app: %v\n", err)
		return
	}

	// 3. Report
	fmt.Printf("Found %d components.\n", len(components))
	fmt.Println("potentially unused components:")
	count := 0
	for _, c := range components {
		if !usedComponents[c.FilePath] {
			fmt.Printf("- %s (%s / <%s>)\n", c.FilePath, c.PascalName, c.KebabName)
			count++
		}
	}
	if count == 0 {
		fmt.Println("No unused components found.")
	}
}
