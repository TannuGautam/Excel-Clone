let colContainer = document.querySelector(".col_container");

let rowContainer = document.querySelector(".row_container");

let inputCellContainer = document.querySelector(".input-cells-container");

let rows = 100;

let cols = 26;

let formulaBar = document.querySelector(".formula-input");

let alignIcon = document.querySelectorAll(".align-icon");

let biuToggle = document.querySelectorAll(".style-icon");

let inputCell = document.querySelectorAll(".input-cell");

for(let i = 0; i < cols; i++)
{
    let colBox = document.createElement("div");

    colBox.innerText = String.fromCharCode(65 + i);

    colBox.setAttribute("class","column-name");

    colContainer.appendChild(colBox);
}

for(let i = 0; i < rows; i++)
{
    let rowBox = document.createElement("div");

    rowBox.innerText = i + 1 ;

    rowBox.setAttribute("class","row-name");

    rowContainer.appendChild(rowBox);
}

//grid
for(let i = 0; i < rows; i++)
{
    let row = document.createElement("div");

    row.setAttribute("class", "row");

    for(let j = 0; j < cols; j++)
    {
        let col = document.createElement("div");

        col.setAttribute("class", "input-cell");
  
        col.setAttribute("rid",i);

        col.setAttribute("cid",j);

        col.setAttribute("contenteditable","true");

        row.appendChild(col);
    }

    inputCellContainer.appendChild(row);

}

//active buttons


biuToggle.forEach(biuT => {

    biuT.addEventListener("click", function()
    {
        this.classList.toggle('selected')

    })
})

//scroll
inputCellContainer.addEventListener("scroll", function(){

    let colNameContainer = document.querySelector(".col_container");

    // console.log(this.scrollLeft);
    colNameContainer.scrollLeft = this.scrollLeft;

    let rowContainer = document.querySelector(".row_container");

    rowContainer.scrollTop = this.scrollTop;
})


alignIcon.forEach(aligniconselected => {

    aligniconselected.addEventListener("click", function()
    {
        alignIcon.forEach(aligni => aligni.classList.remove('selected'));

        this.classList.add('selected');
    })
})

// inputCell.forEach(inputcellselected => {

//     inputcellselected.addEventListener("click", function()
//     {
//         let iptcSel = document.querySelector(".input-cell.selected")

//         iptcSel.forEach(aligni => aligni.classList.remove('selected'));

//         this.classList.add('selected');

//         console.log("tannu")
//     })
// })









