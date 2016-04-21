// GLOBAL VARIABLES
var numberplayers;

// DOCUMENT READY STATEMENT
$(document).ready(function() {
	/*
	 *	New Game
	 *	Build new player input in "New Game Modal" and parse them to a newgame.json file.
	 *  ---------------------------------------------------------------------------------
	 */

	var players = NewPlayers();
	$("#numplay").change(function(){
		NewPlayers('append', numberplayers);
	});

	$('#newGame').find('form').on('submit', function(event) {
		event.preventDefault();
		var json = $(this).serializeFormJSON();
		$("#newplayers").find('.playerinput').append('<input type="hidden" id="jsondata" name="jsondata" />');
		$("#jsondata").val( JSON.stringify( json ));

		$.ajax({
			type:			'POST',
			url:			'newgame.php',
			dataType:	'json',
			data: 		$(this).serialize(),
			success:	function(result) {
				alert(result);
			}
		});

		$("#jsondata").remove();
	});

	/*
	 *	Hide matches and scroll through them
	 *  ------------------------------------
	 */

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
});

// FUNCTIONS
function NewPlayers(mode = 'new', lastnumplay = 2) {
	numberplayers = parseInt($("#numplay").val());
	var playerinput = $("#newplayers").find('.playerinput');

	if ( mode == 'new' ) {
		for( i = 1; i < numberplayers + 1; i++ ) {
			var input = BuildInput(i);

			playerinput.append(input);
		}
	} else if ( mode == 'append' ) {
		var diff = numberplayers - lastnumplay;

		if ( diff > 0 ) {
			for ( i = lastnumplay + 1; i < numberplayers + 1; i++ ) {
				var input = BuildInput(i);

				playerinput.append(input);
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

function BuildInput(n) {
	var player = "player" + n;

	var input = '<div class="form-group">';
	input += '<input type="text" class="form-control" name="' + player + '" placeholder="speler ' + n + '" id="' + player + '" required />';
	input += '</div>';

	return input;
}

(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

function HideShowMatch(match) {
	$("#matches").children().hide();
	$("#match-" + match).fadeIn('slow');
}
