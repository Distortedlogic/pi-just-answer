# pi-just-answer

A pi extension with three Shift+Tab modes, in this order:

- `exec`: normal pi behavior
- `just-answer`: appends ` --- no tool calls, just answer`
- `targeted-edits`: appends ` --- do the targeted edit calls to execute this task. u may use the write tool if u need a new file, or the read tool if an edit fails on needed a new read, or bash to commit at the end. then halt.`

A suffix is not added if the message already ends with it.

In `just-answer` and `targeted-edits`, persistent text below the editor shows the active mode name. Shift+Tab rotates to the next mode and returns to `exec` after `targeted-edits`. It replaces pi's normal Shift+Tab action.

## Install

```bash
pi install git:github.com/Distortedlogic/pi-just-answer
```

Restart pi after installation. The initial mode is `exec`.

## Remove

```bash
pi remove git:github.com/Distortedlogic/pi-just-answer
```
