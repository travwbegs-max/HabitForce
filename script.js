/*
=========================================
 HabitTracker Main Controller

 Connects:
 - Habits
 - Storage
 - UI
 - Statistics
 - Achievements
 - Themes
 - Goals
 - Reminders
=========================================
*/


let habits = [];

let journals = [];

let settings = [];




// -------------------------
// Load Data
// -------------------------


function loadData(){


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






function saveData(){


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



    if(
        typeof ProfileManager !== "undefined"
    ){

        ProfileManager.saveCurrentData();

    }



}







// -------------------------
// Helpers
// -------------------------


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


    let total = 0;



    habits.forEach(

        habit => {


            total +=
            habit.completedDays.length;


        }

    );



    return total;


}








function getHighestStreak(){


    let highest = 0;



    habits.forEach(

        habit => {


            if(
                typeof StreakManager !== "undefined"
            ){


                const streak =
                StreakManager.calculate(
                    habit
                );



                if(
                    streak > highest
                ){

                    highest =
                    streak;

                }


            }


        }

    );



    return highest;


}







// -------------------------
// Habit Functions
// -------------------------



function addHabit(
    name,
    category = "Personal"
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



    if(
        typeof UIManager !== "undefined"
    ){

        UIManager.showToast(
            "Habit added!"
        );

    }



}








function completeHabit(
    id
){



    const habit =
        getHabitById(
            id
        );



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



        if(
            typeof UIManager !== "undefined"
        ){

            UIManager.showToast(
                "Completed! 🎉"
            );

        }


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



    if(
        typeof UIManager !== "undefined"
    ){

        UIManager.showToast(
            "Habit removed"
        );

    }



}







// -------------------------
// Display
// -------------------------



function renderHabits(){



    const container =
    document.getElementById(
        "habitList"
    );



    if(
        !container
    )
        return;





    container.innerHTML = "";





    habits.forEach(

        habit => {



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
                    Category:
                    ${habit.category}
                </p>


                <p>
                    🔥
                    ${
                        typeof StreakManager !== "undefined"
                        ?
                        StreakManager.calculate(habit)
                        :
                        0
                    }
                    day streak
                </p>


                <p>
                    Completed:
                    ${habit.completedDays.length}
                    times
                </p>


                <button onclick="completeHabit(${habit.id})">

                    Complete

                </button>


                <button onclick="deleteHabit(${habit.id})">

                    Delete

                </button>


            `;



            container.appendChild(
                card
            );



        }

    );



    updateSummary();


}









function updateSummary(){



    const total =
    document.getElementById(
        "totalHabits"
    );



    if(total){


        total.innerText =
        habits.length;


    }





    const streak =
    document.getElementById(
        "currentStreak"
    );



    if(streak){


        streak.innerText =
        getHighestStreak();


    }





    const completed =
    document.getElementById(
        "totalCompleted"
    );



    if(completed){


        completed.innerText =
        getTotalCompletions();


    }





    if(
        typeof Statistics !== "undefined"
    ){



        const weekly =
        document.getElementById(
            "weeklyCompleted"
        );



        if(weekly){


            weekly.innerText =
            Statistics.completedThisWeek(
                habits
            );


        }





        const monthly =
        document.getElementById(
            "monthlyCompleted"
        );



        if(monthly){


            monthly.innerText =
            Statistics.completedThisMonth(
                habits
            );


        }





        const rate =
        document.getElementById(
            "completionRate"
        );



        if(rate){


            rate.innerText =
            Statistics.completionRate(
                habits
            )
            +
            "%";


        }



    }


}









// -------------------------
// Form Helpers
// -------------------------



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


        UIManager.showToast(
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
    ).value = "";


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



    const container =
    document.getElementById(
        "habitList"
    );



    if(
        !container
    )
        return;



    container.innerHTML = "";



    results.forEach(

        habit => {



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


                <button onclick="completeHabit(${habit.id})">

                    Complete

                </button>


            `;



            container.appendChild(
                card
            );


        }

    );


}







// -------------------------
// Tools
// -------------------------



function exportBackup(){



    ExportManager.exportJSON(

        habits,

        journals,

        settings

    );


}






function requestNotifications(){



    Notifications.requestPermission();



}







// -------------------------
// Start App
// -------------------------



document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        loadData();



        renderHabits();



        updateSummary();



        if(
            typeof ThemeManager !== "undefined"
        ){

            ThemeManager.apply();

        }



        console.log(
            "HabitTracker Ready!"
        );


    }

);
