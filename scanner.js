/** @param {NS} ns */
export async function main(ns) {

	//scan servers by running through the list, adding new+old to a set to kill dupes, then storing them back into the array.  
	//Probably more efficent ways to do this but it works for now.
	//probably need to clean this up and move it into the automation function to keep the list accurate.
	let file = "Servers.txt";
	let servers = ["home"];
	let newServers = "";

	for (let i = 0; i < servers.length; i++) {

		newServers = ns.scan(servers[i])
		servers = [...new Set([...servers, ...newServers])];
		servers = servers.filter(blacklist);

	}

	function blacklist(server){
		return (server != "."  && server != "darkweb");
	}

	await ns.write(file, JSON.stringify(servers), "w");

}