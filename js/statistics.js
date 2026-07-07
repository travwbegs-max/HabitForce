/*
=========================================
 HabitTracker Statistics Engine

 Handles:
 - Completion rates
 - Weekly stats
 - Monthly stats
 - Rankings
 - Reports
=========================================
*/





const Statistics = {



    totalCompletions(habits){



        let total = 0;



        habits.forEach(
            habit => {


                total +=
                    habit.completedDays.length;


            }
        );



        return total;


    },







    completionRate(habits){



        if(
            habits.length === 0
        ){

            return 0;

        }





        let completed = 0;

        let possible = 0;





        habits.forEach(
            habit => {


                const created =
                    new Date(
                        habit.created
                    );



                const days =
                    Math.floor(

                        (
                            new Date()
                            -
                            created

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





        if(
            possible === 0
        ){

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


    },







    completedThisWeek(habits){



        const now =
            new Date();



        const start =
            new Date();



        start.setDate(

            now.getDate()
            -
            now.getDay()

        );



        let count = 0;




        habits.forEach(
            habit => {


                habit.completedDays
                .forEach(
                    day => {



                        const date =
                            new Date(
                                day
                            );



                        if(
                            date >= start
                            &&
                            date <= now
                        ){

                            count++;

                        }


                    }
                );


            }
        );



        return count;


    },







    completedThisMonth(habits){



        const now =
            new Date();



        const month =
            now.getMonth();



        const year =
            now.getFullYear();



        let count = 0;




        habits.forEach(
            habit => {



                habit.completedDays
                .forEach(
                    day => {


                        const date =
                            new Date(
                                day
                            );



                        if(

                            date.getMonth()
                            ===
                            month

                            &&

                            date.getFullYear()
                            ===
                            year

                        ){

                            count++;

                        }



                    }
                );


            }
        );



        return count;


    },







    ranking(habits){



        return [...habits]

            .sort(

                (a,b) =>

                b.completedDays.length
                -
                a.completedDays.length

            );



    }






};






console.log(
    "Statistics module loaded"
);
