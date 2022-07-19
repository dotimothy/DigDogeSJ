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
let dogeBal = 0, shibBal = 0, elonBal = 0, dogePrice = 0, shibPrice = 0, elonPrice = 0, dogeUSD = 0, shibUSD = 0, elonUSD = 0;

//Global Varialbles for Hashrates
let totalDogeHash = 0, totalShibHash = 0, totalElonHash = 0;

/*

1. First we create a variable called doge and set it to the id of the div with the id of balDoge.
2. Then we set the innerHTML of the div to a message indicating that we are calculating the balance.
3. Next we create a variable called dogeBal and set it to the balance of the address.
4. Then we create a variable called dogeUSD and set it to the balance of the address in USD.
5. Then we set the innerHTML of the div to a message indicating the balance of the address.
6. Lastly we log the balance of the address to the console. 

*/

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

/*

1. We first fetch the balance of the address from the Dogechain API.
2. We then parse the JSON data to get the balance.
3. We then use the balance to calculate the balance in USD.
4. We then display the balance in the HTML. 

*/

function getDogeWalletBalance(address) {
	//document.write(`https://dogechain.info/api/v1/address/balance/${address}`);
	let doge = document.getElementById("balDoge");
	doge.innerHTML = "<h1>Calculating DOGE!</h1>";
	fetch(`https://dogechain.info/api/v1/address/balance/${address}`,{method:'GET',mode:'no-cors'}) 
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
	shib.innerHTML = "<h1>Calculating SHIB!</h1>";
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

/*

1. We create a variable called elon and set it to the element with the id of balElon.
2. We set the innerHTML of elon to a string that says "Calculating ELON!".
3. We create a variable called elonBal and set it to the value of the balance of the address.
4. We create a variable called elonUSD and set it to the value of elonBal * elonPrice.
5. We set the innerHTML of elon to a string that says the balance of the address in ELON and in USD. 

*/

// Gets Elon Balance of Specified Unmineable Shib Address	
function getElonBalance(address) {
	//document.write(`https://api.unminable.com/v4/address/${address}?coin=Shib`);
	let elon = document.getElementById("balElon");
	elon.innerHTML = "<h1>Calculating ELON!</h1>";
	fetch(`https://api.unminable.com/v4/address/${address}?coin=elon`) 
		.then( 
			function(response) {
				//examine the text in the response
				response.json().then(function(data) {
					console.log(data);			
					elonBal = data.data.balance;
					elonUSD = Math.round(elonBal * elonPrice * 100) / 100;
					elon.innerHTML = "<h1>" + elonBal + " ELON ($" + elonUSD + " USD)</h1>";
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
		return getDogeMiningBalance("DJGP6kgqh8BEsfEkHxxtrthqPHWu2PempY");
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

//refreshes the page every so often to get the most up to date information
let elonLoaded = 0;
function refreshElon() {
	//https://unmineable.com/coins/ELON/address/0x34BB0bd111907b6aCA51207e12E8Fd3BfE5fd4B
	if(!elonLoaded) {
		elonLoaded = !elonLoaded;
		return getElonBalance("0x34BB0bd111907b6aCA51207e12E8Fd3BfE5fd4BB");
	}
}

//reloads all balances
let loaded = 0;
function refreshAll() {
	if(!loaded) {
		getDogePrice();
		getShibPrice(); 
		getElonPrice();
		refreshDoge();
		refreshShib();
		refreshElon();
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

//gets the live price of Dogeelon Mars
function getElonPrice() {
	fetch(`https://api.coingecko.com/api/v3/coins/dogelon-mars`) 
	.then( 
		function(response) {
			//examine the text in the response
			response.json().then(function(data) {
				console.log(data);			
				elonPrice = data.market_data.current_price.usd;	
				document.getElementById("priceElon").innerHTML = "<h1> 1 ELON = " + data.market_data.current_price.usd+ " USD </h1>";					
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
		let elonInDollar = 1.00 / elonPrice;
		document.getElementById("priceDoge").innerHTML = "<h1> 1 USD = " + dogeInDollar + " DOGE </h1>";
		document.getElementById("priceShib").innerHTML = "<h1> 1 USD = " + shibInDollar + " SHIB </h1>";
		document.getElementById("priceElon").innerHTML = "<h1> 1 USD = " + elonInDollar + " ELON </h1>";					
	}
	else {
		document.getElementById("priceDoge").innerHTML = "<h1> 1 DOGE = " + dogePrice + " USD </h1>";
		document.getElementById("priceShib").innerHTML = "<h1> 1 SHIB = " + shibPrice + " USD </h1>";
		document.getElementById("priceElon").innerHTML = "<h1> 1 ELON = " + elonPrice + " USD </h1>";					
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

function elonTheory() {
	let theoretical = prompt("How Many ELON in 'Wallet':");
	while(theoretical == null) {
		theoretical = prompt("How Many ELON in 'Wallet'");
	}
	let usd = Math.round(theoretical * elonPrice * 100) / 100;
	alert("USD Value of " + theoretical + " ELON is $" + usd); 
}
