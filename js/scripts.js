var calendarDaysHolder = document.querySelector(".calendar-days-days"),
    yearHolder = document.querySelector(".year-header"),
    monthHolder = document.querySelector(".month-header"),
    dayElement = document.querySelectorAll(".calendar-days-days span"),
    currentDate = new Date,
    df = document.createDocumentFragment();

//Dodaj przykladowe dni    
function addExampleDays() {
    for (let i = 0; i < 42; i++) {
        var newSpan =document.createElement("span");
        newSpan.appendChild(document.createTextNode(i+1))
        df.appendChild(newSpan);
    }
    calendarDaysHolder.appendChild(df);
}

//Ustaw 
function setCurrentDate() {
    var monthNames = ["January","February","March","April", "May","June","July","August","September","October","November","December"];
    yearHolder.appendChild(document.createTextNode(currentDate.getFullYear()));
    monthHolder.appendChild(document.createTextNode(monthNames[currentDate.getMonth()]))
}

function addEventsToDays(tp,fn) {
    dayElement.forEach(function(day) {
        day.addEventListener(tp,fn,false);;
    })
}



setCurrentDate();
addExampleDays();


