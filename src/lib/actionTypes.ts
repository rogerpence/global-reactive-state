/**
 * This file serves as a central registry for all action types and their
 * corresponding payload (cargo) shapes.
 */

import type Toast from './components/Toast.svelte';

// --- Cargo Payloads ---

/**
 * This file defines the cargo types for an application. To add a cargo type:
 * - Add the type
 * - Add its type constant to the ActionTypes object
 * - Add it to the ActionCargoMap.
 *
 *  ContactUsCargo and DownloadProductsCargo are provided as examples.
 */

/**
 * Defines the shape of the payload for the 'CONTACT_US' action.
 */
export type ContactUsCargo = {
	email: string;
	subject: string;
};

/**
 * Defines the shape of the payload for the 'DOWNLOAD_PRODUCT' action.
 */
export type DownloadProductsCargo = {
	productId: string;
	email: string;
};

// export const ToastPersona = {
// 	Download: "DOWNLOAD",
// 	ContactUs: "CONTACT_US"
// }

export type ToastPersona = 'DOWNLOAD' | 'CONTACT_US';

/**
 * Defines the shape of the payload for the 'EMAIL SENT toast.
 */
export type EmailToastCargo = {
	title: string;
	email: string;
	message: string;
	persona: ToastPersona;
};

// --- Action Type Definitions ---
/**
 * Defines action type constants for type safety and autocompletion.
 */
export const ActionTypes = {
	CONTACT_US: 'CONTACT_US',
	DOWNLOAD_PRODUCT: 'DOWNLOAD_PRODUCT',
	TOAST_EMAIL: 'TOAST_EMAIL'
} as const;

/**
 * A map connecting ActionType strings to their cargo payload shapes.
 * This is the key to our generic solution.
 */
export interface ActionCargoMap {
	[ActionTypes.CONTACT_US]: ContactUsCargo;
	[ActionTypes.DOWNLOAD_PRODUCT]: DownloadProductsCargo;
	[ActionTypes.TOAST_EMAIL]: EmailToastCargo;
}
