let boldBtn = document.querySelector(".bold");

let underlineBtn = document.querySelector(".underline");

let italicBtn = document.querySelector(".italic");

boldBtn.addEventListener("click", function()
{

    let uiCellElement = findUICellElement();

    uiCellElement.style.fontWeight = "bold";
})

italicBtn.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    uiCellElement.style.fontStyle = "italic";
})

underlineBtn.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    uiCellElement.style.textDecoration = "underline";
})

//font size
let fontSizeEl = document.querySelector(".font-size");

fontSizeEl.addEventListener("change", function()
{
    let val = fontSizeEl.value;

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

    return uiCellElement;

}