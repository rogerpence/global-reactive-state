/**
 * This file serves as a central registry for all action types and their
 * corresponding payload (cargo) shapes.
 */

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

// --- Action Type Definitions ---
/**
 * Defines action type constants for type safety and autocompletion.
 */
export const ActionTypes = {
	CONTACT_US: 'CONTACT_US',
	DOWNLOAD_PRODUCT: 'DOWNLOAD_PRODUCT'
} as const;

/**
 * A map connecting ActionType strings to their cargo payload shapes.
 * This is the key to our generic solution.
 */
export interface ActionCargoMap {
	[ActionTypes.CONTACT_US]: ContactUsCargo;
	[ActionTypes.DOWNLOAD_PRODUCT]: DownloadProductsCargo;
}
