/* DigDoge.js: Javascript File for DigDogeSJ Website
* Live at https://dotimothy.github.io/DigDogeSJ;
* Authors: Timothy Do & Jason Vu 
* Modifications:
* Date 		Modification 								Author
* 8/27/21	Resolved IP Issue and Updated Balance GETs 	TD
* 8/28/21 	Updated Balance Getting Functions for Shib 	TD 
* 8/29/21	Added Easter Egg & Updated the Mobile Site 	TD
*/ 

//init Google Voice
var msg = new SpeechSynthesisUtterance();
var volume = 1;
var voices = ["Google US English","Google US English"];
msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voices[0];})[0];
msg.pitch = 1.25;
msg.rate = 1.25;
msg.text = '';
msg.volume = volume;

function speakText(outputText) {
    msg.text = outputText;
    msg.volume = volume;
    window.speechSynthesis.speak(msg);
}

//Global Variables for Balances
let dogeBal = 0, shibBal = 0, dogePrice = 0, shibPrice = 0, dogeUSD = 0, shibUSD = 0;

//Global Varialbles for Hashrates
let totalDogeHash = 0, totalShibHash = 0;

// Gets Doge Balance of Specified Unmineable Doge Address	
function getDogeMiningBalance(address) {
	//document.write(`https://api.unminable.com/v4/address/${address}?coin=DOGE`);
	let doge = document.getElementById("balDoge");
	doge.innerHTML = "<h1>Calculating DOGE!</h1>";
	fetch(`https://api.unminable.com/v4/address/${address}?coin=DOGE`) 
		.then( 
			function(response) {
				//examine the text in the response
				response.json().then(function(data) {
					console.log(data);			
					dogeBal = data.data.balance;
					dogeUSD = Math.round(dogeBal * dogePrice * 100) / 100;
					doge.innerHTML = "<h1>" + dogeBal + " DOGE ($" + dogeUSD + " USD)</h1>";
				});
				
			}).catch(function(err) {
				console.log("Fetch Error :-S", err);
			}
		)
}

function getDogeWalletBalance(address) {
	//document.write(`https://dogechain.info/api/v1/address/balance/${address}`);
	let doge = document.getElementById("balDoge");
	doge.innerHTML = "<h1>Calculating DOGE!</h1>";
	fetch(`https://dogechain.info/api/v1/address/balance/${address}`) 
		.then( 
			function(response) {
				//examine the text in the response
				response.json().then(function(data) {
					console.log(data);			
					dogeBal = data.balance;
					dogeUSD = Math.round(dogeBal * dogePrice * 100) / 100;
					doge.innerHTML = "<h1>" + dogeBal + " DOGE ($" + dogeUSD + " USD)</h1>";
				});
				
			}).catch(function(err) {
				console.log("Fetch Error :-S", err);
			}
		)

}

// Gets Shib Balance of Specified Unmineable Shib Address	
function getShibBalance(address) {
	//document.write(`https://api.unminable.com/v4/address/${address}?coin=Shib`);
	let shib = document.getElementById("balShib");
	shib.innerHTML = "<h1>Calculating Shib!</h1>";
	fetch(`https://api.unminable.com/v4/address/${address}?coin=Shib`) 
		.then( 
			function(response) {
				//examine the text in the response
				response.json().then(function(data) {
					console.log(data);			
					shibBal = data.data.balance;
					shibUSD = Math.round(shibBal * shibPrice * 100) / 100;
					shib.innerHTML = "<h1>" + shibBal + " SHIB ($" + shibUSD + " USD)</h1>";
				});
			}).catch(function(err) {
				console.log("Fetch Error :-S", err);
			}
		)
}

//gets the current Doge workers that are active and reports their hashrates
function getDogeWorkers(address) {

}

//gets the current Shib workers that are active and reports their hashrates
//in progress -> Jason
function getShibWorkers(address) {

}

//refreshes the page every so often to get the most up to date information for DOGE
let dogeLoaded = 0;
function refreshDoge() {
	//https://unmineable.com/coins/DOGE/address/DJGP6kgqh8BEsfEkHxxtrthqPHWu2PempY
	if(!dogeLoaded) {
		dogeLoaded = !dogeLoaded;
		return getDogeWalletBalance("DJGP6kgqh8BEsfEkHxxtrthqPHWu2PempY");
	}
}

//refreshes the page every so often to get the most up to date information
let shibLoaded = 0;
function refreshShib() {
	//https://unmineable.com/coins/SHIB/address/0xd55dfb9A648dE5eF35A6E1A9B7707Eea0AB6b49B
	if(!shibLoaded) {
		shibLoaded = !shibLoaded;
		return getShibBalance("0xd55dfb9A648dE5eF35A6E1A9B7707Eea0AB6b49B");
	}
}

//reloads all balances
let loaded = 0;
function refreshAll() {
	if(!loaded) {
		getDogePrice();
		getShibPrice(); 
		refreshDoge();
		refreshShib();
		loaded = !loaded; 
	}
}

//gets the live price of DOGE
function getDogePrice() {
	fetch(`https://api.coingecko.com/api/v3/coins/dogecoin`) 
		.then( 
			function(response) {
				//examine the text in the response
				response.json().then(function(data) {
					console.log(data);			
					dogePrice = data.market_data.current_price.usd;
					document.getElementById("priceDoge").innerHTML = "<h1> 1 DOGE = " + data.market_data.current_price.usd + " USD </h1>";
				});
			}).catch(function(err) {
				console.log("Fetch Error :-S", err);
			}
		)
	
}

//gets the live price of SHIB
function getShibPrice() {
	fetch(`https://api.coingecko.com/api/v3/coins/shiba-inu`) 
	.then( 
		function(response) {
			//examine the text in the response
			response.json().then(function(data) {
				console.log(data);			
				shibPrice = data.market_data.current_price.usd;	
				document.getElementById("priceShib").innerHTML = "<h1> 1 SHIB = " + data.market_data.current_price.usd+ " USD </h1>";					
			});
		}).catch(function(err) {
			console.log("Fetch Error :-S", err);
		}
	)
}

//makes the prices switch around
let switched = 0;
function switchAround() {
	if(!switched) {
		let dogeInDollar = 1.00 / dogePrice;
		let shibInDollar = 1.00 / shibPrice; 
		document.getElementById("priceDoge").innerHTML = "<h1> 1 USD = " + dogeInDollar + " DOGE </h1>";
		document.getElementById("priceShib").innerHTML = "<h1> 1 USD = " + shibInDollar + " SHIB </h1>";					
	}
	else {
		document.getElementById("priceDoge").innerHTML = "<h1> 1 DOGE = " + dogePrice + " USD </h1>";
		document.getElementById("priceShib").innerHTML = "<h1> 1 SHIB = " + shibPrice + " USD </h1>";					
	}
	switched = !switched;
}

function woof() {
	console.log("Woof Woof Woof Woof Woof!!!");
	speakText("Woof Woof Woof Woof Woof!!!");
}

function checkMobile() {
	let isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	if(isMobile) {
		window.location.replace("./mobile.html");
		return isMobile;
	}
}

function checkDesktop() {
	let isDesktop = !(typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	if(isDesktop) {
		window.location.replace("./index.html");
		return isDesktop;
	}
}

function dogeTheory() {
	let theoretical = prompt("How Many DOGE in 'Wallet':");
	while(theoretical == null) {
		theoretical = prompt("How Many DOGE in 'Wallet'");
	}
	let usd = Math.round(theoretical * dogePrice * 100) / 100;
	alert("USD Value of " + theoretical + " DOGE is $" + usd); 
}

function shibTheory() {
	let theoretical = prompt("How Many SHIB in 'Wallet':");
	while(theoretical == null) {
		theoretical = prompt("How Many SHIB in 'Wallet'");
	}
	let usd = Math.round(theoretical * shibPrice * 100) / 100;
	alert("USD Value of " + theoretical + " SHIB is $" + usd); 
}