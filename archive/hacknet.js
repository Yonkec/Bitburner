/** @param {NS} ns */
export async function main(ns) {
	
	//script to buy hacknet servers, haven't really touched this in a while since these are mostly worthless
	//will need to revisit this and optimize the purchasing process once this is relevant.
	let babies = ns.hacknet.numNodes();

	function myMoney() {
		return ns.getServerMoneyAvailable("home");
	}

	while (true) {
		//limits the script to only buying 21 nodes, diminishing returns after that imo
		if (ns.hacknet.getPurchaseNodeCost() < myMoney() && ns.hacknet.numNodes() < 21) {
			let res = ns.hacknet.purchaseNode();
			babies++;
		} 

		for (let i = 0; i < babies; i++) {
			//I felt that RAM is the biggest priority so was buying that nearly immediately
			if (ns.hacknet.getRamUpgradeCost(i, 1) < myMoney()) {
				ns.hacknet.upgradeRam(i, 1);
			}
			//levels were great early but quickly became overpriced so kicked this down a lot
			if (ns.hacknet.getLevelUpgradeCost(i, 10) < myMoney() * .15) {
				ns.hacknet.upgradeLevel(i, 10);
			}
			//cores are ok but usually the last thing to max out
			if (ns.hacknet.getCoreUpgradeCost(i, 1) < myMoney() * .2) {
				ns.hacknet.upgradeCore(i, 1);
			}
		}
		await ns.sleep(500);
		//should kill the script once everything is maxed out
		if (ns.hacknet.numNodes() == 24 && ns.hacknet.getNodeStats(23).level == 200) {
			break
		}
	}

}