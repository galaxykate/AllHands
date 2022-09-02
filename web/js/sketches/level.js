function obsticale(initX, initY, width, height, world, color, goal)
{
	var obsticale = new Platform(initX, initY, width, height, world, color, goal)
	return obsticale
}

function createLevel(world)
{
    var gameObjectsLocal = []
    gameObjectsLocal.push(obsticale(5, 15, 3, 1, world,'red', false));
    gameObjectsLocal.push(obsticale(10, 12, 3, 1, world,'pink', false));
    gameObjectsLocal.push(obsticale(15, 8, 3, 1, world, 'blue', false));
    gameObjectsLocal.push(obsticale(20, 3, 3, 1, world,'green', true));
    return gameObjectsLocal
}

function win()
{
    console.log("You win!")
}

function sortFunction(a, b){
    if (a[0] === b[0]) {
        return 0;

    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}