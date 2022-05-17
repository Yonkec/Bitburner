/** @param {NS} ns */
export async function main(ns) {

    //Using this to dump hosted server costs until I finish automating the purchasing in the main process.
    for ( let i = 1; i < 21; i++){
        ns.tprint("r: " + i + "  One: " + ns.getPurchasedServerCost(2**i).toLocaleString('en-US') 
        + "  ReqCash: " + (ns.getPurchasedServerCost(2**i)*25).toLocaleString('en-US'));
    }


}