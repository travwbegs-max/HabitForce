/*
=========================================
 HabitTracker Category System

 Handles:
 - Custom categories
 - Category filters
 - Category statistics
=========================================
*/





const CategoryManager = {



    categories: [


        {
            id:
            "health",

            name:
            "Health",

            color:
            "#2457FF"

        },


        {
            id:
            "sports",

            name:
            "Sports",

            color:
            "#E53935"

        },


        {
            id:
            "school",

            name:
            "School",

            color:
            "#7B1FA2"

        },


        {
            id:
            "personal",

            name:
            "Personal",

            color:
            "#00897B"

        }


    ],







    load(){



        const saved =
            localStorage.getItem(
                "categories"
            );



        if(saved){


            this.categories =
                JSON.parse(
                    saved
                );


        }



    },







    save(){



        localStorage.setItem(

            "categories",

            JSON.stringify(
                this.categories
            )

        );


    },







    add(
        name,
        color
    ){



        const category = {


            id:
            Date.now(),


            name,


            color:
            color ||
            "#2457FF"


        };





        this.categories.push(

            category

        );



        this.save();



    },







    remove(
        id
    ){



        this.categories =
            this.categories.filter(

                category =>

                category.id !== id

            );



        this.save();



    },







    getName(
        id
    ){



        const category =
            this.categories.find(

                category =>

                category.id === id

            );



        return category
            ?
            category.name
            :
            id;



    },







    getColor(
        id
    ){



        const category =
            this.categories.find(

                category =>

                category.id === id

            );



        return category
            ?
            category.color
            :
            "#2457FF";



    },







    filterHabits(
        category
    ){



        return habits.filter(

            habit =>

            habit.category === category

        );


    },







    statistics(
        category
    ){



        const filtered =
            this.filterHabits(
                category
            );



        let total = 0;



        filtered.forEach(
            habit => {


                total +=
                habit.completedDays.length;


            }
        );



        return total;


    }





};







CategoryManager.load();






console.log(
    "Category module loaded"
);
