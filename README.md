# pi-just-answer

A pi extension with four Shift+Tab modes, in this order:

- `exec`: normal pi behavior
- `just-answer`: appends ` --- no tool calls, just answer`
- `targeted-edits`: appends ` --- do the targeted edit calls to execute this task. u may use the write tool if u need a new file, or the read tool if an edit fails on needed a new read, or bash to commit at the end. then halt.`
- `create-tasklist`: appends ` --- now group this into work units and give me a technical impl plan for this in the format of a properly ordered task list, n dump the task list into a {generate_full_concept_coverage_minimal_length_prefix}_TASKLIST.md in cwd`

A suffix is not added if the message already ends with it.

In every mode except `exec`, persistent text below the editor shows the active mode name. Shift+Tab rotates to the next mode and returns to `exec` after `create-tasklist`. It replaces pi's normal Shift+Tab action.

## Install

```bash
pi install git:github.com/Distortedlogic/pi-just-answer
```

Restart pi after installation. The initial mode is `exec`.

## Remove

```bash
pi remove git:github.com/Distortedlogic/pi-just-answer
```
