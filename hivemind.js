/** @param {NS} ns */
export async function main(ns) {
    //script to buy purchased servers and then make a rough attempt to spread the hacking around on them.
    // its clearly overkill for most servers but haven't built out the proper information to know hwo to limit each instance
    //to only the necessary threads.

    //need to work on that, and also automating the upgrading of purchased servers as enough money is saved to go from 11 to 15 to 20 ram.

    let goal = "";
    //asks user if we want to send pservs off to hack or share
    do {
        goal = await ns.prompt("Hack or Share?", { type: "text" });
    } while (goal != "h" && goal != "s");

    let exponent = 0;
    let ratios = [.6, .25, .1];
    let file = "botnet.txt";
    let cashgoal = 1000000;
    const victims = JSON.parse(ns.read("Servers.txt"));
    await ns.sleep(1000);
    const scriptz = ["grow.js", "weaken.js", "hack.js"];

    let pServMax = ns.getPurchasedServerLimit();
    let servers = ns.getPurchasedServers();
    
    //buy servers if we don't currently have the max allowed.
    if (servers.length != 25) {
        //asks user to inpit an exponent to dictate how power the pserv is - leaving the cost calculate to the user for now
        //need to optimize this and automate it fully given current phase of the BN
        do {
            exponent = await ns.prompt("Exponent?", { type: "text" });
        } while (exponent > 20 && exponent < 1);

        for (let i = 0; i < pServMax; i++) {
            ns.purchaseServer("whale", (2 ** exponent));
        }
        await ns.write(file, JSON.stringify(servers), "w");
        servers = ns.getPurchasedServers();
    }

    await ns.sleep(3000);
    let kv = 0, kdir = 0;
    let kmax = victims.length - 3;
    ns.tprint(kmax);

    //FOR EACH PURCHASED SERVER iterate through the target lists, ignoring servers deemed too low or that are not yet hacked.
    //if we get to the end of the target list without finding any acceptable servers, turn around and go backwards through the list
    //until we have sent each pserv against some target
    for (let k = 0; k < servers.length; k++) {
        let servMaxRam = ns.getServerMaxRam(servers[k]);

        if (goal == "h") {
            while (ns.getServerMaxMoney(victims[kv]) < cashgoal || ns.hasRootAccess(victims[kv]) == false || ns.hackAnalyzeChance(victims[kv]) < .75) {
                //ns.tprint("kv: " + kv + " kdir: " + kdir + " kmax: " + kmax);
                if (kv == kmax) {kdir = 1;}                   
                else if ( kv == 0){kdir = 0;} 
                if(kdir == 1){kv--;}
                else{kv++;}
            }
            await ns.sleep(1000);
            ns.killall(servers[k]);
            //copy the three scripts to the server then execute at max threads - need to optimize this significantly.
            for (let l = 0; l < scriptz.length; l++) {
                await ns.scp(scriptz[l], servers[k]);
                ns.exec(scriptz[l], servers[k], Math.ceil((servMaxRam * ratios[l]) / ns.getScriptRam(scriptz[l])), victims[kv]);
            }
            //confirmation as to which server is targeted - can get rid of this later.
            ns.tprint(servers[k] + " MaxMon: " + ns.getServerMaxMoney(victims[kv]).toLocaleString('en-US') + " // " + victims[kv]);
            if(kdir == 1){kv--;}
            else{kv++;}
        }
        //if goal is set to share, just set all pservs to share and call it a day
        else if (goal == "s") {
            ns.killall(servers[k]);
            await ns.scp("share.js", servers[k]);
            ns.exec("share.js", servers[k], Math.floor(servMaxRam / ns.getScriptRam("share.js")));
        }

        else{return 0;}

    }
}