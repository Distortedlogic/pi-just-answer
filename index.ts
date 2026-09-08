import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { isKeyRelease, isKeyRepeat, matchesKey } from "@earendil-works/pi-tui";

const MODES = ["exec", "just-answer"] as const;
type Mode = (typeof MODES)[number];

const WIDGET_KEY = "just-answer-mode";
const JUST_ANSWER_SUFFIX = " no tool calls, just answer";

export default function (pi: ExtensionAPI) {
	let modeIndex = 0;
	let removeTerminalInputListener: (() => void) | undefined;

	const getMode = (): Mode => MODES[modeIndex];

	const showMode = (ctx: ExtensionContext): void => {
		const content = getMode() === "just-answer" ? ["just-answer"] : undefined;
		ctx.ui.setWidget(WIDGET_KEY, content, { placement: "belowEditor" });
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
		if (getMode() !== "just-answer" || event.source === "extension") {
			return { action: "continue" };
		}

		return {
			action: "transform",
			text: `${event.text}${JUST_ANSWER_SUFFIX}`,
			images: event.images,
		};
	});
}
