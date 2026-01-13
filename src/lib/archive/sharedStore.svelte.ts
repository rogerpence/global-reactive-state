// src/lib/sharedStore.ts
import { browser } from '$app/environment';

// Define the structure of our store's state
type SharedStore = {
	trackedString: string;
	payload: Record<string, unknown>; // Optional payload object for additional data
};

export const INITIAL_VALUE = '';

// Create the reactive state using $state
// Initialize with a default value
export let store = $state<SharedStore>({
	trackedString: INITIAL_VALUE,
	payload: {} // Optional: You can add a payload object if needed
});

// Optional: Log when the store module is loaded
// if (browser) {
// 	console.log('Shared store module loaded (client)');
// } else {
// 	console.log('Shared store module loaded (server)');
// }

// --- Export the reactive store object ---
// Components will import this 'sharedStore' object
// and access/modify its properties directly (e.g., sharedStore.trackedString)
//export const sharedStore = store;

export function getCurrentTriggerState(): Record<string, unknown> {
	return store.payload;
}

export function triggerAction(payload: Record<string, unknown>) {
	store.trackedString = new Date().toISOString();
	if (payload) {
		store.payload = payload;
	}
}

// export function setTrackedString(newValue: string): void {
// 	console.log(`Setting trackedString from '${store.trackedString}' to '${newValue}'`);
// 	store.trackedString = newValue; // Direct assignment triggers reactivity
// }
