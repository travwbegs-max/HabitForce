/*
=========================================
 HabitTracker Theme System

 Handles:
 - Dark mode
 - Accent colors
 - Theme preferences
 - System settings
=========================================
*/





const ThemeManager = {



    settings: {


        mode:
        "light",


        accent:
        "#2457FF",


        secondary:
        "#E53935"



    },








    load(){



        const saved =
            localStorage.getItem(
                "themeSettings"
            );



        if(saved){


            this.settings =
                JSON.parse(
                    saved
                );


        }



        this.apply();



    },









    save(){



        localStorage.setItem(

            "themeSettings",

            JSON.stringify(
                this.settings
            )

        );



    },









    apply(){



        const root =
            document.documentElement;





        root.style
        .setProperty(

            "--primary-blue",

            this.settings.accent

        );





        root.style
        .setProperty(

            "--primary-red",

            this.settings.secondary

        );





        if(
            this.settings.mode
            ===
            "dark"
        ){



            document.body
            .classList.add(
                "dark"
            );


        }

        else {



            document.body
            .classList.remove(
                "dark"
            );


        }



    },









    toggle(){



        if(
            this.settings.mode
            ===
            "light"
        ){


            this.settings.mode =
                "dark";


        }

        else {


            this.settings.mode =
                "light";


        }





        this.save();



        this.apply();



    },









    setAccent(
        color
    ){



        this.settings.accent =
            color;



        this.save();



        this.apply();



    },









    reset(){



        this.settings = {


            mode:
            "light",


            accent:
            "#2457FF",


            secondary:
            "#E53935"



        };



        this.save();



        this.apply();



    }





};








ThemeManager.load();






console.log(
    "Theme module loaded"
);
