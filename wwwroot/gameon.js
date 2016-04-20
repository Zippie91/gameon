$(document).ready(function() {
	var match = 1;

	hideShowMatch(match);

	$("#prev").click(function(e) {
		e.preventDefault();
		if (match == 1) {
			return;
		} else {
			match -= 1;
			hideShowMatch(match);
		}
	});

	$("#next").click(function(e) {
		e.preventDefault();
		if (match == $("#matches").children().length) {
			return;
		} else {
			match += 1;
			hideShowMatch(match);
		}
	});
});

function hideShowMatch(match) {
	$("#matches").children().hide();
	$("#match-" + match).fadeIn('slow');
}
