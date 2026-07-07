/*
=========================================
 HabitTracker Main JavaScript
 Version 1

 Handles:
 - App startup
 - Storage
 - Navigation
 - Habit database
 - Basic UI
=========================================
*/


// ================================
// GLOBAL DATA
// ================================


let habits = [];

let journals = [];

let settings = {

    darkMode: false,

    largeText: false

};


let currentPage = "todayPage";




// ================================
// START APP
// ================================


document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadData();


        setupNavigation();


        setupButtons();


        renderHabits();


        updateSummary();


        applySettings();


    }
);





// ================================
// LOCAL STORAGE
// ================================



function saveData(){


    localStorage.setItem(

        "habits",

        JSON.stringify(habits)

    );



    localStorage.setItem(

        "journals",

        JSON.stringify(journals)

    );



    localStorage.setItem(

        "settings",

        JSON.stringify(settings)

    );


}






function loadData(){



    const savedHabits =
        localStorage.getItem("habits");



    const savedJournals =
        localStorage.getItem("journals");



    const savedSettings =
        localStorage.getItem("settings");




    if(savedHabits){

        habits =
            JSON.parse(savedHabits);

    }



    if(savedJournals){

        journals =
            JSON.parse(savedJournals);

    }



    if(savedSettings){

        settings =
            JSON.parse(savedSettings);

    }



}







// ================================
// NAVIGATION
// ================================



function setupNavigation(){


    const buttons =
        document.querySelectorAll(
            ".nav-button"
        );



    buttons.forEach(button => {


        button.addEventListener(
            "click",
            () => {



                const page =
                    button.dataset.page;



                switchPage(page);



            }
        );



    });



}





function switchPage(page){


    document
        .querySelectorAll(".page")
        .forEach(section => {


            section.classList.remove(
                "active"
            );


        });




    document
        .getElementById(page)
        .classList.add(
            "active"
        );




    document
        .querySelectorAll(".nav-button")
        .forEach(button => {


            button.classList.remove(
                "active"
            );


            if(button.dataset.page === page){

                button.classList.add(
                    "active"
                );

            }


        });



    currentPage = page;



}






// ================================
// BUTTON SETUP
// ================================



function setupButtons(){



    const addButton =
        document.getElementById(
            "addHabitButton"
        );



    const modal =
        document.getElementById(
            "habitModal"
        );



    const close =
        document.getElementById(
            "closeHabitModal"
        );



    const save =
        document.getElementById(
            "saveHabitButton"
        );




    addButton.onclick = () => {


        modal.classList.add(
            "show"
        );


    };





    close.onclick = () => {


        modal.classList.remove(
            "show"
        );


    };





    save.onclick =
        createHabit;




    document
        .getElementById(
            "themeButton"
        )
        .onclick =
        toggleDarkMode;





    document
        .getElementById(
            "darkModeToggle"
        )
        .onchange =
        toggleDarkMode;





    document
        .getElementById(
            "largeTextToggle"
        )
        .onchange =
        toggleLargeText;



}
/* =====================================
   HABIT CREATION AND MANAGEMENT
===================================== */





function createHabit(){


    const name =
        document.getElementById(
            "habitName"
        ).value.trim();



    const icon =
        document.getElementById(
            "habitIcon"
        ).value.trim()
        || "⭐";



    const category =
        document.getElementById(
            "habitCategory"
        ).value;



    const frequency =
        document.getElementById(
            "habitFrequency"
        ).value;



    const notes =
        document.getElementById(
            "habitNotes"
        ).value;




    if(!name){

        alert(
            "Please enter a habit name"
        );

        return;

    }





    const habit = {


        id:
            Date.now(),


        name,


        icon,


        category,


        frequency,


        notes,



        completedDays:
            [],



        missedDays:
            [],



        created:
            new Date()
            .toISOString(),



        archived:
            false


    };





    habits.push(
        habit
    );



    saveData();



    renderHabits();



    updateSummary();




    clearHabitForm();




    document
        .getElementById(
            "habitModal"
        )
        .classList.remove(
            "show"
        );



}





function clearHabitForm(){


    document.getElementById(
        "habitName"
    ).value = "";



    document.getElementById(
        "habitIcon"
    ).value = "";



    document.getElementById(
        "habitNotes"
    ).value = "";



}







// ================================
// RENDER HABITS
// ================================




function renderHabits(){



    const container =
        document.getElementById(
            "habitContainer"
        );




    container.innerHTML = "";





    const activeHabits =
        habits.filter(
            habit =>
            !habit.archived
        );





    if(activeHabits.length === 0){



        container.innerHTML = `

        <div class="empty-state">

            <h3>
            No habits yet
            </h3>

            <p>
            Create your first habit
            and start building consistency.
            </p>

        </div>

        `;



        return;

    }





    activeHabits.forEach(
        habit => {



            const card =
                document.createElement(
                    "div"
                );



            card.className =
                "habit-card";




            const completed =
                isCompletedToday(
                    habit
                );





            card.innerHTML = `


            <div class="habit-info">


                <div class="habit-icon">

                    ${habit.icon}

                </div>



                <div>


                    <div class="habit-name">

                        ${habit.name}

                    </div>


                    <div class="habit-category">

                        ${habit.category}

                    </div>



                    <div class="streak">

                        🔥 
                        ${calculateStreak(habit)}
                        day streak

                    </div>


                </div>



            </div>




            <button

                class="check-button 
                ${completed ? "completed" : ""}"

                data-id="${habit.id}"

            >

                ${completed ? "✓" : ""}


            </button>


            `;




            const checkButton =
                card.querySelector(
                    ".check-button"
                );



            checkButton.onclick =
                () => {

                    toggleHabit(
                        habit.id
                    );

                };



            container.appendChild(
                card
            );



        }
    );



}







// ================================
// COMPLETE HABIT
// ================================




function toggleHabit(id){



    const habit =
        habits.find(
            h =>
            h.id === id
        );



    if(!habit)
        return;




    const today =
        getDateString(
            new Date()
        );




    const index =
        habit.completedDays.indexOf(
            today
        );




    if(index === -1){



        habit.completedDays.push(
            today
        );



    }

    else {



        habit.completedDays.splice(
            index,
            1
        );



    }




    saveData();



    renderHabits();



    updateSummary();




}






// ================================
// DATE HELPERS
// ================================




function getDateString(date){


    return date
        .toISOString()
        .split("T")[0];


}





function isCompletedToday(habit){


    return habit.completedDays.includes(

        getDateString(
            new Date()
        )

    );


}
/* =====================================
   STREAKS AND STATISTICS
===================================== */





function calculateStreak(habit){



    let streak = 0;



    let currentDate =
        new Date();




    while(true){



        const date =
            getDateString(
                currentDate
            );



        if(
            habit.completedDays.includes(
                date
            )
        ){


            streak++;


            currentDate.setDate(
                currentDate.getDate() - 1
            );


        }

        else {


            break;


        }


    }



    return streak;


}







function calculateBestStreak(habit){



    const dates =
        [...habit.completedDays]
        .sort();




    if(
        dates.length === 0
    ){

        return 0;

    }





    let best = 1;

    let current = 1;





    for(
        let i = 1;
        i < dates.length;
        i++
    ){



        const previous =
            new Date(
                dates[i-1]
            );



        const currentDate =
            new Date(
                dates[i]
            );




        const difference =
            (
                currentDate -
                previous
            )
            /
            (
                1000 *
                60 *
                60 *
                24
            );




        if(
            difference === 1
        ){



            current++;



            if(
                current > best
            ){

                best = current;

            }


        }

        else {


            current = 1;


        }



    }




    return best;


}







function getTotalCompletions(){



    let total = 0;



    habits.forEach(
        habit => {


            total +=
                habit.completedDays.length;


        }
    );



    return total;


}






function getCompletedTodayCount(){



    let count = 0;




    habits.forEach(
        habit => {


            if(
                isCompletedToday(
                    habit
                )
            ){

                count++;

            }


        }
    );



    return count;


}







function getSuccessRate(){



    if(
        habits.length === 0
    ){

        return 0;

    }



    let possible = 0;

    let completed = 0;




    habits.forEach(
        habit => {


            const days =
                Math.floor(
                    (
                    new Date() -
                    new Date(
                        habit.created
                    )
                    )
                    /
                    (
                    1000 *
                    60 *
                    60 *
                    24
                    )
                )
                + 1;




            possible += days;



            completed +=
                habit.completedDays.length;



        }
    );





    if(possible === 0){

        return 0;

    }




    return Math.round(
        (
            completed /
            possible
        )
        *
        100
    );


}







// ================================
// UPDATE DASHBOARD
// ================================




function updateSummary(){



    const completed =
        getCompletedTodayCount();




    const total =
        habits.filter(
            h =>
            !h.archived
        )
        .length;





    let percentage = 0;



    if(total > 0){


        percentage =
            Math.round(
                (
                completed /
                total
                )
                *
                100
            );


    }




    const progress =
        document.getElementById(
            "dailyProgress"
        );



    const completedText =
        document.getElementById(
            "completedCount"
        );



    const streakText =
        document.getElementById(
            "currentStreak"
        );





    if(progress){

        progress.innerText =
            percentage + "%";

    }



    if(completedText){

        completedText.innerText =
            completed;

    }





    if(streakText){


        let highest = 0;



        habits.forEach(
            habit => {


                const streak =
                    calculateStreak(
                        habit
                    );


                if(
                    streak > highest
                ){

                    highest = streak;

                }


            }
        );



        streakText.innerText =
            "🔥 " + highest;


    }





    updateStatistics();



}
/* =====================================
   SEARCH AND FILTERS
===================================== */



document.addEventListener(
    "input",
    event => {



        if(
            event.target.id ===
            "habitSearch"
        ){


            searchHabits(
                event.target.value
            );


        }



    }
);






function searchHabits(query){



    const cards =
        document.querySelectorAll(
            ".habit-card"
        );



    cards.forEach(
        card => {



            const text =
                card.innerText
                .toLowerCase();




            if(
                text.includes(
                    query.toLowerCase()
                )
            ){


                card.style.display =
                    "flex";


            }

            else {


                card.style.display =
                    "none";


            }



        }
    );


}







/* =====================================
   DARK MODE
===================================== */



function toggleDarkMode(){



    settings.darkMode =
        !settings.darkMode;



    saveData();



    applySettings();


}





function toggleLargeText(){



    settings.largeText =
        !settings.largeText;



    saveData();



    applySettings();


}







function applySettings(){



    const body =
        document.body;




    if(
        settings.darkMode
    ){


        body.classList.add(
            "dark"
        );


    }

    else {


        body.classList.remove(
            "dark"
        );


    }




    if(
        settings.largeText
    ){


        body.classList.add(
            "large-text"
        );


    }

    else {


        body.classList.remove(
            "large-text"
        );


    }





    const darkToggle =
        document.getElementById(
            "darkModeToggle"
        );



    const textToggle =
        document.getElementById(
            "largeTextToggle"
        );




    if(darkToggle){

        darkToggle.checked =
            settings.darkMode;

    }




    if(textToggle){

        textToggle.checked =
            settings.largeText;

    }



}
/* =====================================
   EXPORT AND IMPORT DATA
===================================== */





document.addEventListener(
    "click",
    event => {



        if(
            event.target.id ===
            "exportButton"
        ){

            exportData();

        }



        if(
            event.target.id ===
            "importButton"
        ){

            document
            .getElementById(
                "importFile"
            )
            .click();


        }



    }
);






function exportData(){



    const backup = {


        habits,


        journals,


        settings,


        exported:

            new Date()
            .toISOString()


    };




    const file =
        new Blob(

            [
                JSON.stringify(
                    backup,
                    null,
                    2
                )

            ],

            {
                type:
                "application/json"
            }

        );





    const url =
        URL.createObjectURL(
            file
        );




    const link =
        document.createElement(
            "a"
        );



    link.href =
        url;



    link.download =
        "HabitTracker_Backup.json";



    link.click();




    URL.revokeObjectURL(
        url
    );



}








document
.getElementById(
    "importFile"
)
.addEventListener(
    "change",
    event => {



        const file =
            event.target.files[0];



        if(!file)
            return;




        const reader =
            new FileReader();




        reader.onload =
            e => {


                try {



                    const data =
                        JSON.parse(
                            e.target.result
                        );



                    habits =
                        data.habits ||
                        [];



                    journals =
                        data.journals ||
                        [];



                    settings =
                        data.settings ||
                        {};



                    saveData();



                    renderHabits();



                    updateSummary();



                    applySettings();



                    alert(
                        "Backup restored!"
                    );



                }


                catch(error){


                    alert(
                        "Invalid backup file"
                    );


                }



            };



        reader.readAsText(
            file
        );



    }
);








/* =====================================
   JOURNAL SYSTEM
===================================== */






document.addEventListener(
    "click",
    event => {



        if(
            event.target.id ===
            "saveJournalButton"
        ){


            saveJournal();


        }



    }
);








function saveJournal(){



    const input =
        document.getElementById(
            "journalInput"
        );



    const text =
        input.value.trim();




    if(!text)
        return;




    journals.unshift({



        id:
            Date.now(),



        text,



        date:
            new Date()
            .toISOString()



    });





    input.value =
        "";



    saveData();



    renderJournal();



}







function renderJournal(){



    const container =
        document.getElementById(
            "journalHistory"
        );



    if(!container)
        return;




    container.innerHTML =
        "";




    journals.forEach(
        entry => {



            const div =
                document.createElement(
                    "div"
                );



            div.className =
                "journal-entry";



            div.innerHTML = `

            <div class="journal-date">

                ${new Date(
                    entry.date
                )
                .toLocaleDateString()}

            </div>


            <div>

                ${entry.text}

            </div>


            `;



            container.appendChild(
                div
            );



        }
    );


}
/* =====================================
   ACHIEVEMENTS SYSTEM
===================================== */



const achievementList = [


    {
        id:
            "first",

        icon:
            "🌱",

        title:
            "First Step",

        description:
            "Complete your first habit",

        requirement:
            () =>
            getTotalCompletions() >= 1

    },


    {
        id:
            "week",

        icon:
            "🔥",

        title:
            "One Week Strong",

        description:
            "Reach a 7 day streak",

        requirement:
            () =>
            getHighestStreak() >= 7

    },


    {
        id:
            "month",

        icon:
            "🏆",

        title:
            "Consistency",

        description:
            "Reach a 30 day streak",

        requirement:
            () =>
            getHighestStreak() >= 30

    },


    {
        id:
            "hundred",

        icon:
            "💯",

        title:
            "Century",

        description:
            "Complete 100 habits",

        requirement:
            () =>
            getTotalCompletions() >= 100

    },


    {
        id:
            "perfect",

        icon:
            "⭐",

        title:
            "Perfect Day",

        description:
            "Complete every habit today",

        requirement:
            () =>
            habits.length > 0 &&
            getCompletedTodayCount()
            === habits.length

    }


];







function getHighestStreak(){



    let highest = 0;



    habits.forEach(
        habit => {


            const streak =
                calculateBestStreak(
                    habit
                );


            if(
                streak > highest
            ){

                highest =
                    streak;

            }


        }
    );



    return highest;


}








function renderAchievements(){



    const container =
        document.getElementById(
            "achievementContainer"
        );



    if(!container)
        return;



    container.innerHTML =
        "";





    achievementList.forEach(
        achievement => {



            const unlocked =
                achievement
                .requirement();





            const card =
                document.createElement(
                    "div"
                );



            card.className =
                "achievement-card";



            if(!unlocked){

                card.classList.add(
                    "locked"
                );

            }




            card.innerHTML = `


            <div class="achievement-icon">

                ${achievement.icon}

            </div>



            <div class="achievement-title">

                ${achievement.title}

            </div>



            <div class="achievement-description">

                ${achievement.description}

            </div>



            ${unlocked ? "✅" : "🔒"}


            `;



            container.appendChild(
                card
            );



        }
    );


}







/* =====================================
   CALENDAR SYSTEM
===================================== */






function renderCalendar(){



    const container =
        document.getElementById(
            "calendarContainer"
        );



    if(!container)
        return;



    const today =
        new Date();



    const year =
        today.getFullYear();



    const month =
        today.getMonth();





    const firstDay =
        new Date(
            year,
            month,
            1
        )
        .getDay();




    const days =
        new Date(
            year,
            month + 1,
            0
        )
        .getDate();





    let html = `

    <div class="calendar-header">

        <h3>

        ${today.toLocaleString(
            "default",
            {
                month:
                "long"
            }
        )}

        ${year}

        </h3>

    </div>


    <div class="calendar-grid">

    `;




    for(
        let i = 0;
        i < firstDay;
        i++
    ){

        html +=
        `<div></div>`;

    }





    for(
        let day = 1;
        day <= days;
        day++
    ){



        const date =
            getDateString(

                new Date(
                    year,
                    month,
                    day
                )

            );



        let complete =
            false;




        habits.forEach(
            habit => {


                if(
                    habit.completedDays
                    .includes(date)
                ){

                    complete =
                    true;


                }


            }
        );




        html += `

        <div class="calendar-day
        ${complete ? "completed" : ""}">

            ${day}

        </div>

        `;


    }





    html +=
    "</div>";



    container.innerHTML =
        html;



}
/* =====================================
   STATISTICS PAGE
===================================== */





function updateStatistics(){



    const total =
        document.getElementById(
            "totalCompletions"
        );



    const best =
        document.getElementById(
            "bestStreak"
        );



    const rate =
        document.getElementById(
            "successRate"
        );





    if(total){


        total.innerText =
            getTotalCompletions();


    }



    if(best){


        best.innerText =
            getHighestStreak();


    }




    if(rate){


        rate.innerText =
            getSuccessRate()
            + "%";


    }




    renderHeatmap();


    renderAchievements();


    renderCalendar();


}








/* =====================================
   HEATMAP GENERATOR
===================================== */





function renderHeatmap(){



    const container =
        document.getElementById(
            "heatmapContainer"
        );



    if(!container)
        return;




    container.innerHTML =
        "";




    const today =
        new Date();




    for(
        let i = 120;
        i >= 0;
        i--
    ){



        const date =
            new Date();



        date.setDate(
            today.getDate()
            - i
        );



        const dateString =
            getDateString(
                date
            );



        let completed =
            false;




        habits.forEach(
            habit => {


                if(
                    habit.completedDays
                    .includes(
                        dateString
                    )
                ){

                    completed =
                    true;


                }


            }
        );





        const square =
            document.createElement(
                "div"
            );



        square.className =
            "heat-square";



        if(completed){


            square.classList.add(
                "complete"
            );


        }



        container.appendChild(
            square
        );



    }



}







/* =====================================
   CONFETTI EFFECT
===================================== */





function createConfetti(){



    const container =
        document.getElementById(
            "confettiContainer"
        );



    if(!container)
        return;





    for(
        let i = 0;
        i < 40;
        i++
    ){



        const piece =
            document.createElement(
                "div"
            );



        piece.className =
            "confetti";



        piece.style.left =
            Math.random() *
            100 +
            "vw";



        piece.style.animationDelay =
            Math.random()
            *
            2 +
            "s";



        container.appendChild(
            piece
        );



        setTimeout(
            () => {

                piece.remove();

            },

            3000

        );


    }


}







/* =====================================
   CHECK DAILY COMPLETION
===================================== */





function checkDailyCompletion(){



    if(
        habits.length === 0
    )
        return;




    if(
        getCompletedTodayCount()
        ===
        habits.length
    ){


        createConfetti();


    }


}
/* =====================================
   REMINDERS FOUNDATION
===================================== */


let reminders = [];





function saveReminders(){


    localStorage.setItem(

        "reminders",

        JSON.stringify(
            reminders
        )

    );


}






function loadReminders(){


    const saved =
        localStorage.getItem(
            "reminders"
        );



    if(saved){

        reminders =
            JSON.parse(
                saved
            );

    }



}






function addReminder(
    habitId,
    time
){



    reminders.push({


        id:
            Date.now(),


        habitId,


        time


    });



    saveReminders();


}








/* =====================================
   DRAG AND DROP HABIT ORDERING
===================================== */





let draggedHabit = null;





function setupDragAndDrop(){



    const cards =
        document.querySelectorAll(
            ".habit-card"
        );



    cards.forEach(card => {



        card.draggable =
            true;




        card.addEventListener(
            "dragstart",
            () => {


                draggedHabit =
                    card;


                card.classList.add(
                    "dragging"
                );


            }
        );





        card.addEventListener(
            "dragend",
            () => {


                card.classList.remove(
                    "dragging"
                );


            }
        );



    });



}







/* =====================================
   DAILY RESET CHECK
===================================== */





function dailyCheck(){



    updateSummary();


    checkDailyCompletion();


}







/* =====================================
   FINAL APP STARTUP
===================================== */





window.addEventListener(
    "load",
    () => {


        loadReminders();


        renderJournal();


        renderAchievements();


        renderCalendar();


        updateStatistics();


        setupDragAndDrop();


        dailyCheck();


    }
);







/* =====================================
   UTILITY FUNCTIONS
===================================== */






function formatDate(date){


    return date.toLocaleDateString(
        "en-US",
        {

            month:
            "short",

            day:
            "numeric",

            year:
            "numeric"

        }

    );


}






function getHabitById(id){



    return habits.find(

        habit =>
        habit.id === id

    );


}







function deleteHabit(id){



    habits =
        habits.filter(

            habit =>
            habit.id !== id

        );



    saveData();


    renderHabits();


    updateSummary();


}






function archiveHabit(id){



    const habit =
        getHabitById(id);



    if(habit){


        habit.archived =
            true;


    }



    saveData();


    renderHabits();



}






console.log(
    "HabitTracker loaded successfully"
);
