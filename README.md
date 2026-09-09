# pi-just-answer

A pi extension with two Shift+Tab modes:

- `exec`: normal pi behavior
- `just-answer`: appends ` --- no tool calls, just answer` unless the message already has that suffix

When `just-answer` is active, persistent text below the editor shows `just-answer`. Shift+Tab rotates to the next mode and replaces pi's normal Shift+Tab action.

## Install

```bash
pi install git:github.com/Distortedlogic/pi-just-answer
```

Restart pi after installation. The initial mode is `exec`.

## Remove

```bash
pi remove git:github.com/Distortedlogic/pi-just-answer
```
