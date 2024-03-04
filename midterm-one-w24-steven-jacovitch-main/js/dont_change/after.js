document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.zbox').forEach((box) => {
      box.classList.add('click')
      setTimeout(() => {
        box.classList.remove('click')
      }, 250);
    })
  })
})