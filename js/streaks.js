/*
=========================================
 HabitTracker Streak System

 Handles:
 - Current streaks
 - Best streaks
 - Streak freezes
 - Recovery
=========================================
*/





const StreakManager = {



    freezes: 0,

    history: [],






    load(){


        const saved =
            localStorage.getItem(
                "streakData"
            );



        if(saved){


            const data =
                JSON.parse(
                    saved
                );



            this.freezes =
                data.freezes || 0;



            this.history =
                data.history || [];


        }



    },







    save(){



        localStorage.setItem(

            "streakData",

            JSON.stringify({

                freezes:
                this.freezes,


                history:
                this.history


            })

        );



    },









    calculate(
        habit
    ){



        let streak = 0;



        let date =
            new Date();





        while(true){



            const day =
                getDateString(
                    date
                );




            if(

                habit.completedDays
                .includes(day)

            ){



                streak++;



            }

            else {



                break;



            }



            date.setDate(

                date.getDate()
                -
                1

            );



        }




        return streak;



    },









    longest(
        habit
    ){



        let longest = 0;

        let current = 0;



        const days =
            [
                ...habit.completedDays
            ]
            .sort();





        days.forEach(
            (day,index)=>{



                if(
                    index === 0
                ){



                    current = 1;



                }

                else {



                    const previous =
                        new Date(
                            days[index-1]
                        );



                    const now =
                        new Date(
                            day
                        );



                    const difference =
                    (
                        now -
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



                    }

                    else {



                        current = 1;



                    }



                }






                if(
                    current >
                    longest
                ){


                    longest =
                    current;


                }



            }
        );



        return longest;


    },









    addFreeze(){



        this.freezes++;



        this.save();



    },









    useFreeze(){



        if(
            this.freezes > 0
        ){


            this.freezes--;


            this.save();



            return true;


        }




        return false;


    },









    record(
        habitId,
        streak
    ){



        this.history.push({



            habitId,


            streak,


            date:
            new Date()
            .toISOString()



        });



        this.save();



    }





};







StreakManager.load();






console.log(
    "Streak module loaded"
);
