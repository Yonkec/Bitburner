/** @param {NS} ns */
export async function main(ns) {
    //weaken script used by other scripts
    var target = ns.args[0];

    while(true) {
            await ns.weaken(target);
	}
    //isthisthingnon?
}