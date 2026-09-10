import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { isKeyRelease, isKeyRepeat, matchesKey } from "@earendil-works/pi-tui";

const MODES = ["exec", "just-answer", "targeted-edits", "create-tasklist"] as const;
type Mode = (typeof MODES)[number];

const WIDGET_KEY = "just-answer-mode";
const MODE_SUFFIXES: Record<Mode, string> = {
	exec: "",
	"just-answer": " --- no tool calls, just answer",
	"targeted-edits":
		" --- do the targeted edit calls to execute this task. u may use the write tool if u need a new file, or the read tool if an edit fails on needed a new read, or bash to commit at the end. then halt.",
	"create-tasklist":
		" --- now group this into work units and give me a technical impl plan for this in the format of a properly ordered task list, n dump the task list into a {generate_full_concept_coverage_minimal_length_prefix}_TASKLIST.md in cwd",
};

export default function (pi: ExtensionAPI) {
	let modeIndex = 0;
	let removeTerminalInputListener: (() => void) | undefined;

	const getMode = (): Mode => MODES[modeIndex];

	const showMode = (ctx: ExtensionContext): void => {
		const mode = getMode();
		ctx.ui.setWidget(WIDGET_KEY, mode === "exec" ? undefined : [mode], { placement: "belowEditor" });
	};

	pi.on("session_start", (_event, ctx) => {
		removeTerminalInputListener?.();
		showMode(ctx);

		if (ctx.mode !== "tui") return;

		removeTerminalInputListener = ctx.ui.onTerminalInput((data) => {
			if (!matchesKey(data, "shift+tab")) return undefined;
			if (isKeyRepeat(data) || isKeyRelease(data)) return { consume: true };

			modeIndex = (modeIndex + 1) % MODES.length;
			showMode(ctx);
			return { consume: true };
		});
	});

	pi.on("session_shutdown", (_event, ctx) => {
		removeTerminalInputListener?.();
		removeTerminalInputListener = undefined;
		ctx.ui.setWidget(WIDGET_KEY, undefined);
	});

	pi.on("input", (event) => {
		const suffix = MODE_SUFFIXES[getMode()];
		if (!suffix || event.source === "extension" || event.text.endsWith(suffix)) {
			return { action: "continue" };
		}

		return {
			action: "transform",
			text: `${event.text}${suffix}`,
			images: event.images,
		};
	});
}
