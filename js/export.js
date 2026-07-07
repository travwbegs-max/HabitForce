/*
=========================================
 HabitTracker Export System

 Handles:
 - JSON backups
 - CSV exports
 - Downloads
=========================================
*/





const ExportManager = {





    download(
        content,
        filename,
        type
    ){



        const blob =
            new Blob(
                [
                    content
                ],
                {
                    type:type
                }
            );



        const url =
            URL.createObjectURL(
                blob
            );



        const link =
            document.createElement(
                "a"
            );



        link.href =
            url;



        link.download =
            filename;



        link.click();




        URL.revokeObjectURL(
            url
        );


    },









    exportJSON(
        habits,
        journals,
        settings
    ){



        const backup = {


            app:
            "HabitTracker",


            version:
            "1.0",


            created:
            new Date()
            .toISOString(),


            habits,


            journals,


            settings



        };





        this.download(

            JSON.stringify(
                backup,
                null,
                2
            ),


            "HabitTracker_Backup.json",


            "application/json"


        );


    },









    exportCSV(
        habits
    ){



        let csv =

        "Habit,Category,Completions,Streak\n";




        habits.forEach(
            habit => {



                csv +=

                `"${habit.name}",` +

                `"${habit.category}",` +

                `${habit.completedDays.length},` +

                `${this.calculateStreak(habit)}\n`;



            }
        );





        this.download(

            csv,

            "HabitTracker_Report.csv",

            "text/csv"


        );



    },









    calculateStreak(
        habit
    ){



        let streak = 0;


        let date =
            new Date();




        while(
            true
        ){



            const value =
                date
                .toISOString()
                .split("T")[0];



            if(
                habit.completedDays
                .includes(value)
            ){



                streak++;



                date.setDate(
                    date.getDate()-1
                );



            }

            else{


                break;


            }



        }




        return streak;



    }





};






console.log(
    "Export module loaded"
);
