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
var test_stocks = "GOOG, SNE, MSFT, TWTR, AAPL";
function checkCookie(){
	var cookie = readCookie("stocks");
	//var cookie = test_stocks;
	if(cookie !== null){
		console.log(cookie);
		queryStocks(cookie);
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
	console.log("Cookie created: " + cookieString);
}

function readCookie(cname) {
	var cookie = document.cookie;
	var pos = cookie.indexOf(cname);
	if(pos == -1){
		return null;
	}else{
		var semiPos = cookie.indexOf(";");
		var cookieString = cookie.slice(7, semiPos);
		console.log(cookieString);
		return cookieString;
	}
}

function eraseCookie() {
	document.cookie = "stocks=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	location.reload();
}

function bakeCookie(){
	var cookie_stocks = document.getElementById("tickerInput").value;
	console.log("Raw tickers: " + cookie_stocks);
	queryStocks(cookie_Stocks);
	createCookie("stocks", cookie_stocks, 5);
}
function queryStocks(cookie){
	var requestURL = createQuery(cookie);
	var request = new XMLHttpRequest();
	request.onload = function() {
		if (request.readyState == 4 && request.status == 200) {
			createStockCards(request.responseXML);
		}
	};
  request.open("GET", requestURL, true);
  request.send(null);
}
function createQuery(cookie){
    var query_stem = "https://query.yahooapis.com/v1/public/yql?q=";
    var query_first = "select * from csv where url='http://download.finance.yahoo.com/d/quotes.csv?s=";
	var query_second = "&f=nsl1c&e=.csv' and columns='Name,Symbol,Price,Change'";
    var stock_list = cookie.split(",");
    console.log(stock_list);
	var stocks = "";
    //Clean up stock symbols.
    if(stock_list.length >= 1){
        //console.log(stock_list[0]);
        stocks = stock_list[0];
        for(var i = 1; i < stock_list.length; i++){
            stock_list[i] = stock_list[i].trim();
            stock_list[i] = stock_list[i].toUpperCase();
            stocks += "," + stock_list[i];
        }
    }
    //console.log(stocks);
    var full_query = query_stem + query_first + stocks + query_second;
    full_query = query_stem + encodeURIComponent(query_first + stocks + query_second);
    //console.log(full_query);
    return full_query;
}
function createStockCards(xml){
	var element_list = xml.getElementsByTagName("row");
    var stock_cards = "";
    for(var c = 0; c < element_list.length; c++){
        stock_cards += fillCard(element_list[c]);
    }
    document.getElementById("mainContainer").innerHTML = stock_div.replace("[STOCK_CARDS]", stock_cards);
}
function fillCard(element, stock_cards){
	var name = element.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
	var change = element.getElementsByTagName("Change")[0].childNodes[0].nodeValue;
	var price = element.getElementsByTagName("Price")[0].childNodes[0].nodeValue;
	var symbol = element.getElementsByTagName("Symbol")[0].childNodes[0].nodeValue;
    var stock = stock_card;
	stock = stock.replace("[STOCK_TITLE]", name);
	var change_element = "";
	if(change.charAt(0) == '-'){
		change_element = '<p style="color:#990014;">' + change + '</p>';
	}else{
		change_element = '<p style="color:#519992;">' + change + '</p>';
	}
	var stock_info = '<strong>' + price + '</strong>'
					+ '<br>' + change_element;
	stock = stock.replace("[STOCK_TEXT]", stock_info);
	stock = stock.replace("[STOCK_LINK]", symbol);
	return stock;
}