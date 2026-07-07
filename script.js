/*
=========================================
 HabitTracker Main Controller REMASTERED

 Connects:
 - Habits
 - Storage
 - UI
 - Statistics
 - Achievements
 - Themes
 - Goals
 - Reminders
 - Service Worker
=========================================
*/


let habits = [];

let journals = [];

let settings = {};




// =========================
// STORAGE
// =========================


function loadData(){


    try {


        habits =
            loadHabitsData();



        journals =
            StorageManager.load(
                "journals",
                []
            );



        settings =
            loadSettingsData();



    }

    catch(error){


        console.error(
            "Loading error:",
            error
        );


        habits = [];

        journals = [];

        settings = {};

    }


}






function saveData(){


    try {


        saveHabitsData(
            habits
        );


        StorageManager.save(

            "journals",

            journals

        );


        saveSettingsData(
            settings
        );



    }


    catch(error){


        console.error(
            "Saving error:",
            error
        );


    }


}






// =========================
// HELPERS
// =========================


function getDateString(
    date = new Date()
){


    return date
    .toISOString()
    .split("T")[0];


}






function getHabitById(
    id
){


    return habits.find(

        habit =>

        habit.id === id

    );


}







function getTotalCompletions(){


    return habits.reduce(

        (total, habit)=>

        total +
        habit.completedDays.length,

        0

    );


}







function getHighestStreak(){


    let highest = 0;



    habits.forEach(

        habit=>{


            if(
                typeof StreakManager !== "undefined"
            ){


                let streak =
                StreakManager.calculate(
                    habit
                );



                highest =
                Math.max(
                    highest,
                    streak
                );


            }


        }

    );



    return highest;


}







// =========================
// HABIT ACTIONS
// =========================



function addHabit(
    name,
    category="Personal"
){



    const habit = {


        id:
        Date.now(),


        name,


        icon:
        "⭐",


        category,


        frequency:
        "daily",


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


    showMessage(
        "Habit created 🎉"
    );


}








function completeHabit(
    id
){



    const habit =
    getHabitById(id);



    if(
        !habit
    )
        return;



    const today =
    getDateString();





    if(
        !habit.completedDays.includes(
            today
        )
    ){


        habit.completedDays.push(
            today
        );


        saveData();



        if(
            typeof AchievementManager !== "undefined"
        ){

            AchievementManager.check();

        }



        showMessage(
            "Completed! 🔥"
        );


    }


    renderHabits();


}








function deleteHabit(
    id
){


    habits =
    habits.filter(

        habit =>

        habit.id !== id

    );



    saveData();


    renderHabits();



    showMessage(
        "Habit deleted"
    );


}







// =========================
// DISPLAY
// =========================



function renderHabits(){


    const list =
    document.getElementById(
        "habitList"
    );



    if(
        !list
    )
        return;



    list.innerHTML = "";





    habits.forEach(

        habit=>{


            const card =
            document.createElement(
                "div"
            );


            card.className =
            "habit-card";



            card.innerHTML = `


            <h3>
            ${habit.icon}
            ${habit.name}
            </h3>


            <p>
            ${habit.category}
            </p>


            <p>
            🔥 ${
            typeof StreakManager !== "undefined"
            ?
            StreakManager.calculate(habit)
            :
            0
            }
            day streak
            </p>


            <button onclick="completeHabit(${habit.id})">

            Complete

            </button>


            <button onclick="deleteHabit(${habit.id})">

            Delete

            </button>


            `;



            list.appendChild(
                card
            );


        }

    );



    updateDashboard();


}







function updateDashboard(){



    setText(
        "totalHabits",
        habits.length
    );



    setText(
        "currentStreak",
        getHighestStreak()
    );



    setText(
        "totalCompleted",
        getTotalCompletions()
    );



    if(
        typeof Statistics !== "undefined"
    ){



        setText(

            "completionRate",

            Statistics.completionRate(
                habits
            )
            +
            "%"

        );



    }



}







function setText(
    id,
    value
){


    const element =
    document.getElementById(
        id
    );


    if(element)
        element.innerText =
        value;


}







// =========================
// FORM
// =========================



function addHabitFromForm(){


    const name =
    document.getElementById(
        "habitName"
    ).value;



    const category =
    document.getElementById(
        "habitCategory"
    ).value;



    if(
        !name.trim()
    ){

        showMessage(
            "Enter a habit name",
            "error"
        );


        return;

    }



    addHabit(
        name,
        category
    );



    document.getElementById(
        "habitName"
    ).value="";


}







function searchHabits(){



    const query =
    document.getElementById(
        "searchInput"
    ).value;



    const results =
    SearchManager.search(
        query
    );



    const backup =
    habits;



    habits =
    results;


    renderHabits();


    habits =
    backup;


}








// =========================
// TOOLS
// =========================



function exportBackup(){


    ExportManager.exportJSON(

        habits,

        journals,

        settings

    );


}







function requestNotifications(){



    if(
        typeof Notifications !== "undefined"
    ){


        Notifications.requestPermission();


    }


}








function showMessage(
    message,
    type="success"
){


    if(
        typeof UIManager !== "undefined"
    ){


        UIManager.showToast(
            message,
            type
        );


    }

    else {


        console.log(
            message
        );


    }


}








// =========================
// SERVICE WORKER
// =========================



function registerServiceWorker(){


    if(
        "serviceWorker" in navigator
    ){


        navigator.serviceWorker.register(

            "service-worker.js"

        )

        .then(()=>{


            console.log(
                "Offline mode active"
            );


        })


        .catch(error=>{


            console.log(
                "Service worker failed:",
                error
            );


        });


    }


}









// =========================
// START APP
// =========================



document.addEventListener(

"DOMContentLoaded",

()=>{


    loadData();


    renderHabits();


    updateDashboard();



    if(
        typeof ThemeManager !== "undefined"
    ){

        ThemeManager.apply();

    }



    registerServiceWorker();



    console.log(
        "🔥 HabitTracker loaded successfully"
    );


}

);
