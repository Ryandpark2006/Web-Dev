{
    document.getElementById('mockForm').addEventListener('submit', function (event) {
        const password = document.getElementById('password').value;
        const confirmPassowrd = document.getElementById('confirmed_password').value;

        if (password !== confirmPassword) {
            event.preventDefault();
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }

    });
}