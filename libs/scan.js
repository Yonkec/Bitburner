/** @param {NS} ns */
export async function serverList(ns,server="home", servers=[], filter=true){

    if (servers.indexOf(server) == -1){
        servers.push(server);
        ns.scan(server).forEach(server => serverList(ns, server, servers));
    }
    servers = servers.filter(blacklist);

    if(filter){servers = servers.filter(whalelist);}


    function blacklist(server){
        return (server != "home" && server != "."  && server != "darkweb");
    }

    function whalelist(server){
        return (!server.includes("whale"));
    }


    return servers;
}

