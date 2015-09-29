const Konami = require('konami-js');

module.exports = function() {
	new Konami(function() {
		alert('You can now play with 10 lives!!!');
		return document.body.innerHTML += `
			<div style="background: rgba(0,0,0,0.85);
									display: block;
									position: fixed;
									top: 0;
									left: 0;
									width: 100%;
									height: 100%;
									z-index: 99998;"></div>
			<iframe width="640"
							height="480"
							src="http://www.youtube.com/embed/BDq1EczJ5M0?autoplay=1"
							style="position: fixed;
										 z-index: 99999;
										 top: 50%;
										 margin-top: -240px;
										 left: 50%;
										 margin-left: -320px;"
							frameborder="0"
							allowfullscreen
							autoplay></iframe>`;
	});
};
