jQuery.fn.removeAttributes = function() {
  return this.each(function() {
    var attributes = $.map(this.attributes, function(item) {
      return item.name;
    });
    var img = $(this);
    $.each(attributes, function(i, item) {
    img.removeAttr(item);
    });
  });
}

var mql;

$(window).load(function(){
	$("#header_goes_here").load("header.html");
	mql = window.matchMedia("(max-width: 476px)");
})

// On window resize
var onResize = function() {
	
	// If we arn't in mobile view
	if($('.media-detector').css('display') != 'none'){
		$return_button = $('#return-button');
		$card_active = $('.card-active');
		$return_button.css({top: $('#big-picture') - $return_button.height()/2, left: $card_active.offset().left - $return_button.width()/2});
	}
}

// Enables resizing of the window
function enableResize(){
	$(window).resize(onResize);
}

// disables resizing of the window
function disableResize(){
	$(window).off('resize');
}

/* Mouse enters a card */
var mouseenter = function(){
	TweenLite.to($(this), 0.1, {
		className:'+=box-shadow-2',
		left: -1+'px',
		top: -1+'px'
	});
}

/* Mouse leaves a card */
var mouseleave = function(){

	TweenLite.to($(this), 0.1, {
		className:'-=box-shadow-2',
		left: 0+'px',
		top: 0+'px'
	});
}

$(document).ready(function () {
	
	var cssStyle = CSSExtender();
	var style = cssStyle.extend({
		styles: ".click"
	});
	var style2 = cssStyle.extend({
		styles: ".animation_border"
	});
	
	// Create the return button to append on card open
	$return_button = $('<div id="return-button"class="icon-button"><core-icon icon="close"></core-icon></div>');
	
	
	// Create the wrapper	
	$wrapper = $("<div class='wrapper'></div>");
	$("body").append($wrapper);
	$card_animation = $("<div class='card_animation'></div>");
	$wrapper.append($card_animation);
	
	$main = $("main");
		
	$big = $("#big-picture");
	$big_text = $("#big-border").find("h3");
	$small_text = $("#big-border").find("h4");
	
	// Define a method for clicking on a card
	var click = function(){
		$card = $(this);
		$card.css('cursor', 'auto');
		$('.card').unbind('click mouseenter mouseleave');
		$card.attr('id','nomove');
		$('#header_goes_here').css('display', 'none');
		
		$p_white = $card.find(".p_white");
		
		$card_text =	$p_white.text();
		$card_bottom =	$card.find(".card_bottom");
		$card_top =		$card.find(".card_top");
		$card_midle =	$card.find(".load_container");
		$card_color =	$card_bottom.css('background-color');
		$card_img =		$card_top.find("img");
		$card_url =		$card.attr("name");
		
		$p_hidden = $card.find(".p_hidden");
		$hidden_text = $p_hidden.text()

		$other_cards = $('.card:not(#nomove)');
		$card.removeAttr('id');

		// Declare some variables
		$big_offset = $big.offset();
		$big_offset_top = $big_offset.top;
		$big_offset_left = $big_offset.left;
		$big_position = $big.position();
		$big_position_top = $big_position.top;
		$big_position_left = $big_position.left;
		$big_width = $big.width();
		$big_height = $big.height();
				
		$card_offset = $card.offset();
		$card_offset_top = $card_offset.top;
		$card_offset_left = $card_offset.left;
		$card_position = $card.position();
		$card_position_top = $card_position.top;
		$card_position_left = $card_position.left;
		$card_width = $card.width();
		$card_height = $card.height();
		
		$wrapper.css({
			'width': $big_width,
			'height': $big_height,
			'z-index': 5,
			'top': (15 + $card_position_top - ($big_height-$card_height)/2.0)
		});
		
		// Declare Wrapper variables
		$wrapper_offset = $wrapper.offset();
		$wrapper_offset_top = $wrapper_offset.top;
		$wrapper_offset_left = $wrapper_offset.left;
		$wrapper_position = $wrapper.position();
		$wrapper_position_top = $wrapper_position.top;
		$wrapper_position_left = $wrapper_position.left;
		$wrapper_width = $wrapper.width();
		$wrapper_height = $wrapper.height();
		
		$card_animation.css({
			'background-color': $card_color,
			'width': $card_width,
			'height': $card_height,
			'top': ($wrapper_height - $card_height)/2.0,
			'left': $card_offset_left,
		});
		
		// Declare Card Animation variables
		$card_animation_offset =		$card_animation.offset();
		$card_animation_offset_top =	$card_animation_offset.top;
		$card_animation_offset_left =	$card_animation_offset.left;
		$card_animation_position =		$card_animation.position();
		$card_animation_position_top =	$card_animation_position.top;
		$card_animation_position_left =	$card_animation_position.left;
		$card_animation_width =			$card_animation.width();
		$card_animation_height =		$card_animation.height();

		var oldPage = $card_top.children();
		var t1 = new TimelineLite({
			paused:true,
			onComplete: function(){
				
				// Load the content of the card
				$card_midle.load($card_url, function(){
					$('.has-border').css({
						"border-color": $card_color,
						"background": $card_color.replace(')', ', 0.4)').replace('rgb', 'rgba')
						});
					$('.material-icons').css("color", $card_color);
					$('.container').find('h5').css("color", $card_color);					
				});
			
				
				TweenLite.to($card_midle, 1, { opacity: 1 });
				$('body').append($return_button);
								
				// Enables resizeing
				enableResize();
								

				var flag = false;
				
				// The scroll function
				function onScroll() {
					if(!flag && $('.container').position().top < 128 ){
						flag = true;
						TweenLite.to($card_bottom, 0.2, {className:'+=box-shadow-2'})
					}else if($('.container').position().top == 128){
						flag = false;
						TweenLite.to($card_bottom, 0.2, {className:'-=box-shadow-2'})
					}

				}
				
				// If we are in desktop mode
				if($('.media-detector').css('display') != 'none'){
					$return_button.css({top: $big_height - $return_button.height()/2, left: $card.offset().left - $return_button.width()/2});
					$return_button.addClass("return-button-shadow");
				}
				
				// If we are in mobile form
				else{
					$return_button.css({position: 'fixed', top: 0, left: 0});
					$card_midle.css({height: $(window).innerHeight() - $card_bottom.height() + 'px'});					
					$card_midle.on('scroll', onScroll);
				}
				
				// If return button is clicked
				$return_button.click(function() {
					
					// Remove the scroll listener
					$(window).off('scroll', onScroll);
					$card_midle.css({ height: 100 + 'px' });
					TweenLite.to($card_midle, 1, { opacity: 0 });
					
					// Disables resizing
					disableResize();
					
					$card_midle.empty();
					$return_button.remove();
					$card.css('cursor', 'pointer');

					t1.reverse();
				});
			}, onReverseComplete: function(){
				$(".card").hover(mouseenter, mouseleave);
				$(".card").click(click);	
				$wrapper.width(0);
				$card_animation.width(0);
				$card.removeAttributes();
				$card.attr('class', 'card');
				$card.attr('name', $card_url);
				$card.attr('z', '3');
				$card.attr('animated', 'true');
				
			}
		});

		if($('.media-detector').css('display') == 'none'){

			t1
			.set($wrapper, {display: 'none'})
			//.set($card, {'background-color': $card_color})
			.to($other_cards, 0.2,{opacity: 0})
			.to($('.vertical_center_div'), 0.1, { opacity: 0 })
			.to($card_bottom, 0.5 ,{
				borderRadius: 100+'%',
				height: $card_bottom.width(),
				bottom: -($card.width()/2)+$card_bottom.height(),
				scale: Math.sqrt( Math.pow( $card_top.width() , 2) + Math.pow( $card_top.height() ,2) )/ $card_top.height()
				})
			.set($card_bottom, {
				position: 'relative',
				bottom: 0,
				borderRadius: '0%',
				height: $card.height(),
				scale: 1
			})
			.set($card_top, {
				height: 0+'px'
			})
			.set($card, {
				position: 'fixed',
				margin: 0,
				left: $card.offset().left,
				top: $card.offset().top - $(window).scrollTop()
			})
			.to($card, 0.1, {
				margin: 0+'px',
				width: $(window).innerWidth(),
				left: 0
			})
			.to($card, 0.3, {
				top: 0,
				height: $(window).innerHeight()
			})
			.to($card_bottom, 0.4, {
				height: 128+'px'
			}, '-=0.3')
			.set(window, {scrollTo:{y:0}})
			.set($other_cards, {display: 'none'})
			.set($('.vertical_center_div'), {paddingLeft: 75+'px'})
			.to($('.vertical_center_div'), 0.1, {opacity: 1})/**/
			
		}else{
			/* Declare some variables before animation */
			$x = ($wrapper_width - $card_width)/2.0 - $card_offset_left;
	
			$y = (( $big_position_top - $wrapper_position_top ));//-($wrapper_offset_top - $(document).scrollTop());//
			$s = Math.sqrt( Math.pow($x,2) + Math.pow($y,2) );
			$v = 1000; //Global speed
			$t = ($s/$v)/1.337;
	
			$t_scroll = ($card_offset.top)/$v;
			
			$s1 = $x*0.2;
			$t1 = ($s1/$v);
			
			$s2 = $x-$s1;
			$d = Math.sqrt( Math.pow( $big_width , 2) + Math.pow( $big_height ,2) );
			$t_r = ($d/($v*3.0));
			$scale = $d/$card_height; // Scale of which the circle needs to scale to to cover the whole header
			
			t1
			.set($card_bottom.find("p"), {className: '+=card-bottom-p-hide'})
			.set($card_bottom, {'background-color': 'rgba(236,236,236,1)'})
			.set($card_img, {className: '+=card-top-img-gray'})
			.to($other_cards, 0.2,{opacity: 0})
			.to($card_animation, $t, _.assign(cssStyle.extend({ styles: ".animation_border" })), "-=0.2")
			.to($card_animation, $t, { x: $x, ease: Power0.easeNone })
			.to($wrapper, $t, { y: $y, ease: Circ.easeIn}, "-="+$t)
			.set($card,{className: '+=card-active'})
			.set($card, {position: 'absolute', margin: 0, left: $card.offset().left, top: $card.offset().top })
			.to($card_animation, $t_r, { scale: $scale})
			.set($big, {'background-color': $card_color, 'background-image': 'none'})
			.set($big, { className: '+=big-picture-active'})
			.set($('#big-border'), {'background-color': 'rgba(1, 1, 1, 0)'})
			.set($big_text, {className: 'big-picture-h3-active', text: $card_text })
			.set($small_text, {className: 'big-picture-h4-active', text: $hidden_text })
			.set($wrapper, {display: 'none'})
			.to($card_top, 0.3, _.assign(cssStyle.extend({ styles: ".card_top_animate" })), "-="+$t_r)
			.to($card_bottom, 0.3, _.assign(cssStyle.extend({ styles: ".card_bottom_animate" })), "-=0.3")
			.to($card_midle, 0.3, _.assign(cssStyle.extend({ styles: ".load_container_animate" })), "-=0.3")
			.set($card_top,{className:'+=card_top_animate'})
			.set($card_bottom,{className:'+= card_bottom_animate'})
			.set($card_midle,{className:'+= load_container_animate '})
			.to($card, $t, _.assign(cssStyle.extend({ styles: ".click" })))
			.set($card, {className:'+=click'});/**/
		}
		t1.play();
			
	}
	
	$(".card").hover(mouseenter, mouseleave);
	$(".card").click(click);		
	
	
	// ========================================================================
	//  CSS EXTENDER
	// ========================================================================
	
	function CSSExtender() {
	  var camelNames = {};
	  var kebabNames = {};
	  var prefixNames = ["-webkit-", "-moz-", "-ms-"];
	  var removeNames = ["transform", "svg"];
	  createCaseNames();
	  return {extend: extend};
	  function extend(config) {
	    var style = {};
	    var sources = _.isArray(config.styles) ? config.styles : [config.styles];
	    var target = getElement(config.target);
	    var listNames = getListNames(config.filter);
	    var blackList = listNames.blackList;
	    var whiteList = listNames.whiteList;
	    _.forEach(sources, (function(source) {
	      var element = getElement(source);
	      element && !whiteList ? _.assign(style, getDifference(target, element)) : _.assign(style, getStyle(element || source, whiteList));
	    }));
	    return _.omit(style, blackList);
	  }
	  function getStyle(source, whiteList) {
	    var css,
	        style = {};
	    if (_.isElement(source))
	      css = window.getComputedStyle(source);
	    if (_.isString(source))
	      css = CSSRulePlugin.getRule(source);
	    if (!(css instanceof CSSStyleDeclaration))
	      return {};
	    var length = whiteList ? whiteList.length : css.length;
	    _.times(length, (function(i) {
	      var kebab = whiteList ? kebabNames[whiteList[i]] : css[i];
	      var camel = camelNames[kebab];
	      var value = css.getPropertyValue(kebab);
	      if (camel && value)
	        style[camel] = value;
	    }));
	    return style;
	  }
	  function getListNames() {
	    var filter = arguments[0] !== (void 0) ? arguments[0] : "=";
	    var list = filter.split("=");
	    var names = list[1].split(",");
	    return {
	      whiteList: list[0] === "+" ? names : null,
	      blackList: list[0] === "-" ? names.concat(removeNames) : removeNames
	    };
	  }
	  function getDifference(element1, element2) {
	    if (!_.isElement(element1) || !_.isElement(element2))
	      return {};
	    TweenLite.set([element1, element2], {y: "+=0"});
	    var style = {};
	    var style1 = window.getComputedStyle(element1);
	    var style2 = window.getComputedStyle(element2);
	    var transform1 = element1._gsTransform;
	    var transform2 = element2._gsTransform;
	    var transforms = _.omit(transform2, (function(value, name) {
	      return transform1[name] === value;
	    }));
	    _.forOwn(camelNames, (function(camelCase, name) {
	      var value1 = style1.getPropertyValue(name);
	      var value2 = style2.getPropertyValue(name);
	      if (value1 !== value2)
	        style[camelCase] = value2;
	    }));
	    return _.assign(style, transforms);
	  }
	  function createCaseNames() {
	    var style = window.getComputedStyle(document.body);
	    _.times(style.length, (function(i) {
	      var name = style[i];
	      var inList = _.some(prefixNames, (function(prefix) {
	        return _.includes(name, prefix);
	      }));
	      if (!inList)
	        camelNames[name] = _.camelCase(name);
	    }));
	    kebabNames = _.invert(camelNames);
	  }
	  function getElement(value) {
	    if (!value)
	      return undefined;
	    if (_.isElement(value))
	      return value;
	    if (value.jquery)
	      return value[0];
	    return undefined;
	  }
	}

	
});