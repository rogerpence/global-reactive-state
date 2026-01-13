import { browser } from '$app/environment';
import { ActionTypes, type ActionCargoMap } from '$lib/actionTypes';

/**
 * This file defines the general-purpose plumbing for a global reactive state
 * mechanism. Through generics, this file doesn't know about the cargo types;
 * that information is stored in actionTypes.ts.
 *
 * To add cargo types your application you only need to modify actionTypes.ts.
 * This file should never need changes.
 */

// --- Reactive State ---
/**
 * The internal, writable state rune for the current action.
 * It holds the active `Action` object or `undefined` if no action is active.
 * This is the source of truth for the action state.
 * @internal
 */
let _action = $state<Action | undefined>(undefined);

// --- Derived Values (for consumers) ---
/**
 * A read-only, derived signal representing the currently active action.
 * Consumers of the store should use this variable to react to new actions.
 * Its value is `undefined` when no action is active.
 *
 * @example
 * ```ts
 * <script>
 *   import { actionStore } from '$lib/actionStore.svelte.ts';
 *
 *   $effect(() => {
 *     if (actionStore.action) {
 *       console.log('New action triggered:', actionStore.action.type);
 *     }
 *   });
 * </script>
 * ```
 */
const action = $derived(_action);

/**
 * A discriminated union of all possible action objects.
 * TypeScript can narrow this type based on the 'type' property.
 */
type Action = {
	[K in keyof ActionCargoMap]: {
		type: K;
		cargo: ActionCargoMap[K];
	};
}[keyof ActionCargoMap];

/**
 * A union type representing all possible action type strings.
 */
type ActionType = (typeof ActionTypes)[keyof typeof ActionTypes];

// --- Actions ---
/**
 * Triggers a global action by setting the reactive action state.
 * This function is generic and ensures that the provided payload (cargo)
 * correctly matches the specified action type.
 *
 * It only executes in a browser environment.
 *
 * @example
 * ```ts
 * import { actionStore } from '$lib/actionStore.svelte.ts';
 * import { ActionTypes } from '$lib/actionTypes';
 *
 * actionStore.trigger(ActionTypes.CONTACT_US, {
 *   email: 'test@example.com',
 *   subject: 'Hello World'
 * }); *
 * ```
 * This function is type-safe. For the ActionTypes.CONTACT_US type, the second argument must
 * be a `ContactUsCargo` object. The ActionCargoMap interface in actionTypes.ts maps action
 * types to their corresponding shape.
 *
 *
 * @template T - The specific action type, which must be one of the keys in `ActionCargoMap`.
 * @param type - The type of the action to trigger (e.g., `ActionTypes.CONTACT_US`).
 * @param payload - The cargo object for the action. Its shape is determined by the `type` parameter.
 */
function trigger<T extends ActionType>(type: T, payload: ActionCargoMap[T]) {
	if (browser) {
		// We construct a valid Action object that matches our discriminated union.
		_action = { type, cargo: payload } as Action;
	}
}

/**
 * Resets the action state to `undefined`.
 *
 * This function is crucial for preventing stale actions from persisting across
 * page navigations. It **must** be called from the `afterNavigate` lifecycle
 * function in the root `+layout.svelte` file that consumes this store.
 * Failure to do so can result in actions from a previous page incorrectly
 * triggering effects on a new page.
 *
 * @see https://kit.svelte.dev/docs/modules#sveltejs-kit-afternavigate
 *
 * @example
 * ```svelte
 * <!-- src/routes/+layout.svelte -->
 * <script>
 *   import { afterNavigate } from '$app/navigation';
 *   import { actionStore } from '$lib/actionStore.svelte.ts';
 *
 *   afterNavigate(() => {
 *     actionStore.dispose();
 *   });
 * </script>
 * ```
 */
function dispose() {
	_action = undefined;
}

// --- Exported Store Object ---
/**
 * A global, reactive store for managing application-wide actions.
 *
 * This store provides a centralized mechanism for triggering and reacting to
 * user actions or events in a type-safe manner. It is designed to be used
 * as a singleton throughout the application.
 *
 * @property {Action | undefined} action - A read-only derived value of the currently active action.
 * @property {function} trigger - A function to dispatch a new action.
 * @property {function} dispose - A function to clear the current action, for use in navigation.
 */
export const actionStore = {
	/**
	 * The currently active action object. It is a discriminated union,
	 * so you can check its 'type' property to get strong typing for 'cargo'.
	 */
	get action() {
		return action;
	},
	trigger,
	dispose
};
