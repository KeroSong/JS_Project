let myHeading = document.querySelector('h1');
myHeading.textContent = 'Bonjour, monde !';


function displayTab(x,y){
    console.log(x)
    console.log(y)
    $('.vie').empty()
    data = []
    clearTimeout(myTimeOut)
    let tab = newTab(x,y)
    for ( let i = 0; i < x ; i++) {
        genDiv('.vie', '<div id="row'+i+'" class="d-flex"></div>')
        for ( let j = 0; j < y ; j++) {
            //rcolor
            let rcolor = parseInt((i*255/x))
            //gcolor
            let gcolor = parseInt((j*255/y))
            let styleStr = 'style="background-color: rgb('+rcolor+', '+gcolor+',0)"'
            let OnClick = 'Onclick = "inverse('+i+','+j+')"'
            let cl = '';
            ( tab[i][j] ) ? cl = 'alive' : cl = 'dead';
            genDiv('#row'+i, '<div class="'+cl+'" id="cell'+i+'_'+j+'" '+ styleStr +'  '+OnClick+' ></div>')
        }
    }
    data = tab    
}

function foo(vari) {
    globalThis.vari =vari;
}

function genDiv(pointeur, content){
    $(pointeur).append(content)
}

function isAlive(CLEAR = false){
    if (CLEAR) {
        clearTimeout(myTimeOut)
    }
    let DataTmp = data
    let rowMax = data.length
    let elemInfo = data
    var i,j,voisinsInfo = []
    for ( i = 0; i < data.length ; i++) {
        let colMax = data[i].length
        voisinsInfo[i]=[]
        for ( j = 0; j < data[i].length ; j++) {
            let aliveMax = 0;
            let tmpArray = [
                (i-1 >= 0 && j-1 >= 0) ?  data[i-1][j-1] : false,
                (i-1 >= 0) ?    data[i-1][j] : false,
                (i-1 >= 0 && j+1 < colMax) ?  data[i-1][j+1] : false,
                (j-1 >= 0) ?    data[i][j-1] : false,
                (j+1 < colMax) ?    data[i][j+1] : false,
                (i+1 < rowMax && j-1 >= 0) ?  data[i+1][j-1] : false,
                (i+1 < rowMax) ?    data[i+1][j] : false,
                (i+1 < rowMax && j+1 < colMax) ?  data[i+1][j+1] : false
            ]
            aliveMax = tmpArray.filter( (i) => {return i}).length
            elemInfo[i][j] =  data[i][j]
            voisinsInfo[i][j] = aliveMax
        }
    }

    for (let i = 0; i < data.length ; i++) {
        for (let j = 0; j < data[i].length ; j++) {            
            if([2,3].includes(voisinsInfo[i][j])&& elemInfo[i][j] || !elemInfo[i][j] && voisinsInfo[i][j] == 3){
                DataTmp[i][j] = true
                $(`#cell${i}_${j}`).removeClass("dead").addClass("alive")
            } 
            else{
                DataTmp[i][j] = false
                $(`#cell${i}_${j}`).removeClass("alive").addClass("dead")
            }
        }
    }
    data = DataTmp
    myTimeOut = setTimeout(() => {
        if (data.length > 0){
            isAlive()
        }
    }, 50)
}

function newTab(x,y){
    let i, j, k, newArray = []
    for (i=0; i<x;i++){
        newArray.push([])
        
        for(j=0;j<y;j++){
            k = Math.round(Math.random());
            if(k>=1){
                newArray[i].push(true) 
            }
            else{
                newArray[i].push(false) 
            }
        }
    }
    return newArray
}

function displayVal(){
    x = $("#ligne").val();
    y = $("#colonne").val();
    displayTab(x,y);
}

function inverse(i,j){
    console.log(data[i][j])
    if(data[i][j]){
        console.log('die')
        $(`#cell${i}_${j}`).removeClass("dead").addClass("alive")
        data[i][j] = false
    }
    else{
        $(`#cell${i}_${j}`).removeClass("alive").addClass("dead")
        data[i][j] = true
        console.log('alive')
    }
}

globalThis.data = []
globalThis.myTimeOut;
globalThis.x;
globalThis.y;

isAlive()

// x et y --> displayTab(x,y) --> newTab(x,y)