let boldBtn = document.querySelector(".bold");

let underlineBtn = document.querySelector(".underline");

let italicBtn = document.querySelector(".italic");

let fontSizeEl = document.querySelector(".font-size");

let sheetDB = [];

for(let i = 0; i < 100; i++)
{
    let row = [];

    for(let j = 0; j < 26; j++)
    {
        let cell = {
            bold : "normal",
            italic: "normal",
            underline: "none",
            fontsize: "16",
            hAlign: "center",
            fontFamily: "sans-serif",
            color: "black",
            bColor: "none",
            value: "",
            formula: "",
        }
        row.push(cell);
    }

    sheetDB.push(row);

    // console.log(sheetDB)

}

//address input
let allCells = document.querySelectorAll(".input-cells-container .input-cell")

let addressInput = document.querySelector(".selected-cell")

for(let i = 0; i < allCells.length; i++)
{
    allCells[i].addEventListener("click", function()
    {
        let rid = allCells[i].getAttribute("rid");

        let cid = allCells[i].getAttribute("cid");

        rid = Number(rid);

        cid = Number(cid);

        let address = `${String.fromCharCode(65 + cid)}${rid + 1}`

        

        addressInput.value = address;

        // console.log(addressInput.value);

        addressInput.innerHTML = addressInput.value;

        let cellObject = sheetDB[rid][cid];

        if(cellObject.bold == "normal")
        {
            boldBtn.classList.remove("selected");
        }
        else
        {
            boldBtn.classList.add("selected");
        }
        if(cellObject.italic == "normal")
        {
            italicBtn.classList.remove("selected");
        }
        else
        {
            italicBtn.classList.add("selected");
        }
        if(cellObject.underline == "none")
        {
            underlineBtn.classList.remove("selected");
        }
        else
        {
            underlineBtn.classList.add("selected");
        }
        
        // if(cellObject.fontsize = "16")
        // {
        //     fontSizeEl.fontSize = "val";
        // }
        // else
        // {
        //     fontSizeEl.fontSize = "16";
        // }
    
    })
}

allCells[0].click();

boldBtn.addEventListener("click", function()
{

    let uiCellElement = findUICellElement();

    let cid = uiCellElement.getAttribute("cid");

    let rid = uiCellElement.getAttribute("rid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.bold == "normal")
    {
        uiCellElement.style.fontWeight = "bold";

        boldBtn.classList.add("selected");

        cellObject.bold = "bold";
    }
    else
    {
        boldBtn.classList.remove("selected");

        uiCellElement.style.fontWeight = "normal";

        cellObject.bold = "normal";
    }

    
})

italicBtn.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    let cid = uiCellElement.getAttribute("cid");

    let rid = uiCellElement.getAttribute("rid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.italic == "normal")
    {
        uiCellElement.style.fontStyle = "italic";

        italicBtn.classList.add("selected");

        cellObject.italic = "italic";
    }
    else
    {
        italicBtn.classList.remove("selected");
        
        uiCellElement.style.fontStyle = "normal";

        cellObject.italic = "normal";
    }
    
})

underlineBtn.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    let cid = uiCellElement.getAttribute("cid");

    let rid = uiCellElement.getAttribute("rid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.underline == "none")
    {
        uiCellElement.style.textDecoration = "underline";

        underlineBtn.classList.add("selected");

        cellObject.underline = "underline";
    }
    else
    {
        underlineBtn.classList.remove("selected");
        
        uiCellElement.style.textDecoration = "none";

        cellObject.underline = "none";
    }

})

//font size


fontSizeEl.addEventListener("change", function()
{
    val = fontSizeEl.value

    let uiCellElement = findUICellElement();
    
    uiCellElement.style.fontSize = val + "px";

})

//alignment

let leftAlign = document.querySelector(".left");

leftAlign.addEventListener("click", function()
{

    let uiCellElement = findUICellElement();
    
    uiCellElement.style.textAlign = "left";
})

let rightAlign = document.querySelector(".right");

rightAlign.addEventListener("click", function()
{

    let uiCellElement = findUICellElement();
    
    uiCellElement.style.textAlign = "right";
})

let centerAlign = document.querySelector(".center");

centerAlign.addEventListener("click", function()
{

    let uiCellElement = findUICellElement();
    
    uiCellElement.style.textAlign = "center";
})

//textColor
let textColor = document.querySelector(".text-color-picker");

textColor.addEventListener("change",function()
{
    let uiCellElement = findUICellElement();
    
    uiCellElement.style.color = textColor.value; 
})

//background color

let backgroundColorSelect = document.querySelector(".background-color-picker");

backgroundColorSelect.addEventListener("change",function()
{
    let uiCellElement = findUICellElement();
    
    uiCellElement.style.backgroundColor = backgroundColorSelect.value; 
})

//font family

let fontFamilyElement = document.querySelector(".font-family");

fontFamilyElement.addEventListener("change", function()
{
    let list = fontFamilyElement.value;

    let uiCellElement = findUICellElement();
    
    uiCellElement.style.fontFamily = list; 
})

function getRIDCIDfromAddress(address)
{
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return {"rid" : rid, "cid" : cid};
}

function findUICellElement()
{
    let address = addressInput.value;

    let ricidObj = getRIDCIDfromAddress(address);

    let rid = ricidObj.rid;

    let cid = ricidObj.cid;

    let uiCellElement = document.querySelector(`.input-cell[rid = "${rid}"][cid = "${cid}"]`);

    // console.log(uiCellElement);
    
    return uiCellElement;

    

}