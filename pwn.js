/** @param {NS} ns */
export async function main(ns) {

	let ratios = [.5,.2,.1];
	const servers = JSON.parse(ns.read("Servers.txt"));
	const victim = "joesguns"

	//iterates over each server in the servers file
	for (let i = 0; i < servers.length; i++) {
		
		let server = servers[i];
		let pwndPorts = 0;
		let tools = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
		const scriptz = ["grow.js","weaken.js","hack.js"];

		//iterates over each executable and if the file currently exists it uses it against the current server
		for (let j = 0; j < tools.length; j++) {
			//including the stupid functions here in order to set the Dynanmic RAM usage - calculations misfire in the if loop without this line
			ns.sqlinject; ns.httpworm; ns.relaysmtp; ns.ftpcrack; ns.brutessh;
			if (ns.fileExists(tools[j], "home") == true) {
				ns[(tools[j].split(".")[0]).toLowerCase()](server)
				pwndPorts++;
			}
		}

		//nukes the server if it determines that we have sufficent hacking level, and sufficient ports have been opened
		if (ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel() &&
			ns.getServerNumPortsRequired(server) <= pwndPorts) {
			ns.nuke(server);
		}

		//New approach is to split the tickling into 3 separate scripts, one for H G and W. 
		// We then need to determine a weighting for these and run them parallel within the same server
		let servMaxRam = ns.getServerMaxRam(server)

		if (ns.hasRootAccess(server) == true && servMaxRam >= 8 && server != "home" && server != "darkweb") {
			ns.killall(server);
			for (let k = 0; k < scriptz.length; k++){
				await ns.scp(scriptz[k],server);
				ns.exec(scriptz[k], server, Math.ceil((servMaxRam * ratios[k]) / ns.getScriptRam(scriptz[k])), victim);
        	}
		}
	}

	/*scp's the script and then executes it at as many threads as the servers RAM will allow, targeting the indicated victim server
	if (ns.hasRootAccess(server) == true && ns.getServerMaxRam(server) > 0 || server == "home") {
		await ns.scp("tickle.js", server);
		ns.exec("tickle.js", server, (ns.getServerMaxRam(server) / ns.getScriptRam("tickle.js", server)), victim);
			await ns.scp("grow.js", server);
			await ns.scp("weaken.js", server);
			await ns.scp("hack.js", server);
			ns.exec("grow.js", server, Math.floor((servMaxRam * .6) / ns.getScriptRam("grow.js")), victim);
			ns.exec("weaken.js", server, Math.floor((servMaxRam * .2) / ns.getScriptRam("weaken.js")), victim);
			ns.exec("hack.js", server, Math.ceil((servMaxRam * .1) / ns.getScriptRam("hack.js")), victim);
	}
}*/

	//runs any concurrent scrips here that won't interfere with the main hacking processes - moved to last to ensure money isnt blown before actions above can occur
	//ns.exec("hacknet.js", "home");
}