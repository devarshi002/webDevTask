//make varible
let count = 0;

//create varible for each element as well as for button
const el= document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const resetBtn = document.getElementById("reset");


//update ui

function updataCount() {
    el.innerText=count;
}

//increment

incBtn.addEventListener("click",()=>{
    count++;
    updataCount()
});

decBtn.addEventListener("click", ()=>{
    count--;
    updataCount();
})

resetBtn.addEventListener("click",()=>{
    count=0;
    updataCount()
})