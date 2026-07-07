/*
=========================================
 HabitTracker Security System

 Handles:
 - Data validation
 - Safe storage
 - Recovery backups
=========================================
*/





const SecurityManager = {



    backupKey:
    "habitTrackerBackup",






    validateHabits(
        data
    ){



        if(
            !Array.isArray(data)
        ){

            return false;

        }





        return data.every(

            habit =>

            habit.id &&
            habit.name &&
            Array.isArray(
                habit.completedDays
            )

        );



    },









    safeSave(
        key,
        data
    ){



        try {



            localStorage.setItem(

                key,

                JSON.stringify(
                    data
                )

            );



            return true;



        }

        catch(error){



            console.error(
                "Save failed:",
                error
            );



            return false;



        }



    },









    createBackup(){



        const backup = {



            habits:
            localStorage.getItem(
                "habits"
            ),



            journals:
            localStorage.getItem(
                "journals"
            ),



            settings:
            localStorage.getItem(
                "settings"
            ),



            date:
            new Date()
            .toISOString()



        };






        localStorage.setItem(

            this.backupKey,

            JSON.stringify(
                backup
            )

        );



    },









    restoreBackup(){



        const backup =
            localStorage.getItem(
                this.backupKey
            );



        if(
            !backup
        ){

            return false;

        }




        const data =
            JSON.parse(
                backup
            );





        if(
            data.habits
        ){


            localStorage.setItem(

                "habits",

                data.habits

            );


        }





        if(
            data.journals
        ){


            localStorage.setItem(

                "journals",

                data.journals

            );


        }





        if(
            data.settings
        ){


            localStorage.setItem(

                "settings",

                data.settings

            );


        }





        return true;



    },









    repair(){



        let saved =
            localStorage.getItem(
                "habits"
            );



        if(
            !saved
        )
            return;




        try {



            let data =
                JSON.parse(
                    saved
                );



            data =
                data.map(

                    habit => ({


                        id:
                        habit.id ||
                        Date.now(),


                        name:
                        habit.name ||
                        "New Habit",


                        icon:
                        habit.icon ||
                        "⭐",


                        category:
                        habit.category ||
                        "Personal",


                        frequency:
                        habit.frequency ||
                        "daily",


                        completedDays:
                        habit.completedDays ||
                        [],


                        archived:
                        habit.archived ||
                        false



                    })

                );





            this.safeSave(

                "habits",

                data

            );



        }

        catch(error){


            console.log(
                "Repair failed"
            );


        }



    }






};







SecurityManager.createBackup();





SecurityManager.repair();






console.log(
    "Security module loaded"
);
