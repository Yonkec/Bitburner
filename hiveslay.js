/** @param {NS} ns */
export async function main(ns) {
    //really does nothing excet kill/sell all purchased servers.
    //need to integrate this into the hivemind process and let a prompt ask if you want to sell in that iteration.
    let servers = ns.getPurchasedServers();
    
        for (let k = 0; k < servers.length; k++) {
            ns.killall(servers[k]);
            ns.deleteServer(servers[k]);
        }
    
        ns.tprint("deletion.")
    
    }