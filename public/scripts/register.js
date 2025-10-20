const fullname = $('#fullName');
const email = $('#email');
const pwd = $('#password');
const registerBtn = $('#registerBtn');

registerBtn.click((e) => {
    e.preventDefault(); 
    if (fullname.val().trim() === '') {
      showInlineAlert('Please enter your full name.');
      return;
    }
    if (email.val().trim() === '') {
      showInlineAlert('Please enter your email.');
      return;
    }
    if (!verifyEmailRegex(email.val())) {
      showInlineAlert('Please enter a valid email.');
      return;
    }
    if (pwd.val().trim() === '') {
      showInlineAlert('Please enter your password.');
      return;
    }
    if (pwd.val().length < 8) {
      showInlineAlert('Password must be at least 8 characters long.');
      return;
    }
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: fullname.val(),
        email: email.val(),
        password: pwd.val()
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.success) {
        window.location.href = '/';
      } else {
        showInlineAlert(data && data.error ? data.error : 'Registration failed.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showInlineAlert('An error occurred. Please try again.');
    });
});

function showInlineAlert(msg) {
  let box = $('#inlineAlert');
  box.text(msg);
  box.css('display', 'block');

  setTimeout(() => {
    box.css('display', 'none');
  }, 3000);
}