/** @param {NS} ns */
export async function main(ns) {

    //slightly less basic hack script, waits to hack until the server is prepped fully.  Extremely inefficnet, but it works for now.
    var target = ns.args[0];

    while(true) {

    var moneyThresh = ns.getServerMaxMoney(target);
    var securityThresh = ns.getServerMinSecurityLevel(target);


        
        if (ns.getServerSecurityLevel(target) == securityThresh || ns.getServerMoneyAvailable == moneyThresh) {
            await ns.hack(target);
        }
        else{
            await ns.sleep(1000);
        }
    }
    //isthisthingnon?
}