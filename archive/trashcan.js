switch(hivelvl){
    case 8:
        await hivemind(ns, goal, hivelvl, 1000000, servers);
        break;
    case 11:
        await hivemind(ns, goal, hivelvl, 5000000, servers);
        break;
    case 14:
        await hivemind(ns, goal, hivelvl, 10000000, servers);
        break;
    case 17:
        await hivemind(ns, goal, hivelvl, 50000000, servers);
        break;
    case 20:
        await hivemind(ns, goal, hivelvl, 100000000, servers);
        break;
    default:
        break;
}

