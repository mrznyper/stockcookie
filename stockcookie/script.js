var welcome = `<div class="demo-card-wide mdl-shadow--2dp">
					<div class="mdl-card__title">
					<h2 class="mdl-card__title-text mdl-color-text--primary-dark">You don't have a cookie!</h2>
					</div>
					<div class="mdl-card__supporting-text">
					<strong>That's ok!</strong><br>
					Simply enter the stock tickers to you want to follow.
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<form>
							<div class="mdl-textfield mdl-js-textfield">
								<input class="mdl-textfield__input mdl-color-text--primary-dark" type="text" id="tickerInput">GOOG, MSFT, AAPL, SNE...</input>
							</div>
							<button onclick="bakeCookie()" id="bakeCookieButton" class="button_cookie mdl-button mdl-js-button mdl-button--fab"/>
						</form>
					</div>
					</div>
				</div>`;

var stock_card = `<div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
					  <div class="mdl-card__title">
						 <h4 class="mdl-card__title-text">[STOCK_TITLE]</h4>
					  </div>
					  <div class="mdl-card__supporting-text">
						<span class="mdl-typography--font-light mdl-typography--subhead">[STOCK_TEXT]</span>
					  </div>
					  <div class="mdl-card__actions">
						 <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="" data-upgraded=",MaterialButton">
						   [STOCK_LINK]
						   <i class="material-icons">chevron_right</i>
						 </a>
					  </div>
					</div>`;
					
var stock_div = `<div class="android-card-container mdl-grid">
				[STOCK_CARDS]	
				</div>`;
				
window.onload = function() {
  checkCookie();
};
function checkCookie(){
	var cookie = readCookie("stocks");
	alert(cookie);
	if(cookie == null){
		document.getElementById('mainContainer').innerHTML = welcome;
	}else{
		document.getElementById('mainContainer').innerHTML = populateStocks(cookie);
	}
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

function bakeCookie(){
	var raw_tickers = document.getElementById("tickerInput").value;
	alert(raw_tickers);
	createCookie("stocks", raw_ticker, 5);
}

function populateStocks(cookie){
	return cookie;
}