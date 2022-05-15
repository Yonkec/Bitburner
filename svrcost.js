/** @param {NS} ns */
export async function main(ns) {

    for ( let i = 1; i < 21; i++){
        ns.tprint("r: " + i + "  One: " + ns.getPurchasedServerCost(2**i).toLocaleString('en-US') 
        + "  ReqCash: " + (ns.getPurchasedServerCost(2**i)*25).toLocaleString('en-US'));
    }


}