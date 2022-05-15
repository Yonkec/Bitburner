/** @param {NS} ns */
export async function main(ns) {

    let servers = ns.getPurchasedServers();
    
        for (let k = 0; k < servers.length; k++) {
            ns.killall(servers[k]);
            ns.deleteServer(servers[k]);
        }
    
        ns.tprint("deletion.")
    
    }