const button = document.querySelector("button")
button.addEventListener("click", () => {
  fetch("http://localhost:3000/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ //hardcoded store
      items: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 1 },
      ],
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
})
