

for(let i = 0; i < allCells.length; i++)
{
    //to save the user entered value into db for later use

    allCells[i].addEventListener("blur",function()
    {
        let data = allCells[i].innerText;

        let address = addressInput.value;

        let rid = allCells[i].getAttribute("rid");

        let cid = allCells[i].getAttribute("cid");

        let cellObject = sheetDB[rid][cid];

        if(cellObject.value == data)
        {
            return;
        }

        if(cellObject.formula)
        {
            removeFormula(cellObject,address);
            formulaBar.value = "";
        }
       
        cellObject.value = data;

        updateChildren(cellObject);
    })
}

function removeFormula(cellObject, myName)
{
    let formula = cellObject.formula;

    let formulaTokens = formula.split(" ");

    for(let i = 0; i < formulaTokens.length; i++)
    {
        let ascii = formulaTokens[i].charCodeAt(0);

        if(ascii >= 65 && ascii <= 90)
        {
            let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);

            let parentObj = sheetDB[rid][cid];

            let idx = parentObj.children.indexOf(myName);

            parentObj.children.spilce(idx, 1);
        }
    }

    cellObject.formula = "";
}

formulaBar.addEventListener("keydown", function (e)
{
    
    
    if(e.key === "Enter" && formulaBar.value)
    {
        //user input formula

        let cFormula = formulaBar.value; //currentFormula

        let address = addressInput.value;

        let { rid, cid } = getRIDCIDfromAddress(address);

        let cellObject = sheetDB[rid][cid];

        if(cFormula != cellObject.formula)
        {
            removeFormula(cellObject, address);
        }

        let value = evaluateFormula(cFormula);

        setCell(value,cFormula);

        setParentCHArray(cFormula, address);

        updateChildren(cellObject);
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

        console.log(ascii)

        if(ascii >= 65 && ascii <= 90)
        {
            let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);

            let value = sheetDB[rid][cid].value;

            if(value == "")
            {
                value = 0;
            }

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

    sheetDB[rid][cid].formula = formula;

}

function setParentCHArray(formula, chAddress)
{
    //( A1 + A2 )
    let formulaTokens = formula.split(" ");

    for(let i = 0; i < formulaTokens.length; i++)
    {
        let ascii = formulaTokens[i].charCodeAt(0);

        if(ascii >= 65 && ascii <= 90)
        {
            let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);

            let parentObj = sheetDB[rid][cid];

            parentObj.children.push(chAddress);
        }
    }
}

function updateChildren(cellObject)
{
    let children = cellObject.children;

    for(let i = 0; i < children.length; i++)
    {
        //children name
        let chAddress = children[i];

        let { rid, cid } = getRIDCIDfromAddress(chAddress);

        let childObj = sheetDB[rid][cid];

        //get formula of children
        let chFormula = childObj.formula;

        let newValue = evaluateFormula(chFromula);

        SetChildrenCell(newValue, chFormula, rid, cid);

        updateChildren(childObj);
    }
}

function SetChildrenCell(value, formula, rid, cid)
{
    let uiCellElement = document.querySelector(`.input-cell[rid = "${rid}"][cid = "${cid}"]`)

    uiCellElement.innerText = value;

    sheetDB[rid][cid].value = value;

}












