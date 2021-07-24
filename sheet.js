let addSheetBtn = document.querySelector(".sheetadd");

let sheetList = document.querySelector(".sheet-tab-container");

let firstSheet = document.querySelector(".sheet-tab");

firstSheet.addEventListener("click", makeMeActive);

//firstSheet.click();

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
    
}

