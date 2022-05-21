/** @param {NS} ns */
import { serverList } from "dev/scan.js";

export async function main(ns) {
    ns.tprint(serverList(ns));
}