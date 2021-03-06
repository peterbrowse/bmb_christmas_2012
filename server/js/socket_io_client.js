var presentsFetched = false;
var scoreFetched = false;
var top_3_Fetched = false;
var currentDay;

$(document).ready(function() {
	$('.card-two').hide();
	$('.card-three').hide();

	if (!FlashDetect.installed) {
		no_flash();
		$('.view-container').css('width','100%');		
	}
	else {
				loading_screen('connecting');
				
				
				if(typeof io == 'undefined') {
					$('.server_contact-container').show();
					window.setTimeout('location.reload()', 10000);
				}
				
				else {
					$(".music-file").jPlayer( {
    					ready: function () {
      						$(this).jPlayer("setMedia", {
       		 					mp3: "/audio/Sleigh-Ride.mp3",
       		 					wav: "/audio/Sleigh-Ride.wav"
      						}).jPlayer("play");
    					},
   						supplied: "mp3, wav",
    					solution: "html, flash",
    					loop: true,
    					wmode:"window",
    					volume: 0.2
  					});
  					$('.fire-file').jPlayer( {
    					ready: function () {
      						$(this).jPlayer("setMedia", {
       		 					mp3: "/audio/Fire.mp3",
       		 					wav: "/audio/Fire.wav"
      						});
    					},
   						supplied: "mp3, wav",
    					solution: "html, flash",
    					wmode:"window"
  					});
  					$('.score-file').jPlayer( {
    					ready: function () {
      						$(this).jPlayer("setMedia", {
       		 					mp3: "/audio/Score.mp3",
       		 					wav: "/audio/Score.wav"
      						});
    					},
   						supplied: "mp3, wav",
    					solution: "html, flash",
    					wmode:"window"
  					});
  					$('.bell-file').jPlayer( {
  						ready: function () {
  							$(this).jPlayer("setMedia", {
  								mp3: "/audio/Hohoho.mp3",
  								wav: "/audio/Hohoho.wav"
  							});
  						},
  						supplied: "mp3, wav",
  						solution: "html, flash",
  						wmode: "window"
  					});
  					audio_player();
				}
				
				var socket = io.connect('http://5.79.16.234:8080', {
  						'transports':[
   							'websocket'
  							, 'flashsocket'],
  						'max reconnection attempts':3000
				});
				
				socket.on('connect',function(){
					$('.error_message').remove();
					socket.emit('doorman', function(callback, response, stateSelector, top_3_presents, top_3_scores) {
						if(callback) {
							loading_screen('loading');
							var sproutDropImage = setInterval(function(){dropSprout('loading')},400);
							
							$.imgpreload([
								 '/images/general/countdown/0.png'
								,'/images/general/countdown/1.png'
								,'/images/general/countdown/2.png'
								,'/images/general/countdown/3.png'
								,'/images/general/countdown/4.png'
								,'/images/general/countdown/5.png'
								,'/images/general/countdown/6.png'
								,'/images/general/countdown/7.png'
								,'/images/general/countdown/8.png'
								,'/images/general/countdown/9.png'
								,'/images/interface/arrow_left.png'
								,'/images/interface/arrow_left.png'
								,'/images/interface/audio_off.png'
								,'/images/interface/audio_on.png'
								,'/images/interface/banner_fold.png'
								,'/images/interface/banner_front.png'
								,'/images/interface/bg_blue.png'
								,'/images/interface/bg_green.png'
								,'/images/interface/bg_orange.png'
								,'/images/interface/bg_purple.png'
								,'/images/interface/bg_red.png'
								,'/images/interface/blue_button_sprite.png'
								,'/images/interface/closed_banner.png'
								,'/images/interface/connecting_screen.png'
								,'/images/interface/corner_left_blue.png'
								,'/images/interface/corner_left_bottom_white.png'
								,'/images/interface/corner_left_green.png'
								,'/images/interface/corner_left_red.png'
								,'/images/interface/corner_left_top_white.png'
								,'/images/interface/corner_left_white.png'
								,'/images/interface/corner_right_blue.png'
								,'/images/interface/corner_right_bottom_white.png'
								,'/images/interface/corner_right_red.png'
								,'/images/interface/corner_right_top_white.png'
								,'/images/interface/corner_right_white.png'
								,'/images/interface/counter_letsbegin.png'
								,'/images/interface/counter1.png'
								,'/images/interface/counter2.png'
								,'/images/interface/counter3.png'
								,'/images/interface/counter4.png'
								,'/images/interface/counter5.png'
								,'/images/interface/counter6.png'
								,'/images/interface/cross_hairs.png'
								,'/images/interface/crosshair_button_graphic.png'
								,'/images/interface/enthusiastic_penguin.png'
								,'/images/interface/gameover_santa.png'
								,'/images/interface/icy_hexagon.png'
								,'/images/interface/loading_kid.png'
								,'/images/interface/loading_screen.png'
								,'/images/interface/off_white_hexagon.png'
								,'/images/interface/plus_symbol.png'
								,'/images/interface/polar_flash.png'
								,'/images/interface/prize_winner_hexagon.png'
								,'/images/interface/frosty1.png'
								,'/images/interface/frosty2.png'
								,'/images/interface/raygun_big.png'
								,'/images/interface/raygun_small_grey.png'
								,'/images/interface/red_button_sprite.png'
								,'/images/interface/red_hexagon.png'
								,'/images/interface/rudolf_phone.png'
								,'/images/interface/sprout_shooter_logo.png'
								,'/images/interface/sprout.png'
								,'/images/interface/alphapixel.png'
								,'/images/interface/email1.png'
								,'/images/interface/email2.png'
								,'/images/interface/boil.png'
							],function()
							{
								var loadingDelayImage = setInterval(function(){
      								window.clearInterval(sproutDropImage);
      								window.clearInterval(loadingDelayImage);
									login_screen('intro','clear');
									var formIntroductionDelay = setInterval(function(){
										window.clearInterval(formIntroductionDelay);
										document.body.tabIndex = 0;
										document.body.focus();
										login_screen('form','clear');
   										$('.scene-container').attr("tabindex",1).focus();
										$('.user-email').val();
   										$('.user-email').focus();
            							$('.user-form-submit-button').click(function() {
            								$('.user-form-submit-button').submit();
            							});
            							$(".user-form").submit(function(ev) {
            									var username = $(".user-email").val();
                   								if (username) {
													socket.emit("join", username, function(successful, users) {
                            							if (successful) {
                                							pre_game_help_screen();
                            								var helpfulDelay = setInterval(function(){
                            									window.clearInterval(helpfulDelay);
                            									$('.pre-game-help').fadeOut(400,function(){
                            										lobby_screen();
                            									});
                            								} , 3500);
                            							}
                            						
                            							else {
                            								$('.user-email-wrong').val(username);
   															$('.user-email-wrong').focus();	
                            							}
                       								});
                    							}
                    							
                    							else {
                    								$('.user-email').focus();
                    							}
            							});
									}, 1000);
								},2000);
							});
						}
						
						else {
							if(stateSelector == 'pre-open') {
									doorman_screen('pre-open',response,'green');
							}
							
							else if(stateSelector == 'closed') {
								doorman_screen('closed',response,'green');
							}
							
							else if(stateSelector == 'before-opening-hours') {
								doorman_screen('before-opening-hours',response,'green');
								var doormanCheck = setInterval(function(){
                            		socket.emit('doorman', function(callback){
                            			if(callback){
                            				window.clearInterval(doormanCheck);
                            				location.reload();
                            			}
                            		});					
                            	} , 30000);
							}
							
							else if(stateSelector == 'after-opening-hours') {
								doorman_screen('after-opening-hours',response,'red', top_3_presents, top_3_scores, currentDay);
							}
						}
					});
					
					socket.emit('fetch_presents', function(callback, presents) { 
						if(callback) {
							for (var i=0;i<9;i++){
								$target = $('.prize-grid li').eq(i); 
								$target.text(presents[i]['present_name']).removeClass('unset');
							
								if(presents[i]['prize_level'] == '1') {
									$target.addClass('prize_one');
								}
									
								else if(presents[i]['prize_level'] == '2') {
									$target.addClass('prize_two');
								}
									
								else if(presents[i]['prize_level'] == '3') {
									$target.addClass('prize_three');
								}
								
								if(presents[i]['won']) {
									if(presents[i]['prize_level'] == '1') {
										$target.addClass('won_one');
									}
									
									else if(presents[i]['prize_level'] == '2') {
										$target.addClass('won_two');
									}
									
									else if(presents[i]['prize_level'] == '3') {
										$target.addClass('won_three');
									}
								}
							}
						}
					});
					
					socket.emit('fetch_scores', function(callback, score_day_one, score_day_two, score_day_three) {
						if(callback) {
							for(var i=0;i<10;i++) {
								var $target1 = $('.card-one .card-inner div.score-item').eq(i);
								var $target2 = $('.card-two .card-inner div.score-item').eq(i);
								var $target3 = $('.card-three .card-inner div.score-item').eq(i);
							
								if(score_day_one[i]) {
									var $detailString = score_day_one[i]['first_name'] + "/" + score_day_one[i]['client'];
									var $scoreString = score_day_one[i]['score_day_1'];
									if($scoreString != '0') {
										$scoreString = $scoreString.zeroPad(6);
										$target1.find('li.user-details').text($detailString);
										$target1.find('li.user-score').text($scoreString);
									}
								}
								
								if(score_day_two[i]) {
									var $detailString = score_day_two[i]['first_name'] + "/" + score_day_two[i]['client'];
									var $scoreString = score_day_two[i]['score_day_2'];
									if($scoreString != '0') {
										$scoreString = $scoreString.zeroPad(6);
										$target2.find('li.user-details').text($detailString);
										$target2.find('li.user-score').text($scoreString);
									}
								}
								
								if(score_day_three[i]) {
									var $detailString = score_day_three[i]['first_name'] + "/" + score_day_three[i]['client'];
									var $scoreString = score_day_three[i]['score_day_3'];
									if($scoreString != '0') {
										$scoreString = $scoreString.zeroPad(6);
										$target3.find('li.user-details').text($detailString);
										$target3.find('li.user-score').text($scoreString);
									}
								}
							}
						}
					});
				});
				
				socket.on('updatePositions', function() {
					socket.emit('queue_controller', 'updateQueue', function(playing, queuePosition) {
						if(!playing) {
							var $html = "<div class='barContentTextHolder'><p>You are</p></div>";
    						var output = [],
    						sNumber = queuePosition.toString();

							for (var i = 0, len = sNumber.length; i < len; i += 1) {
    							$html = $html + '<div class="countersHolder"><img src="/images/general/countdown/' + sNumber.charAt(i) + '.png" /></div>';
							}
							
							$html += "<div class='barContentTextHolder'><p>in the queue</p></div>";
							
							$('.global-blue-top-bar .barContent').html($html);
							if(!$('.global-blue-top-bar').hasClass('buttonOff')){
								$('.global-blue-top-bar').addClass('buttonOff');
							}
							if(sNumber == '01') {
								$('.fullScreenSnowManNext').remove();
								$('.fullScreenSnowManWaiting').remove();
								$('.lobby').append('<div class="fullScreenSnowManNext"></div>');
								$('.fullScreenSnowManNext').delay(3000).fadeOut(800);
							}
						}
					});
				});
				
				socket.on('whose_playing', function(nameString) {
					$('.lobby').append('<div class="whose-playing"><img src="/images/interface/corner_left_bottom_white.png" /><div class="whose-playing-text"><p class="nowPlaying">Now playing:</p><p class="userString">'+nameString+'</p></div><img src="/images/interface/corner_right_bottom_white.png" /></div>');
				});
				
				socket.on('cheat', function(){
				});
				
				socket.on('enterGame', function(topScore){
					$('html,body').animate({scrollTop: 83}, {duration: 800});
					game_screen(topScore);
					$(".game").attr("tabindex",1).focus();
						
					$("p.countdown").simpleCountDownStart({
						interval:1000,
						startFrom:120,
						callBack:function(){
							game_over_screen();
							socket.emit('gameOver',function(successful, ballsFired, finalScore, userHighestScore, currentPosition, Accuracy) {
								socket.emit("instructions","reset");
								socket.emit('queue_controller', 'removeFromQueue', function(removed) {});
								if(successful){
									var gameOverDelay = setInterval(function(){
										window.clearInterval(gameOverDelay);
										game_over_stats_screen(finalScore, userHighestScore, currentPosition, ballsFired, Accuracy);
									},4000);
								}
							});	
						}
					});
				});
				
				socket.on('userReady', function(question, answer) {
					if(question === 'lobby->game') {
						userReady_screen();
						$('.countdown-message').userReadyCountDownStart({
							interval:1000,
							startFrom:30,
							callBack:function(){
								$('.bell-file').jPlayer('stop');
								answer(true);
							}
						});
						
						$('.lets-begin').click(function(){
							$('.countdown-message').userReadyCountDownStop();
							$('.bell-file').jPlayer('stop');
							answer(true);
						});			
					}
				});
				
				socket.on('receive_scores', function(score_day_one, score_day_two, score_day_three){
					for(var i=0;i<10;i++) {
						var $target1 = $('.card-one .card-inner div.score-item').eq(i);
						var $target2 = $('.card-two .card-inner div.score-item').eq(i);
						var $target3 = $('.card-three .card-inner div.score-item').eq(i);
						
						if(score_day_one[i]) {
							var $detailString = score_day_one[i]['first_name'] + "/" + score_day_one[i]['client'];
							var $scoreString = score_day_one[i]['score_day_1'];
							if($scoreString != '0') {
								$scoreString = $scoreString.zeroPad(6);
								$target1.find('li.user-details').text($detailString);
								$target1.find('li.user-score').text($scoreString);
							}
						}
								
						if(score_day_two[i]) {
							var $detailString = score_day_two[i]['first_name'] + "/" + score_day_two[i]['client'];
							var $scoreString = score_day_two[i]['score_day_2'];
							if($scoreString != '0') {
								$scoreString = $scoreString.zeroPad(6);
								$target2.find('li.user-details').text($detailString);
								$target2.find('li.user-score').text($scoreString);
							}
						}
								
						if(score_day_three[i]) {
							var $detailString = score_day_three[i]['first_name'] + "/" + score_day_three[i]['client'];
							var $scoreString = score_day_three[i]['score_day_3'];
							if($scoreString != '0') {
								$scoreString = $scoreString.zeroPad(6);
								$target3.find('li.user-details').text($detailString);
								$target3.find('li.user-score').text($scoreString);
							}
						}
					}
				});
				
				socket.on('current_day', function(day) {
					currentDay = day;
				});
				
				socket.on('error_messenger', function(error_code){
					switch (error_code)
					{
						case 0:
  							error_message="This email address is already signed in.";
  							login_screen('wrong','clear',error_message);
   							$('.scene-container').attr("tabindex",1).focus();
  							$('.user-email-wrong').val(username);
   							$('.user-email-wrong').focus();
  							break;
						case 1:
 							error_message="This looks suspiciously sprouty, are you sure?";
 							login_screen('wrong','clear',error_message);
 							$('.user-email-wrong').val();
   							$('.user-email-wrong').focus();
  							break;
						case 2:
 							error_screen('green', 'Tsk!', "You've already won a prize.", "Sorry, no second helpings. You've had enough vitamins B and C.", 'Just watch');
  							break;
					}
				});
				
				socket.on('play_sound', function(sound){
					switch (sound) {
						case 0:
							$('.bell-file').jPlayer("play");
							break;
						case 1:
       						$('.fire-file').jPlayer("play");
       						break;
       					case 2:
       						$('.score-file').jPlayer("play");
       						break;
					}
				});
				
				socket.on('update_score', function(score){
					$('p.amount-user').text(score.zeroPad(6));
				});
				
				socket.on('disconnect',function() {
					disconnect_screen();
					window.setTimeout('location.reload()', 10000);
				});
				
				//ADD TO QUEUE
				$('body').on('click','.global-blue-top-bar',function(){
					socket.emit('queue_controller', 'addToQueue', function(playing, queuePosition) {
						if(!playing){
							$('body').off('click','.global-blue-top-bar');
							var $html = "<div class='barContentTextHolder'><p>You are</p></div>";
    						var output = [],
    						sNumber = queuePosition.toString();

							for (var i = 0, len = sNumber.length; i < len; i += 1) {
    							$html = $html + '<div class="countersHolder"><img src="/images/general/countdown/' + sNumber.charAt(i) + '.png" /></div>';
							}
							
							$html += "<div class='barContentTextHolder'><p>in the queue</p></div>";
							
							$('.global-blue-top-bar .barContent').html($html);
							$('.global-blue-top-bar').addClass('buttonOff');
							
							socket.emit('somebodyPlaying', function(callback, whosePlaying) {
                            	if(callback){
                            		$('.lobby').append('<div class="whose-playing"><img src="/images/interface/corner_left_bottom_white.png" /><div class="whose-playing-text"><p class="nowPlaying">Now playing:</p><p class="userString">'+whosePlaying+'</p></div><img src="/images/interface/corner_right_bottom_white.png" /></div>');
                            	}
                            });
							if(queuePosition == 02) {
								$('.lobby').append('<div class="fullScreenSnowManNext"></div>');
								$('.fullScreenSnowManNext').delay(3000).fadeOut(800);
							}
							
							else {
								$('.lobby').append('<div class="fullScreenSnowManWaiting"></div>');
								$('.fullScreenSnowManWaiting').delay(3000).fadeOut(800);
							}
						}
					});
				});
				
				//PLAY AGAIN TO QUEUE
				$('body').on('click','.play-again', function() {
					socket.emit('doorman', function(stillOpen){
						if(stillOpen) {	
						socket.emit('changeRoom', 'lobby', function(callback){
						if(callback) {
							lobby_screen();
							socket.emit('queue_controller', 'addToQueue', function(playing, queuePosition) {
								if(!playing){
									$('body').off('click','.global-blue-top-bar');
									var $html = "<div class='barContentTextHolder'><p>You are</p></div>";
    								var output = [],
    								sNumber = queuePosition.toString();

									for (var i = 0, len = sNumber.length; i < len; i += 1) {
    									$html = $html + '<div class="countersHolder"><img src="/images/general/countdown/' + sNumber.charAt(i) + '.png" /></div>';
									}
							
									$html += "<div class='barContentTextHolder'><p>in the queue</p></div>";
							
									$('.global-blue-top-bar .barContent').html($html);
									$('.global-blue-top-bar').addClass('buttonOff');
									
									socket.emit('somebodyPlaying', function(callback, whosePlaying) {
                            				if(callback){
                            					$('.lobby').append('<div class="whose-playing"><img src="/images/interface/corner_left_bottom_white.png" /><div class="whose-playing-text"><p class="nowPlaying">Now playing:</p><p class="userString">'+whosePlaying+'</p></div><img src="/images/interface/corner_right_bottom_white.png" /></div>');
                            				}
                            		});
									if(queuePosition == 02) {
										$('.lobby').append('<div class="fullScreenSnowManNext"></div>');
										$('.fullScreenSnowManNext').delay(3000).fadeOut(800).remove();
									}
							
									else {
										$('.lobby').append('<div class="fullScreenSnowManWaiting"></div>');
										$('.fullScreenSnowManWaiting').delay(3000).fadeOut(800).remove();
									}
								}
							});
						}
					});
					}
					else {
						location.reload();
					}
					});
				});
				
				//LEAVE QUEUE-white
				$('body').on('click','.global-logout-white-button', function(removed) {
					socket.emit('queue_controller', 'removeFromQueue', function(removed) {
						if(removed) {
						}
					});
					window.setTimeout('location.reload()');
				});
				
				//LEAVE QUEUE-red
				$('body').on('click','.global-logout-button',function(removed) {
					socket.emit('queue_controller', 'removeFromQueue', function(removed) {
						if(removed) {
						}
					});
					window.setTimeout('location.reload()');
				});
                
                $('body').on('click','.user-form-submit-button-wrong', function() {
            		$('.user-form-submit-button-wrong').submit();
            	});
            	
            	$('body').on('click','.error-button-holder', function(){
            		$('.error_message').fadeOut(400);
            	});
            	
            	$("body").on('submit', function(ev) {
                	ev.preventDefault();
                    var userHolder = $('.user-email-wrong');
                    var username = userHolder.val();
                   	if (username) {
						socket.emit("join", username, function(successful, users) {
                        	if (successful) {
                            	pre_game_help_screen();
                            		var helpfulDelay = setInterval(function(){
                            		window.clearInterval(helpfulDelay);
                            			lobby_screen();
                            			socket.emit('somebodyPlaying', function(callback, whosePlaying) {
                            				if(callback){
                            					$('.lobby').append('<div class="whose-playing"><img src="/images/interface/corner_left_bottom_white.png" /><div class="whose-playing-text"><p class="nowPlaying">Now playing:</p><p class="userString">'+whosePlaying+'</p></div><img src="/images/interface/corner_right_bottom_white.png" /></div>');
                            				}
                            			});
                          			} ,3500);
                                	$('body').focus();
                               		window.focus();
                            }
                            										
                            else {
                            	userHolder.val();
                            	userHolder.focus();
                            }
                       	});
                    }
                    
                    else {
                    	userHolder.focus();
                    }
                });
                
                $('.html, body').keydown(function(e){
                	if (e.keyCode == 32) {
						e.preventDefault();
					}
					
					else if (e.keyCode == 27){
            			return false;
       				}
       				
       				if( !$('.game').is(':visible') ) {
       				}
					else {
						if (e.keyCode == 37) { 
							e.preventDefault();
       						return false;
    					}
    	
    					else if (e.keyCode == 39) {
    						e.preventDefault();
       						return false;
    					}
    					
    					else if (e.keyCode == 32) {
    						e.preventDefault();
    						return false;
    					}
    					
    					else if(e.keyCode == 38) {
    						e.preventDefault();
    						return false; 
    					}
    					
    					else if(e.keyCode == 40) {
    						e.preventDefault();
    						return false; 
    					}
					}
                });
	
				$('html, body').keyup(function(e){
					if (e.keyCode == 32) {
						e.preventDefault();
					}
					
					else if (e.keyCode == 27){
            			return false;
       				}
       				
       				if( !$('.game').is(':visible') ) {
       				}
					else {
						if (e.keyCode == 37) { 
							e.preventDefault();
       						socket.emit("instructions","left");
       						return false;
    					}
    	
    					else if (e.keyCode == 39) {
    						e.preventDefault(); 
       						socket.emit("instructions","right");
       						return false;
    					}
    					
    					else if (e.keyCode == 32) {
    						e.preventDefault();
    						socket.emit("instructions","fire");
    						return false;
    					}
    					
    					else if(e.keyCode == 38) {
    						e.preventDefault();
    						return false; 
    					}
    					
    					else if(e.keyCode == 40) {
    						e.preventDefault();
    						return false; 
    					}
					}
					
				});
	}
});
