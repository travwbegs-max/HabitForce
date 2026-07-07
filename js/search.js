/*
=========================================
 HabitTracker Search System

 Handles:
 - Searching
 - Filtering
 - Sorting
 - Favorites
=========================================
*/





const SearchManager = {



    favorites: [],






    load(){


        const saved =
            localStorage.getItem(
                "favoriteHabits"
            );



        if(saved){


            this.favorites =
                JSON.parse(
                    saved
                );


        }



    },







    save(){



        localStorage.setItem(

            "favoriteHabits",

            JSON.stringify(
                this.favorites
            )

        );



    },









    search(
        query
    ){



        if(
            !query
        ){

            return habits;

        }






        return habits.filter(

            habit =>


            habit.name
            .toLowerCase()
            .includes(

                query
                .toLowerCase()

            )

            ||

            habit.category
            .toLowerCase()
            .includes(

                query
                .toLowerCase()

            )



        );



    },









    filterCategory(
        category
    ){



        return habits.filter(

            habit =>

            habit.category
            ===
            category

        );



    },









    sortByName(
        list
    ){



        return [...list]

        .sort(

            (a,b)=>

            a.name.localeCompare(
                b.name
            )

        );



    },









    sortByCompletion(
        list
    ){



        return [...list]

        .sort(

            (a,b)=>

            b.completedDays.length
            -
            a.completedDays.length

        );



    },









    toggleFavorite(
        id
    ){



        if(
            this.favorites
            .includes(id)
        ){



            this.favorites =
            this.favorites.filter(

                item =>
                item !== id

            );



        }

        else {



            this.favorites.push(
                id
            );



        }



        this.save();



    },









    isFavorite(
        id
    ){



        return this.favorites
        .includes(
            id
        );


    },









    favoritesList(){



        return habits.filter(

            habit =>

            this.favorites
            .includes(
                habit.id
            )

        );



    }







};







SearchManager.load();






console.log(
    "Search module loaded"
);
