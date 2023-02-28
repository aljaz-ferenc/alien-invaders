 function levelOne (){
    const row1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const row2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const row3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const row4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    return [row1, row2, row3, row4]
 }
function levelTwo(){
    const row1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    const row2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    const row3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const row4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const row5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


    return [row1, row2, row3, row4, row5]
}
function levelThree(){
    const row1 = [2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2]
    const row2 = [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]
    const row3 = [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]
    const row4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const row5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    return [row1, row2, row3, row4, row5]
}
function levelFour(){
    const row1 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    const row2 = [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]
    const row3 = [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]
    const row4 = [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]
    const row5 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    
    return [row1, row2, row3, row4, row5]
}

export {levelOne, levelTwo, levelThree, levelFour}