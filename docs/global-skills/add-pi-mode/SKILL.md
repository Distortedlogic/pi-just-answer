---
name: add-pi-mode
description: Use when the user asks to add a mode to the pi mode extension, globally or for a project.
---

# Add a pi mode

1. Use the requested scope. If unclear, ask which scope:
   - Global: `~/.pi/AGENT_MODES.yml`
   - Project: `<cwd>/.pi/AGENT_MODES.yml`
2. Read the file first. Create it only if missing.
3. Add or update one YAML entry: `mode-name: "text to append"`. Use the exact requested name and text, but omit a leading ` --- `; the extension adds it. Quote YAML values correctly. Preserve other entries and their order. Do not duplicate keys.
4. Tell the user to run `/reload`.
