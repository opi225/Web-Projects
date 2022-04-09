function dtr(degrees){
    return degrees * (Math.PI/180);
}

//returns one of the possible values for the divergence variable
function randomDeg(){
    let deg = Math.floor(Math.random() * 5);
    switch(deg)
    {
        case 0:
            return 100;
        case 1:
            return 137.1;
        case 2:
            return 137.5;
        case 3:
            return 137.9;
        case 4:
            return 200;
    }
}

//Returns one of the possible values that the dots can increase by
function randomInc(){
    let inc = Math.floor(Math.random() * 3);
    switch(inc)
    {
        case 0:
            return 0;
        case 1: 
            return 1000;
        case 2:
            return 500;
    }
}

//returns a random number between 1 and the given integer
function random(int){
    return Math.floor(Math.random() * int) + 1;
}

//Compares to variables and returns true if they are
function compare(thing1, thing2){
    if(thing1 == thing2){
        return true;
    }
    else{
        return false;
    }
}

//takes in all of the values to be compared, and sees if they are all equal. Returns a boolean depending on the result.
function comparePhy(div1, div2, size1, size2, inc1, inc2, space1, space2){
    let phy1 = [div1, size1, inc1, space1];
    let phy2 = [div2, size2, inc2, space2];
    let matches = 0;
    for(let i = 0; i < 4; i++)
    {
        if(compare(phy1[i], phy2[i])){
            matches++;
        }

    }
    if(matches == 4)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export{dtr, randomDeg, randomInc, random, comparePhy}