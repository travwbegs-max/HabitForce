/*
=========================================
 HabitTracker Goal System

 Handles:
 - Habit targets
 - Goal progress
 - Goal tracking
=========================================
*/





const GoalManager = {



    goals: [],







    load(){



        const saved =
            localStorage.getItem(
                "habitGoals"
            );



        if(saved){


            this.goals =
                JSON.parse(
                    saved
                );


        }



    },







    save(){



        localStorage.setItem(

            "habitGoals",

            JSON.stringify(
                this.goals
            )

        );



    },









    create(
        habitId,
        type,
        target
    ){



        const goal = {


            id:
            Date.now(),


            habitId,


            type,


            target,


            created:
            new Date()
            .toISOString()



        };





        this.goals.push(
            goal
        );



        this.save();



        return goal;


    },









    getProgress(
        goal
    ){



        const habit =
            getHabitById(

                goal.habitId

            );



        if(
            !habit
        ){

            return 0;

        }






        let completed = 0;



        const now =
            new Date();





        if(
            goal.type
            ===
            "daily"
        ){



            completed =
            habit.completedDays
            .includes(

                getDateString(
                    now
                )

            )
            ?
            1
            :
            0;



        }







        if(
            goal.type
            ===
            "weekly"
        ){



            completed =
                this.countRange(

                    habit,

                    7

                );


        }







        if(
            goal.type
            ===
            "monthly"
        ){



            completed =
                this.countRange(

                    habit,

                    30

                );


        }







        return Math.min(

            100,

            Math.round(

                (
                    completed /
                    goal.target

                )
                *
                100

            )

        );



    },









    countRange(
        habit,
        days
    ){



        let count = 0;



        const today =
            new Date();




        for(
            let i = 0;
            i < days;
            i++
        ){



            const date =
                new Date();



            date.setDate(

                today.getDate()
                -
                i

            );



            if(

                habit.completedDays
                .includes(

                    getDateString(
                        date
                    )

                )

            ){



                count++;



            }



        }



        return count;


    },









    remove(
        id
    ){



        this.goals =
            this.goals.filter(

                goal =>

                goal.id !== id

            );



        this.save();



    }





};







GoalManager.load();






console.log(
    "Goal module loaded"
);
