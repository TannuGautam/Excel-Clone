

for(let i = 0; i < allCells.length; i++)
{
    //to save the user entered value into db for later use

    allCells[i].addEventListener("blur",function()
    {
        let data = allCells[i].innerText;

        let address = addressInput.value;

        // let ricidObj = getRIDCIDfromAddress(address);

        let rid = allCells[i].getAttribute("rid");

        let cid = allCells[i].getAttribute("cid");

        sheetDB[rid][cid].value = data;


    })
}


formulaBar.addEventListener("keydown", function (e)
{
    
    
    if(e.key === "Enter" && formulaBar.value)
    {
        //user input formula
        console.log(formulaBar.value);

        let cFormula = formulaBar.value;

        let value = evaluateFormula(cFormula);

        setCell(value,cFormula);

        
    }
})

function evaluateFormula(formula)
{
    //(A1 + A2)
    //split 
    //[(,A1,+,A2)]

    let formulaTokens = formula.split(" ");

    for(let i = 0; i < formulaTokens.length; i++)
    {
        let ascii = formulaTokens[i].charCodeAt(0);

        if(ascii >= 65 && ascii <= 90)
        {
            let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);

            let value = sheetDB[rid][cid].value;

            formulaTokens[i] = value;
        }
    }
    //[(,10,+,20)]

    let evaluatedFormula = formulaTokens.join(" ");

    //(10 + 20)
    //stack
    return eval(evaluatedFormula);
}

function setCell(value,formula)
{
    let uiCellElement = findUICellElement();

    uiCellElement.innerText = value;

    //db update

    let { rid, cid } = getRIDCIDfromAddress(addressInput.value);

    sheetDB[rid][cid].value = value;

    console.log(value);

    sheetDB[rid][cid].formula = formula;

    console.log(formula);
}
















