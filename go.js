/** @param {NS} ns */
import { serverList } from "./libs/scan.js";
import { pwn } from "./libs/pwn.js";
import { hivemind } from "./libs/hivemind.js";
import { hiveslay } from "libs/hiveslay.js";
import { hacknet } from "libs/hacknet2.js"; 

export async function main(ns) {

    await hacknet(ns);
    
    //determine the goal of the iteration
    let goal = "";
    do {
        goal = await ns.prompt("Hack Share or Regrow?", { type: "text" });
    } while (goal != "h" && goal != "s"  && goal != "r" && goal != "q");

	let servers = await serverList(ns);
	
    //add in more intelligence to determine the target servers
    let victim = "joesguns"
    let level = ns.getHackingLevel();
    let tier = 1, hivelvl = 0;
    let cashgoal = 1000000;

    if (ns.getPurchasedServers().length == 0){hivelvl = 8;}

    if (goal== "r"){
        await hivemind(ns, "h", hivelvl, 50000000, servers);
        return 1;
    }

    while(goal == "h"){

        level = ns.getHackingLevel();

        if (tier <= level && tier < 3200){
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
        ns.tprint(hivelvl);
        if(hivelvl == 23){ return 1;}   
        await ns.sleep(60000);
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