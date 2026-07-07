/*
=========================================
 HabitTracker Achievement System

 Handles:
 - Unlocking achievements
 - Tracking progress
 - Saving rewards
=========================================
*/



const AchievementManager = {


    unlocked: [],




    achievements: [


        {
            id: "first_habit",

            title: "First Step",

            icon: "🌱",

            description:
            "Complete your first habit",

            goal: 1,


            progress(){

                return getTotalCompletions();

            }


        },



        {
            id: "ten_complete",

            title: "Getting Started",

            icon: "⭐",

            description:
            "Complete 10 habits",

            goal: 10,


            progress(){

                return getTotalCompletions();

            }


        },



        {
            id: "week_streak",

            title: "One Week Strong",

            icon: "🔥",

            description:
            "Reach a 7 day streak",

            goal: 7,


            progress(){

                return getHighestStreak();

            }


        },



        {
            id: "month_streak",

            title: "Unstoppable",

            icon: "🏆",

            description:
            "Reach a 30 day streak",

            goal: 30,


            progress(){

                return getHighestStreak();

            }


        },



        {
            id: "hundred",

            title: "Century Club",

            icon: "💯",

            description:
            "Complete 100 habits",

            goal: 100,


            progress(){

                return getTotalCompletions();

            }


        },



        {
            id: "perfect_week",

            title: "Perfect Week",

            icon: "🎯",

            description:
            "Complete every habit for 7 days",

            goal: 7,


            progress(){

                return calculatePerfectDays();

            }


        }


    ],







    load(){


        const saved =
            localStorage.getItem(
                "achievements"
            );



        if(saved){

            this.unlocked =
                JSON.parse(saved);

        }


    },








    save(){


        localStorage.setItem(

            "achievements",

            JSON.stringify(
                this.unlocked
            )

        );


    },









    check(){



        this.achievements
        .forEach(
            achievement => {



                const progress =
                    achievement.progress();



                if(

                    progress >=
                    achievement.goal

                    &&

                    !this.unlocked
                    .includes(
                        achievement.id
                    )

                ){



                    this.unlocked.push(

                        achievement.id

                    );



                    this.showUnlock(

                        achievement

                    );


                }



            }
        );



        this.save();



    },









    showUnlock(
        achievement
    ){


        alert(

            "🏆 Achievement Unlocked!\n\n" +

            achievement.icon +
            " " +
            achievement.title

        );


    },









    getProgress(
        achievement
    ){



        const value =
            achievement.progress();



        return Math.min(

            100,

            Math.round(

                (
                    value /
                    achievement.goal

                )
                *
                100

            )

        );


    }





};







function calculatePerfectDays(){



    let count = 0;



    habits.forEach(
        habit => {


            if(
                habit.completedDays.length
                >=
                7
            ){

                count++;

            }


        }
    );



    return count;


}







AchievementManager.load();





console.log(
    "Achievement module loaded"
);
