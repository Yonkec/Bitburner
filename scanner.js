/** @param {NS} ns */
export async function main(ns) {

	let file = "Servers.txt";
	let servers = ["home"];
	let newServers = "";

	for (let i = 0; i < servers.length; i++) {

		newServers = ns.scan(servers[i])
		servers = [...new Set([...servers, ...newServers])];
		servers = servers.filter(blacklist);

	}

	function blacklist(server){
		return (server != ".");
	}

	await ns.write(file, JSON.stringify(servers), "w");

}