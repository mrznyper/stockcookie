var welcome = `<div class="demo-card-wide mdl-shadow--2dp">
	<div class="mdl-card__title">
	<h2 class="mdl-card__title-text mdl-color-text--primary-dark">You don't have a cookie!</h2>
	</div>
	<div class="mdl-card__supporting-text">
	<strong>That's ok!</strong><br>
	Simply enter the stock tickers to you want to follow.
	</div>
	<div class="mdl-card__actions mdl-card--border">
		<form action="bakeCookie">
		  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			<input class="mdl-textfield__input" type="text" id="tickerInput">
			<label class="mdl-textfield__label" for="tickerInput">TWTR, MSFT, AAPL, SNE...</label>
		  </div>
		  <button id="bakeCookieButton" class="button_cookie mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
		</button>
		</form>
		<div class="mdl-layout-spacer"></div>
	</div>
	</div>
</div>`;

window.onload = function() {
  checkCookie();
};
function checkCookie(){
	//var cookie = readCookie("stocks");
	//if(cookie = null){
		document.getElementById('mainContainer').innerHTML= welcome;
	//}else{
		//populateStocks();
	//}
}

//Found http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}