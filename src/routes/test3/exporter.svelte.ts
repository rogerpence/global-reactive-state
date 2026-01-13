let x = $state(0);

let gog = $derived.by(() => {
	return x * 2;
});

function changex() {
	x++;
}

export const actioner = {
	get gog() {
		return gog;
	},
	changex
};
