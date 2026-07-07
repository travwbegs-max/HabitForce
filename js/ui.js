/*
=========================================
 HabitTracker UI System

 Handles:
 - Toast messages
 - Animations
 - User feedback
 - Loading states
=========================================
*/





const UIManager = {



    showToast(
        message,
        type = "success"
    ){



        let container =
            document.getElementById(
                "toastContainer"
            );



        if(!container){



            container =
            document.createElement(
                "div"
            );



            container.id =
                "toastContainer";



            document.body
            .appendChild(
                container
            );


        }






        const toast =
            document.createElement(
                "div"
            );



        toast.className =
            "toast " + type;



        toast.innerText =
            message;





        container.appendChild(
            toast
        );





        setTimeout(

            () => {


                toast.classList.add(
                    "hide"
                );



                setTimeout(
                    () => {

                        toast.remove();

                    },

                    300

                );


            },

            2500

        );



    },









    loading(
        show
    ){



        let loader =
            document.getElementById(
                "loadingScreen"
            );





        if(!loader)
            return;





        if(show){


            loader.classList.add(
                "show"
            );


        }

        else {


            loader.classList.remove(
                "show"
            );


        }




    },









    animate(
        element
    ){



        if(
            !element
        )
            return;



        element.classList.add(
            "pop"
        );



        setTimeout(

            () => {

                element.classList.remove(
                    "pop"
                );

            },

            300

        );



    },









    confirm(
        message,
        callback
    ){



        const answer =
            window.confirm(
                message
            );



        if(
            answer
        ){

            callback();

        }



    }







};







console.log(
    "UI module loaded"
);
