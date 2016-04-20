// GLOBAL VARIABLES
var numberplayers;

$(document).ready(function() {
	var match = 1;

	HideShowMatch(match);

	$("#prev").click(function(e) {
		e.preventDefault();
		if (match == 1) {
			return;
		} else {
			match -= 1;
			HideShowMatch(match);
		}
	});

	$("#next").click(function(e) {
		e.preventDefault();
		if (match == $("#matches").children().length) {
			return;
		} else {
			match += 1;
			HideShowMatch(match);
		}
	});

	var players = NewPlayers();
	$("#numplay").change(function(){
		NewPlayers('append', numberplayers);
	});
});

function HideShowMatch(match) {
	$("#matches").children().hide();
	$("#match-" + match).fadeIn('slow');
}

function NewPlayers(mode = 'new', lastnumplay = 2) {
	numberplayers = parseInt($("#numplay").val());
	var playerinput = $("#newplayers").find('.playerinput');

	if ( mode == 'new' ) {
		for( i = 1; i < numberplayers + 1; i++ ) {
			var allinputs = '<div class="form-group">';
			allinputs += '<input type="text" class="form-control" name="player' + i + '" placeholder="speler ' + i + '" id="player' + i + '" />';
			allinputs += '</div>';

			playerinput.append(allinputs);
		}
	} else if ( mode == 'append' ) {
		var diff = numberplayers - lastnumplay;

		if ( diff > 0 ) {
			for ( i = lastnumplay + 1; i < numberplayers + 1; i++ ) {
				var allinputs = '<div class="form-group">';
				allinputs += '<input type="text" class="form-control" name="player' + i + '" placeholder="speler ' + i + '" id="player' + i + '"/>';
				allinputs += '</div>';

				playerinput.append(allinputs);
				playerinput.find("#player" + i).hide().fadeIn('slow');
			}
		} else if ( diff < 0 ) {
			for ( i = lastnumplay; i > numberplayers; i-- ) {
				$("#player" + i).parent().fadeOut(300, function() {
					$(this).remove();
				});
			}
		}
	}
}
