const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((blog) => {
    sum += blog.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1)
    return {}
  let favorite = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes)
      favorite = blog
  })
  return { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}