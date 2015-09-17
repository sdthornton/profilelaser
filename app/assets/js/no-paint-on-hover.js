module.exports = function() {
	let enableTimer = 0;
	window.addEventListener('scroll', function() {
		clearTimeout(enableTimer);
		removeHoverClass();
		enableTimer = setTimeout(addHoverClass, 200);
	}, false);

	function removeHoverClass() {
		document.documentElement.classList.remove('hover');
	}

	function addHoverClass() {
		document.documentElement.classList.add('hover');
	}
};
