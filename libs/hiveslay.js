/** @param {NS} ns */
export async function hiveslay(ns) {
    // does nothing excet kill/sell all purchased servers so new ones can be purchased.
    let servers = ns.getPurchasedServers();
    
        for (let k in servers) 
        {
            ns.killall(servers[k]);
            ns.deleteServer(servers[k]);
        }    
    }