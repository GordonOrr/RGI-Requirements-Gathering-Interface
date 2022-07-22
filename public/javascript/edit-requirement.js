async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="requirement-title"]').value.trim();
  const requirement_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${requirement_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-requirement-form').addEventListener('submit', editFormHandler);
