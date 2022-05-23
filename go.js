/** @param {NS} ns */
import { serverList } from "./libs/scan.js";
import { pwn } from "./libs/pwn.js";
import { hivemind } from "./libs/hivemind.js";
import { hiveslay } from "libs/hiveslay.js";    

export async function main(ns) {
    
    //determine the goal of the iteration
    let goal = "";
    do {
        goal = await ns.prompt("Hack or Share?", { type: "text" });
    } while (goal != "h" && goal != "s"  && goal != "x");

	let servers = await serverList(ns);
	
    //add in more intelligence to determine the target servers
    let victim = "joesguns"
    let level = ns.getHackingLevel();
    let tier = 1, hivelvl = 0;
    let cashgoal = 1000000;

    if (ns.getPurchasedServers().length == 0){hivelvl = 8;}

    while(goal == "h"){

        level = ns.getHackingLevel();

        if (tier <= level && tier < 1200){
            await pwn(ns, servers, victim);
            tier += level;
        }   
      
        if (ns.getPurchasedServers().length == 25){
            hivelvl = Math.log(ns.getServerMaxRam("whale")) / Math.log(2) + 3; 
        }
        if((ns.getPurchasedServerCost(2**hivelvl) * 25) < ns.getServerMoneyAvailable("home")){
            await hiveslay(ns);
            await hivemind(ns, goal, hivelvl, cashgoal, servers);
            cashgoal *= 4;
        }
        await ns.sleep(10000);
    }

    if (goal == "s") {
        //update the server list to also include purchased servers
        let servers = await serverList(ns,"home",[],false);
        //run over all controlled servers to share the wealth
        for (let s in servers){
            ns.killall(servers[s]);

            if(ns.getServerMaxRam(servers[s]) > 8){
                await ns.scp("share.js", servers[s]);
                ns.exec("share.js", servers[s], Math.floor(ns.getServerMaxRam(servers[s]) / ns.getScriptRam("share.js")));
            }
        }
        ns.tprint("Shared.");
        return 1;
    }
}