/** @param {NS} ns */
import { serverList } from "./libs/scan.js";

export async function main(ns) {
    ns.tprint(serverList(ns));
} 