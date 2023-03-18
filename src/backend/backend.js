async function getJSON(response) {
  let json;
  if (response.status === 401) {
    json = { success: false, errors: [{ msg: response.statusText }] };
  } else json = await response.json();
  return json;
}

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
  return await getJSON(response);
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
  return await getJSON(response);
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
  return await getJSON(response);
}

export async function deleteBlock(block, token) {
  const response = await fetch(
    `http://localhost:5000/posts/${block.post}/blocks/${block._id}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return await getJSON(response);
}

export async function getPosts() {
  const response = await fetch("http://localhost:5000/posts", {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export async function postPosts(post, token) {
  const response = await fetch("http://localhost:5000/posts", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  return await getJSON(response);
}

export async function deletePosts(post, token) {
  const response = await fetch(`http://localhost:5000/posts/${post._id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return await getJSON(response);
}

export async function createUser(user) {
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const json = await response.json();
  return json;
}

export async function updateUser(user, token) {
  const response = await fetch(`http://localhost:5000/users/${user._id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
  });
  return await getJSON(response);
}

export async function updatePostLikes(postId, userId) {
  const response = await fetch(`http://localhost:5000/posts/${postId}/likes`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userId }),
  });
  const json = await response.json();
  return json;
}
