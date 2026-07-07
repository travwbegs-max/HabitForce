/*
=========================================
 HabitTracker Friends System

 Handles:
 - Local friends
 - Challenges
 - Leaderboards
 - Progress sharing
=========================================
*/





const FriendsManager = {



    friends: [],

    challenges: [],






    load(){


        const savedFriends =
            localStorage.getItem(
                "friends"
            );



        const savedChallenges =
            localStorage.getItem(
                "challenges"
            );



        if(savedFriends){

            this.friends =
                JSON.parse(
                    savedFriends
                );

        }



        if(savedChallenges){

            this.challenges =
                JSON.parse(
                    savedChallenges
                );

        }



    },







    save(){



        localStorage.setItem(

            "friends",

            JSON.stringify(
                this.friends
            )

        );



        localStorage.setItem(

            "challenges",

            JSON.stringify(
                this.challenges
            )

        );



    },









    addFriend(
        name
    ){



        const friend = {


            id:
            Date.now(),


            name,


            joined:
            new Date()
            .toISOString(),


            completed:
            0



        };





        this.friends.push(
            friend
        );



        this.save();



        return friend;



    },









    createChallenge(
        title,
        goal,
        days
    ){



        const challenge = {


            id:
            Date.now(),


            title,


            goal,


            days,


            created:
            new Date()
            .toISOString(),


            participants:
            []



        };





        this.challenges.push(
            challenge
        );



        this.save();



        return challenge;


    },









    joinChallenge(
        challengeId,
        username
    ){



        const challenge =
            this.challenges.find(

                c =>
                c.id === challengeId

            );



        if(!challenge)
            return;





        challenge.participants
        .push({


            name:
            username,


            progress:
            0



        });



        this.save();



    },









    updateProgress(
        challengeId,
        username,
        progress
    ){



        const challenge =
            this.challenges.find(

                c =>
                c.id === challengeId

            );



        if(!challenge)
            return;






        const player =
            challenge.participants
            .find(

                p =>
                p.name === username

            );



        if(player){


            player.progress =
                progress;


        }



        this.save();



    },









    leaderboard(
        challengeId
    ){



        const challenge =
            this.challenges.find(

                c =>
                c.id === challengeId

            );



        if(!challenge)
            return [];





        return challenge.participants

        .sort(

            (a,b)=>

            b.progress -
            a.progress

        );



    }





};







FriendsManager.load();






console.log(
    "Friends module loaded"
);
