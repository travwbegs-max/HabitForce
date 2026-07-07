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

let settings = {};






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



    UIManager.showToast(
        "Habit added!"
    );



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



        AchievementManager.check();



        UIManager.showToast(
            "Completed! 🎉"
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



    UIManager.showToast(
        "Habit removed"
    );



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
                    ${habit.category}
                </p>


                <p>
                    🔥
                    ${StreakManager.calculate(habit)}
                    day streak
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



        ThemeManager.apply();



        console.log(
            "HabitTracker Ready!"
        );


    }

);
