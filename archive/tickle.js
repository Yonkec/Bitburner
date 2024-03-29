/** @param {NS} ns */
export async function main(ns) {

    //someone elses function, left it here for reference
    var target = ns.args[0];
    var moneyThresh = ns.getServerMaxMoney(target) * 0.9;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}