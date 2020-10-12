(function(){
var calendarDaysHolder = document.querySelector(".calendar-days-days"),
    yearHolder = document.querySelector(".year-header"),
    monthHolder = document.querySelector(".month-header"),
    dayElement = document.querySelectorAll(".calendar-days-days span"),
    currentDate = new Date,
    df = document.createDocumentFragment(),
    monthNames = ["January","February","March","April", "May","June","July","August","September","October","November","December"],
    prevYear = document.querySelector(".year-prev"),
    nextYear = document.querySelector(".year-next"),
    prevMonth = document.querySelector(".month-prev"),
    nextMonth = document.querySelector(".month-next");

//Ustaw wejsciowy kalendarz
function setCurrentDate() { 
    yearHolder.appendChild(document.createTextNode(currentDate.getFullYear()));
    monthHolder.appendChild(document.createTextNode(monthNames[currentDate.getMonth()]))
}

//ustaw kalendarz dla danej daty
function setUpCalendar(date) {
    
    var firstDayofMonth = new Date(date.getFullYear(),date.getMonth()),
        lastDayofMonth = new Date(date.getFullYear(),date.getMonth()+1)
        polishDays = [6,0,1,2,3,4,5];

    lastDayofMonth.setDate(lastDayofMonth.getDate()-1);

    for (let i = 1; i < 43; i++) {
        var newSpan = document.createElement("span");

        if ((i- polishDays[firstDayofMonth.getDay()] > 0) && (lastDayofMonth.getDate()+1 > i - polishDays[firstDayofMonth.getDay()])){
            newSpan.appendChild(document.createTextNode(i - polishDays[firstDayofMonth.getDay()]));  
            newSpan.classList.add("day-in-calendar");
        }    
            
        if (i - polishDays[firstDayofMonth.getDay()]=== date.getDate()) {
            newSpan.classList.add("picked");
        }        
        
        if(i - polishDays[firstDayofMonth.getDay()]  < lastDayofMonth.getDate() +(7-lastDayofMonth.getDay()+1)) {
            if ((i- polishDays[firstDayofMonth.getDay()] > 0) && i%7 ===1 &&newSpan.textContent =="") {
                break;
            }
            df.appendChild(newSpan);  
        }
                    
    }

    calendarDaysHolder.appendChild(df);
    addEventsToDays("click",markAsPicked);
}

//dodaj event dla kazdego dnia kalendarza
function addEventsToDays(tp,fn) {

    var days = document.querySelectorAll(".day-in-calendar");

    days.forEach(function(day) {
        day.addEventListener(tp,fn,false);
    })
}

//pod klinieciu oznacz dzien na czerwono
function markAsPicked() {
    var days = document.querySelectorAll(".day-in-calendar");
    days.forEach(function(element) {
        element.classList.remove("picked");
    });
    this.classList.add("picked");
    currentDate.setDate(this.textContent);
}

//wyzeruj daty
function eraseDays() {
    var days = document.querySelectorAll(".calendar-days-days span");

    days.forEach(function(element) {
        calendarDaysHolder.removeChild(element);
    });
    currentDate.setDate(1);
}

//wyczysc ustawienia dla zmiany roku
function eraseForYears() {
    currentDate.setFullYear(yearHolder.textContent);
    currentDate.setMonth(0);
    monthHolder.textContent = monthNames[0];
    eraseDays();
    setUpCalendar(currentDate);
}
//wyszysc ustawienia dla zmiany miesiaca
function eraseForMonths() {
    eraseDays();
    setUpCalendar(currentDate);
}

//ustaw eventy dla glownych sliderow
function setUpSliders(){
    prevYear.addEventListener("click",function() {
        yearHolder.textContent--;      
        eraseForYears();   
    }, false);
    nextYear.addEventListener("click",function() {
        yearHolder.textContent++;
        eraseForYears();
    }, false);
    prevMonth.addEventListener("click",function () {
        if (currentDate.getMonth()!==0) {
            monthHolder.textContent = monthNames[currentDate.getMonth()-1]; 
            currentDate.setMonth(currentDate.getMonth()-1);
        }else{
            monthHolder.textContent = monthNames[11];
            currentDate.setMonth(11);
            yearHolder.textContent--;
            currentDate.setFullYear(yearHolder.textContent);
        }
        eraseForMonths();    
    },false);  

    nextMonth.addEventListener("click",function () {
        if (currentDate.getMonth()!==11) {
            monthHolder.textContent = monthNames[currentDate.getMonth()+1]; 
            currentDate.setMonth(currentDate.getMonth()+1);
        }else{
            monthHolder.textContent = monthNames[0];
            currentDate.setMonth(0);
            yearHolder.textContent++;
            currentDate.setFullYear(yearHolder.textContent);
        }
        eraseForMonths();
    },false);  

}

//przygotuj kalendarz
function loadCalendar() {
    setCurrentDate();
    setUpCalendar(currentDate);
    addEventsToDays("click",markAsPicked);
    setUpSliders();   
}

loadCalendar();
})();


