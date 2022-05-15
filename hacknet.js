/** @param {NS} ns */
export async function main(ns) {

	let babies = ns.hacknet.numNodes();

	function myMoney() {
		return ns.getServerMoneyAvailable("home");
	}

	while (true) {

		if (ns.hacknet.getPurchaseNodeCost() < myMoney() && ns.hacknet.numNodes() < 21) {
			let res = ns.hacknet.purchaseNode();
			babies++;
		} 

		for (let i = 0; i < babies; i++) {

			if (ns.hacknet.getRamUpgradeCost(i, 1) < myMoney()) {
				ns.hacknet.upgradeRam(i, 1);
			}

			if (ns.hacknet.getLevelUpgradeCost(i, 10) < myMoney() * .15) {
				ns.hacknet.upgradeLevel(i, 10);
			}

			if (ns.hacknet.getCoreUpgradeCost(i, 1) < myMoney() * .2) {
				ns.hacknet.upgradeCore(i, 1);
			}
		}
		await ns.sleep(500);

		if (ns.hacknet.numNodes() == 24 && ns.hacknet.getNodeStats(23).level == 200) {
			break
		}
	}

}