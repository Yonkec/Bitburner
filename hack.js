/** @param {NS} ns */
export async function main(ns) {

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