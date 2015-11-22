var welcome = `<div class="demo-card-wide mdl-shadow--2dp">
					<div class="mdl-card__title">
					<h2 class="mdl-card__title-text mdl-color-text--primary-dark">You don't have a cookie!</h2>
					</div>
					<div class="mdl-card__supporting-text">
					<strong>That's ok!</strong><br>
					Simply enter the stock tickers to you want to follow.
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<form onsubmit="return false;">
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
	//createCookie("stocks", "GOOG, SNE, MSFT", 30);
	//alert("After creation" + document.cookie);
	var cookie = readCookie("stocks");
	if(cookie === null){
		document.getElementById('mainContainer').innerHTML = welcome;
	}else{
		document.getElementById('mainContainer').innerHTML = populateStocks(cookie);
	}
}

//Found http://www.quirksmode.org/js/cookies.html
function createCookie(cname,cvalue,days) {
	var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
	var cookieString = cname + "=" + cvalue + "; " + expires;
	alert(cookieString);
    document.cookie = cookieString;
}

function readCookie(cname) {
	var cookie = document.cookie;
	var pos = cookie.indexOf(cname);
	if(pos == -1){
		return null;
	}else{
		var semiPos = cookie.indexOf(";");
		return cookie.slice(7, semiPos);
	}
}

function eraseCookie() {
	document.cookie = "stocks=GOOG; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

function bakeCookie(){
	var raw_tickers = document.getElementById("tickerInput").value;
	createCookie("stocks", raw_tickers, 5);
}

function populateStocks(cookie){
	var stocks = cookie.split(",");
	var stock_cards = "";
	for(c = 0; c < stocks.length; c++){
		var stock = stock_card;
		stock = stock.replace("[STOCK_TITLE]", stocks[c].trim());
		stock_cards += stock;
	}
	return stock_div.replace("[STOCK_CARDS]",stock_cards);
}