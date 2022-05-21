/** @param {NS} ns */
export function serverList(ns, server="home", servers=[]){
    if (servers.indexOf(server) == -1){
        servers.push(server);
        ns.scan(server).forEach(server => serverList(ns, server, servers));
    }
    servers = servers.filter(blacklist);

    function blacklist(server){
        return (server != "."  && server != "darkweb");
    }
    return servers;
}

