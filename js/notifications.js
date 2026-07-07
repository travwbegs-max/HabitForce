/*
=========================================
 HabitTracker Notifications System

 Handles:
 - Notification permissions
 - Habit reminders
 - Reminder storage
=========================================
*/





const Notifications = {



    reminders: [],






    requestPermission(){



        if(
            "Notification" in window
        ){


            Notification
            .requestPermission()
            .then(
                permission => {


                    console.log(
                        "Notification permission:",
                        permission
                    );


                }
            );


        }



    },







    send(
        title,
        message
    ){



        if(
            Notification.permission
            ===
            "granted"
        ){



            new Notification(
                title,
                {

                    body:
                    message,


                    icon:
                    ""

                }

            );


        }



    },







    addReminder(
        habitId,
        time
    ){



        this.reminders.push({


            id:
            Date.now(),


            habitId,


            time



        });



        this.save();


    },







    save(){



        localStorage.setItem(

            "habitReminders",

            JSON.stringify(
                this.reminders
            )

        );


    },







    load(){



        const data =
            localStorage.getItem(
                "habitReminders"
            );



        if(data){


            this.reminders =
                JSON.parse(
                    data
                );


        }



    },







    check(){



        const now =
            new Date();



        const current =
            now.toTimeString()
            .slice(
                0,
                5
            );





        this.reminders
        .forEach(
            reminder => {



                if(
                    reminder.time
                    ===
                    current
                ){


                    this.send(

                        "Habit Reminder",

                        "Time to complete your habit!"

                    );


                }



            }
        );



    }



};






Notifications.load();





setInterval(

    () => {

        Notifications.check();

    },

    60000

);






console.log(
    "Notifications module loaded"
);
