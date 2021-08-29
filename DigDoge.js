//Global Variables for Balances
let dogeBal = 0, shibBal = 0, dogePrice = 0, shibPrice = 0, dogeUSD = 0, shibUSD = 0;

//getting crypto prices at the very beginning
getDogePrice();
getShibPrice();

// Gets Doge Balance of Specified Unmineable Doge Address	
function getDogeBalance(address) {
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
					dogeUSD = Math.trunc(dogeBal * dogePrice * 100) / 100;
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
					shibUSD = Math.trunc(shibBal * shibPrice * 100) / 100;
					shib.innerHTML = "<h1>" + shibBal + " SHIB ($" + shibUSD + " USD)</h1>";
				});
			}).catch(function(err) {
				console.log("Fetch Error :-S", err);
			}
		)
}

//gets the current Doge workers that are active and reports their hashrates
//in progress
function getDogeWorkers(address) {

}

//gets the current Shib workers that are active and reports their hashrates
//in progress
function getShibWorkers(address) {

}

//refreshes the page every so often to get the most up to date information for DOGE
let dogeLoaded = 0;
function refreshDoge() {
	//https://unmineable.com/coins/DOGE/address/DJGP6kgqh8BEsfEkHxxtrthqPHWu2PempY
	if(!dogeLoaded) {
		dogeLoaded = !dogeLoaded;
		getDogeBalance("DJGP6kgqh8BEsfEkHxxtrthqPHWu2PempY");
	}
}

//refreshes the page every so often to get the most up to date information
let shibLoaded = 0;
function refreshShib() {
	//https://unmineable.com/coins/SHIB/address/0x8bafebf244f5a9603cddc550c09b2f5974362b05
	if(!shibLoaded) {
		shibLoaded = !shibLoaded;
		return getShibBalance("0x8bafebf244f5a9603cddc550c09b2f5974362b05");
	}
}

//reloads all balances
let loaded = 0;
function refreshAll() {
	if(!loaded) {
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
			});
		}).catch(function(err) {
			console.log("Fetch Error :-S", err);
		}
	)
}
