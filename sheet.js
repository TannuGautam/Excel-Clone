let addSheetBtn = document.querySelector(".sheetadd");

let sheetList = document.querySelector(".sheet-tab-container");

let firstSheet = document.querySelector(".sheet-tab");

let sheetDB = [];

let sheetArray = [];

firstSheet.addEventListener("click", makeMeActive);

firstSheet.click();

addSheetBtn.addEventListener("click", function()
{
    //create sheet
    let allSheets = document.querySelectorAll(".sheet-tab");

    let lastSheet = allSheets[allSheets.length - 1];

    let lastidx = lastSheet.getAttribute("idx");

    lastidx = Number(lastidx);

    let newSheet = document.createElement("div");

    newSheet.setAttribute("class", "sheet-tab");

    newSheet.setAttribute("idx", `${lastidx + 1}`);

    newSheet.innerHTML = "Sheet" + `${lastidx + 2}`;

    sheetList.appendChild(newSheet);

    for(let i = 0; i < allSheets.length; i++)
    {
        allSheets[i].classList.remove("active");
    }

    newSheet.classList.add("active");

    //new sheet create
    createSheet();

    sheetDB = sheetArray[lastidx + 1];

    newSheet.addEventListener("click", makeMeActive);
})

function makeMeActive(e)
{
    let sheet = e.currentTarget;

    let Allsheets = document.querySelectorAll(".sheet-tab");

    for(let i = 0; i < Allsheets.length; i++)
    {
        Allsheets[i].classList.remove("active");
    }

    sheet.classList.add("active");

    let idx = sheet.getAttribute("idx");

    if(!sheetArray[idx])
    {
        //ui has idx 
        //only when one intialize workbook
        createSheet();
    }

    //current set
    sheetDB = sheetArray[idx];
    setUI();
    
}

function createSheet()
{
    let newDB = [];

    for(let i = 0; i < rows; i++)
    {
        let row = [];

        for(let j = 0; j < cols; j++)
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
                children: []
            }

            let elem = document.querySelector(`.input-cell[rid = "${i}"][cid = "${j}"]`);

            elem.innerText = "";

            row.push(cell);
        }

        newDB.push(row);

        // console.log(sheetDB)

    }

    sheetArray.push(newDB);
}

function setUI()
{
    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < cols; j++)
        {

            let elem = document.querySelector(`.input-cell[rid = "${i}"][cid = "${j}"]`);

            let value = sheetDB[i][j].value;

            elem.innerText = value;
        }
    }
}