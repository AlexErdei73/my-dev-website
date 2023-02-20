export async function login(username, password) {
  const response = await fetch("http://localhost:5000/users/login", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const json = await response.json();
  return json;
}

export async function updatePost(post, token) {
  const response = await fetch(`http://localhost:5000/posts/${post._id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const json = await response.json();
  return json;
}

export async function updateBlock(block, token) {
  const response = await fetch(
    `http://localhost:5000/posts/${block.post}/blocks/${block._id}`,
    {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(block),
    }
  );
  const json = await response.json();
  return json;
}

export async function getPost(ID) {
  const response = await fetch(`http://localhost:5000/posts/${ID}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export async function createBlock(block, token) {
  const response = await fetch(
    `http://localhost:5000/posts/${block.post}/blocks`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(block),
    }
  );
  const json = await response.json();
  return json;
}
