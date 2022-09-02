function obsticale(initX, initY, width, height, world)
{
	var obsticale = new Platform(initX, initY, width, height, world)
	return obsticale
}

function createLevel(world)
{
    var gameObjectsLocal = []
    gameObjectsLocal.push(obsticale(5, 15, 3, 1, world));
    gameObjectsLocal.push(obsticale(10, 12, 3, 1, world));
    gameObjectsLocal.push(obsticale(15, 8, 3, 1, world));
    gameObjectsLocal.push(obsticale(20, 3, 3, 1, world));
    return gameObjectsLocal
}