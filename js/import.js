/*
=========================================
 HabitTracker Import System

 Handles:
 - Backup restoration
 - Validation
 - Data merging
=========================================
*/





const ImportManager = {



    validate(data){



        if(
            !data
        ){

            return false;

        }



        if(
            !Array.isArray(
                data.habits
            )
        ){

            return false;

        }



        return true;


    },







    importFile(
        file,
        merge = false
    ){



        const reader =
            new FileReader();




        reader.onload =
        event => {



            try {



                const data =
                    JSON.parse(
                        event.target.result
                    );





                if(
                    !this.validate(
                        data
                    )
                ){



                    alert(
                        "Invalid backup file"
                    );


                    return;


                }






                if(
                    merge
                ){


                    this.merge(
                        data
                    );


                }

                else {


                    habits =
                        data.habits || [];



                    journals =
                        data.journals || [];



                    settings =
                        data.settings || {};



                }





                saveData();



                renderHabits();



                updateSummary();



                applySettings();




                alert(
                    "Backup restored successfully!"
                );



            }



            catch(error){



                alert(
                    "Could not read backup file"
                );



            }



        };





        reader.readAsText(
            file
        );


    },









    merge(
        data
    ){



        data.habits
        .forEach(
            imported => {



                const exists =
                    habits.find(

                        h =>
                        h.id ===
                        imported.id

                    );



                if(
                    !exists
                ){



                    habits.push(
                        imported
                    );


                }



            }
        );





        if(
            data.journals
        ){


            journals =
                [
                    ...journals,

                    ...data.journals

                ];

        }



    }





};







console.log(
    "Import module loaded"
);
