/** @param {NS} ns */
export async function main(ns) {

	//mostly deprecated, was using this to one-off send a server after anothe but most of this should be automated in other scripts
    let server = ns.args[0];
	let victim = ns.args[1];
	let servMaxRam = ns.getServerMaxRam(server)

		if (ns.hasRootAccess(server) == true && ns.getServerMaxRam(server) > 8) {

			ns.exec("grow.js", server, Math.ceil((servMaxRam * .6) / ns.getScriptRam("grow.js")), victim);
			ns.exec("weaken.js", server, Math.ceil((servMaxRam * .2) / ns.getScriptRam("weaken.js")), victim);
			ns.exec("hack.js", server, Math.ceil((servMaxRam * .1) / ns.getScriptRam("hack.js")), victim);
		}
}