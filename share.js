/** @param {NS} ns */
export async function main(ns) {

	//basic function to share on servers, totally manual for now as this hasn't been too useful in early BNs
	while (true) {
		await ns.share();
	}

}