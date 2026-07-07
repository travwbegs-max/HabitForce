/*
=========================================
 HabitTracker Profile System

 Handles:
 - Multiple profiles
 - Profile switching
 - Separate data
=========================================
*/





const ProfileManager = {



    profiles: [],


    currentProfile: null,







    load(){



        const saved =
            localStorage.getItem(
                "profiles"
            );



        if(saved){


            this.profiles =
                JSON.parse(
                    saved
                );


        }





        const current =
            localStorage.getItem(
                "currentProfile"
            );



        if(current){


            this.currentProfile =
                current;


        }



    },







    save(){



        localStorage.setItem(

            "profiles",

            JSON.stringify(
                this.profiles
            )

        );



        localStorage.setItem(

            "currentProfile",

            this.currentProfile

        );


    },







    create(
        name
    ){



        const profile = {


            id:
            Date.now(),


            name,


            habits: [],


            journals: [],


            created:
            new Date()
            .toISOString()


        };





        this.profiles.push(

            profile

        );




        this.currentProfile =
            profile.id;




        this.save();



        return profile;


    },







    switch(
        id
    ){



        const profile =
            this.profiles.find(

                p =>
                p.id === id

            );



        if(!profile)
            return;



        this.currentProfile =
            id;



        habits =
            profile.habits;



        journals =
            profile.journals;




        saveData();



        this.save();



        renderHabits();



        updateSummary();



    },







    delete(
        id
    ){



        this.profiles =
            this.profiles.filter(

                p =>
                p.id !== id

            );




        this.save();


    },







    getCurrent(){



        return this.profiles.find(

            p =>
            p.id ===
            this.currentProfile

        );


    },







    saveCurrentData(){



        const profile =
            this.getCurrent();




        if(profile){


            profile.habits =
                habits;



            profile.journals =
                journals;



            this.save();


        }



    }






};







ProfileManager.load();






console.log(
    "Profile module loaded"
);
