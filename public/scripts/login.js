
const email = $('#email');
const password = $('#password');
const loginBtn = $('#loginBtn');

loginBtn.click((e) => {
  e.preventDefault();
  if (!email.val().trim()) {
    showInlineAlert('Please enter your email.');
    return;
  }
  if (!verifyEmailRegex(email.val())) {
    showInlineAlert('Please enter a valid email.');
    return;
  }
  if (!password.val().trim()) {
    showInlineAlert('Please enter your password.');
    return;
  }
  if(password.val().length < 8) {
    showInlineAlert('Password must be at least 8 characters long.');
    return;
  }

  const payload = {
    email: email.val(),
    password: password.val()
  };

  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        showInlineAlert(data.error);
      } else {
        window.location.href = '/';
      }
    })
    .catch(error => {
      showInlineAlert('An error occurred while logging in.');
    });
});

const showInlineAlert = (msg) => {
  const box = $('#inlineAlert');
  box.text(msg);
  box.slideDown();

  setTimeout(() => {
    box.slideUp();
  }, 3000);
}
