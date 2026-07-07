/*
=========================================
 HabitTracker Reminder System

 Handles:
 - Multiple reminders
 - Habit schedules
 - Reminder management
=========================================
*/





const ReminderManager = {



    reminders: [],







    load(){



        const saved =
            localStorage.getItem(
                "reminders"
            );



        if(saved){


            this.reminders =
                JSON.parse(
                    saved
                );


        }



    },







    save(){



        localStorage.setItem(

            "reminders",

            JSON.stringify(
                this.reminders
            )

        );



    },









    create(
        habitId,
        time,
        label = "Habit Reminder"
    ){



        const reminder = {


            id:
            Date.now(),


            habitId,


            time,


            label,


            enabled:
            true



        };





        this.reminders.push(
            reminder
        );



        this.save();



        return reminder;


    },









    remove(
        id
    ){



        this.reminders =
            this.reminders.filter(

                reminder =>

                reminder.id !== id

            );



        this.save();



    },









    toggle(
        id
    ){



        const reminder =
            this.reminders.find(

                r =>
                r.id === id

            );



        if(reminder){


            reminder.enabled =
                !reminder.enabled;


        }



        this.save();



    },









    check(){



        const now =
            new Date();



        const time =
            now.toTimeString()
            .substring(
                0,
                5
            );





        this.reminders
        .forEach(
            reminder => {



                if(

                    reminder.enabled

                    &&

                    reminder.time
                    ===
                    time

                ){



                    const habit =
                        getHabitById(

                            reminder.habitId

                        );



                    if(habit){



                        Notifications.send(

                            reminder.label,


                            "Complete: "
                            +
                            habit.name


                        );


                    }



                }



            }
        );



    }







};






ReminderManager.load();





setInterval(

    () => {

        ReminderManager.check();

    },

    60000

);






console.log(
    "Reminder system loaded"
);
