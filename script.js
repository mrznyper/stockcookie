var parser = new DOMParser();
var stock_cards = "";
var welcome = `<div class="demo-card-wide mdl-shadow--2dp">
					<div class="mdl-card__title">
					<h2 class="mdl-card__title-text mdl-color-text--primary-dark">You don't have a cookie!</h2>
					</div>
					<div class="mdl-card__supporting-text">
					<strong>That's ok!</strong><br>
					Simply enter the stock symbols to you want to follow.
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
						 </a>
					  </div>
					</div>`;
					
var stock_div = `<div class="android-card-container mdl-grid">
				[STOCK_CARDS]	
				</div>`;

function checkCookie(){
	//createCookie("stocks", "GOOG, SNE, MSFT, TWTR, AAPL", 30);
	var cookie = readCookie("stocks");
	if(cookie !== null){
		populateStocks(cookie);
		document.getElementById("welcome_div").style.visibility = "hidden";
	}else{
		document.getElementById("clear_button").style.visibility = "hidden";
	}
}

//Found http://www.quirksmode.org/js/cookies.html
function createCookie(cname,cvalue,days) {
	var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
	var cookieString = cname + "=" + cvalue + "; " + expires;
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
	location.reload();
}

function bakeCookie(){
	var raw_tickers = document.getElementById("tickerInput").value;
	createCookie("stocks", raw_tickers, 5);
}

function populateStocks(cookie){
	var stocks = cookie.split(",");
	stock_cards = "";
	for(var c = 0; c < stocks.length; c++){
        var ticker = stocks[c].trim();
				ticker = ticker.toUpperCase();
        queryStock(ticker);
	}
	stock_div = stock_div.replace("[STOCK_CARDS]",stock_cards);
	document.getElementById('mainContainer').innerHTML = stock_div;
}
function queryStock(ticker){
    var requestURL ="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"
    + ticker
    + "%22)%0A%09%09&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env";
    var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			fillStockCard(request.responseText);
		}
	};
    request.open("GET", requestURL, true);
    request.send(null);
}
function fillStockCard(stock_xml){
	var xml = parser.parseFromString(stock_xml,"text/xml");
	var stock = stock_card;
	console.log(xml);
	console.log(xml.getElementsByTagName("Name")[0]);
	console.log(xml.getElementsByTagName("Name")[0].childNodes[0]);
	console.log(xml.getElementsByTagName("Name")[0].childNodes[0].nodeValue);
	var name = xml.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
	var percent_change = xml.getElementsByTagName("ChangeinPercent")[0].childNodes[0].nodeValue;
	var price = xml.getElementsByTagName("LastTradePriceOnly")[0].childNodes[0].nodeValue;
	var symbol = xml.getElementsByTagName("Symbol")[0].childNodes[0].nodeValue;
	stock = stock.replace("[STOCK_TITLE]", name);
	var change = "";
	if(percent_change.charAt(0) == '-'){
		change = '<p style="color:#990014;">' + percent_change + '</p>';
	}else{
		change = '<p style="color:#519992;">' + percent_change + '</p>';
	}
	var stock_info = '<strong>' + price + '</strong>'
					+ '<br>' + change;
	stock = stock.replace("[STOCK_TEXT]", stock_info);
	stock = stock.replace("[STOCK_LINK]", symbol);
	stock_cards += stock;
}