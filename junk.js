/** @param {NS} ns */
export async function main(ns) {
	//random script messing w/ variables and returning useful info
    let server = "nectar-net";
    let gr = ns.getScriptRam("grow.js");
    let wr = ns.getScriptRam("weaken.js");
    let hr = ns.getScriptRam("hack.js");
    let maxram = ns.getServerMaxRam(server);
    let maxcash = ns.getServerMaxMoney(server);
    let gt = Math.ceil((maxram * .6) / gr);
    let wt = Math.ceil((maxram * .2) / wr);
    let ht = Math.ceil((maxram * .1) / wr);

    ns.tprint(server + " max RAM: " + maxram );
    ns.tprint(server + " max CASH: " + maxcash );
    ns.tprint("GT: " + gt + " RamUsed: " + (gt * gr));
    ns.tprint("WT: " + wt + " RamUsed: " + (wt * wr));
    ns.tprint("HT: " + ht + " RamUsed: " + (ht * hr));
} na