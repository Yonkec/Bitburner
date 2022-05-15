/** @param {NS} ns */
export async function main(ns) {

    let goal = "";
    do {
        goal = await ns.prompt("Hack or Share?", { type: "text" });
    } while (goal != "h" && goal != "s");

    let exponent = 0;
    let ratios = [.6, .25, .1];
    let file = "botnet.txt";
    let cashgoal = 5000000000;
    const victims = JSON.parse(ns.read("Servers.txt"));
    await ns.sleep(1000);
    const scriptz = ["grow.js", "weaken.js", "hack.js"];

    let pServMax = ns.getPurchasedServerLimit();
    let servers = ns.getPurchasedServers();

    if (servers.length != 25) {

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
    let kv = 0;
    let kmax = victims.length - 3;
    ns.tprint(kmax);


    for (let k = 0; k < servers.length; k++) {
        let servMaxRam = ns.getServerMaxRam(servers[k]);

        if (goal == "h") {
            while (ns.getServerMaxMoney(victims[kv]) < cashgoal || ns.hasRootAccess(victims[kv]) == false || ns.hackAnalyzeChance(victims[kv]) < .5) {
                kv++;
                if (kv == kmax) {
                    kv = 1;
                }
            }
            await ns.sleep(100);
            ns.killall(servers[k]);

            for (let l = 0; l < scriptz.length; l++) {
                await ns.scp(scriptz[l], servers[k]);
                ns.exec(scriptz[l], servers[k], Math.ceil((servMaxRam * ratios[l]) / ns.getScriptRam(scriptz[l])), victims[kv]);
            }

            ns.tprint(servers[k] + " MaxMon: " + ns.getServerMaxMoney(victims[kv]).toLocaleString('en-US') + " // " + victims[kv]);
            kv++;
        }

        else if (goal == "s") {
            ns.killall(servers[k]);
            await ns.scp("share.js", servers[k]);
            ns.exec("share.js", servers[k], Math.floor(servMaxRam / ns.getScriptRam("share.js")));
        }

    }
}