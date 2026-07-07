/*
=========================================
 HabitTracker Default Data System

 Handles:
 - First launch setup
 - Starter habits
 - Default settings
=========================================
*/





const DataManager = {



    firstLaunch(){


        return !localStorage.getItem(
            "habitTrackerStarted"
        );


    },









    initialize(){



        if(
            !this.firstLaunch()
        ){

            return;

        }






        const starterHabits = [



            {

                id:
                Date.now(),

                name:
                "Drink Water",

                icon:
                "💧",

                category:
                "Health",

                frequency:
                "daily",

                notes:
                "Drink enough water today",

                completedDays:
                [],

                missedDays:
                [],

                created:
                new Date()
                .toISOString(),

                archived:
                false


            },




            {

                id:
                Date.now()+1,

                name:
                "Exercise",

                icon:
                "💪",

                category:
                "Sports",

                frequency:
                "daily",

                notes:
                "Stay active",

                completedDays:
                [],

                missedDays:
                [],

                created:
                new Date()
                .toISOString(),

                archived:
                false


            },




            {

                id:
                Date.now()+2,

                name:
                "Read",

                icon:
                "📚",

                category:
                "Personal",

                frequency:
                "daily",

                notes:
                "Read something new",

                completedDays:
                [],

                missedDays:
                [],

                created:
                new Date()
                .toISOString(),

                archived:
                false


            }


        ];








        localStorage.setItem(

            "habits",

            JSON.stringify(
                starterHabits
            )

        );








        localStorage.setItem(

            "settings",

            JSON.stringify({

                darkMode:
                false,

                largeText:
                false

            })

        );








        localStorage.setItem(

            "habitTrackerStarted",

            "true"

        );





        if(
            typeof UIManager !==
            "undefined"
        ){


            UIManager.showToast(

                "Welcome! Your starter habits were added 🎉"

            );


        }



    }







};







DataManager.initialize();






console.log(
    "Data module loaded"
);
