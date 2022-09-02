function obsticale(initX, initY, width, height, world, color, goal)
{
	var obsticale = new Platform(initX, initY, width, height, world, color, goal)
	return obsticale
}

function createLevel(world)
{
    var gameObjectsLocal = []
    gameObjectsLocal.push(obsticale(5, 15, 3, 1, world, 'red', false));
    gameObjectsLocal.push(obsticale(10, 12, 3, 1, world, 'pink', false));
    gameObjectsLocal.push(obsticale(15, 8, 3, 1, world, 'blue', false));
    gameObjectsLocal.push(obsticale(20, 3, 3, 1, world, 'green', true));
    return gameObjectsLocal
}

function win(p)
{
    console.log("You win!")
    p.textSize(32);
    p.text('You Win!', 3, 15);
    p.fill(0, 102, 153);
    p.text('You Win!', 3, 20);
    p.fill(0, 102, 153, 51);
    p.text('You Win!', 3, 23);
}

function sortFunction(a, b){
    if (a[0] === b[0]) {
        return 0;

    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}