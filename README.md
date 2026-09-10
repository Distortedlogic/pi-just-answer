# pi-just-answer

Shift+Tab rotates through modes defined in YAML files. Each mode appends its configured text to user messages.

## Mode files

Files load in this order:

1. `~/.pi/AGENT_MODES.yml`: global modes
2. `./.pi/AGENT_MODES.yml`: modes for the current session's working directory

Each key is the mode display name. Each value is the text to append, without the separator. The extension adds ` --- ` before each non-empty value.

The global file can contain the original modes:

```yaml
exec: ""
just-answer: no tool calls, just answer
targeted-edits: >-
  do the targeted edit calls to execute this task. u may use the write tool if u need a new file,
  or the read tool if an edit fails on needed a new read, or bash to commit at the end. then halt.
create-tasklist: >-
  now group this into work units and give me a technical impl plan for this in the format of a properly ordered task list,
  n dump the task list into a {generate_full_concept_coverage_minimal_length_prefix}_TASKLIST.md in cwd
```

A project file can add modes or replace global values:

```yaml
just-answer: answer briefly without tools
review: review this project's changes and report defects without editing files
```

- Project values replace global values with the same name. They keep the global mode's position.
- New project names follow the global modes, in file order.
- Only trusted project files are loaded.
- The first loaded mode is initially selected. Put `exec: ""` first for normal behavior at startup.
- Missing or empty files are ignored. If no modes are loaded, `exec` is available without appended text.
- Names must be non-empty strings. Values must be strings. An invalid file is reported and ignored as a whole.
- Use `/reload` after changing a mode file.

## Behavior

The active mode name stays below the editor. The empty `exec` mode has no label and does not change messages.

Shift+Tab advances one mode per key press, then returns to the first mode after the last. It replaces pi's normal Shift+Tab action.

A suffix is not added if the message already ends with it. Messages sent by other extensions are not changed.

## Install

```bash
pi install git:github.com/Distortedlogic/pi-just-answer
```

Create a mode file, then run `/reload` or restart pi.

## Remove

```bash
pi remove git:github.com/Distortedlogic/pi-just-answer
```
