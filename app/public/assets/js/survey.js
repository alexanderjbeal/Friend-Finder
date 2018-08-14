// Function for survey questions
const loadQuestions = () => {
    let url = window.location.origin;
    $.ajax({ url: url + "/api/questions", method: "GET" })
        .then((questionsArray) => {
            questionsArray.forEach((q) => {
                $('#questions-container').append(`
                    <div id="questions-container__question">
                       
                        <label class="q-text" for="q${q.id}">${q.q}</label>
                        <select id="q${q.id}" class="form__select">
                            <option value="null" selected disabled></option>
                            <option value="1">Strongly Disagree</option>
                            <option value="2">Disagree</option>
                            <option value="3">Neutral</option>
                            <option value="4">Agree</option>
                            <option value="5">Strongly Agree</option>
                        </select>
                    </div>
                `);
            });
        });
}

// Loads survey questions
$(document).ready(
    loadQuestions()
);   

// Function for the submit click event.
$('#submit').click((e) => {
    e.preventDefault();

    let user = {
        "name" : $('#name').val(),
        "photo" : $('#image').val(),
        "answers": []
    };

    for (let i = 1; i < 11; i++) {
        if ($(`#q${i}`).val()) {
            user.answers.push(Number($(`#q${i}`).val()));
        } else {
            user.answers.push(null);
        }
    }

    if (user.answers.indexOf(null) > -1) {
        vex.defaultOptions.className = 'vex-theme-wireframe';
        vex.dialog.alert('Please answer all questions before clicking submit.');
    } else {
        let url = window.location.origin;
        $.ajax({ url: url + "/api/friends", method: "GET" })
        .then((users) => {
            let results = [];

            users.forEach((currentUser) => {
                let result = 0;

                for (let i = 0; i < currentUser.answers.length; i++) {
                    result += Math.abs(user.answers[i] - currentUser.answers[i]);
                }

                results.push({
                    name: currentUser.name,
                    photo: currentUser.photo,
                    score: result
                });
            });

            let smallest = 50;
            let friend;

            results.forEach((currentUser) => {
                if (currentUser.score < smallest) {
                    smallest = currentUser.score;
                    friend = currentUser;
                }
            });

            vex.defaultOptions.className = 'vex-theme-wireframe';
            vex.dialog.alert({
                input: `
                    <div class="user">
                        <img src="${friend.photo}" alt="${friend.name}" class="user_image">
                        <div class="name">Your new best friend is ${friend.name}!</div>
                    </div>`
            });
        });
        
        $.post("/api/friends", user,
            (data) => {
                $('#name').val('');
                $('#image').val('');
                for (let i = 1; i < 11; i++) {
                    $(`#q${i}`).val('');
                }
            });
    }
});