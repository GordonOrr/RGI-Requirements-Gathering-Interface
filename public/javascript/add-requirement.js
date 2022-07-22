async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="requirement-title"]').value;
  const post_url = document.querySelector('input[name="requirement-url"]').value;

  const response = await fetch(`/api/requirements`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      requirement_url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-requirement-form').addEventListener('submit', newFormHandler);
