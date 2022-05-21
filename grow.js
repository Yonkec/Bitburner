/** @param {NS} ns */
export async function main(ns) {

    //ultra basic grow script called in other actions, just grows the server to the max
    var target = ns.args[0];

    while(true) {
            await ns.getser(target);
	}
   
}