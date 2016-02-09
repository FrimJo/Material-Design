$(window).load(function(){

	var lis, 
		len;
	
	// we wait for the component to be ready, 
	// then select all list-items of the menu and count how many items we have
	// and finally add the class "off-screen" to let let them slide off the view
	document.body.addEventListener('slidenav/is-ready', function(e){

		lis = e.target.getElementsByTagName('li');
		len = lis.length;
		Array.prototype.forEach.call(lis, function(el){
			el.classList.add('off-screen');
		});
	});
	
	// When the navbar is opened we remove the off-screen class from each list-item.
	// Instead of removing the class from them at the same time we do it with a slight
	// delay (setTimeout) one after the other.
	document.body.addEventListener('slidenav/show', function(){
		var i = 0;
		(function looper(){
			setTimeout(function(){
				lis[i].classList.remove('off-screen');
				i++;
	
				if( i < len ){
					looper();
				}
			}, 10);
	
		})();
	});
	
	// When the navbar is closed we remove the off-screen class from each list-item to hide them back again.
	document.body.addEventListener('slidenav/hide', function(){
		Array.prototype.forEach.call(lis, function(el){
			el.classList.add('off-screen');
		});			
	});

});
