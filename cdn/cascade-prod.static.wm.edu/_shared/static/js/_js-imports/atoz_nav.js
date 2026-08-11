/* =============================================================
FUNCTION atoz_nav

- On AtoZ pages, creates a <select> out of the letter menu's <ul> to be used for mobile
- TinyNav plugin is in the _Shared plugins.js file

================================================================= */
export function atoz_nav() {
	$("#atoz_ul").tinyNav({
		active: 'selected'
	});
}