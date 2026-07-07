/*
=========================================
 HabitTracker Storage System

 Handles:
 - Saving data
 - Loading data
 - Clearing data
 - Backup preparation
=========================================
*/



const StorageManager = {



    save(key, value){


        localStorage.setItem(

            key,

            JSON.stringify(value)

        );


    },





    load(key, fallback = []){


        const data =
            localStorage.getItem(
                key
            );



        if(!data){

            return fallback;

        }



        try{


            return JSON.parse(
                data
            );


        }

        catch(error){


            console.error(
                "Storage error:",
                error
            );


            return fallback;


        }



    },







    remove(key){


        localStorage.removeItem(
            key
        );


    },







    clearAll(){


        localStorage.clear();


    }






};






// Data shortcuts


function saveHabitsData(habits){


    StorageManager.save(
        "habits",
        habits
    );


}





function loadHabitsData(){


    return StorageManager.load(
        "habits",
        []
    );


}






function saveSettingsData(settings){


    StorageManager.save(
        "settings",
        settings
    );


}






function loadSettingsData(){


    return StorageManager.load(
        "settings",
        {

            darkMode:false,

            largeText:false

        }

    );


}
