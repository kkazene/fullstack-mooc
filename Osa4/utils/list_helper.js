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

const mostBlogs = (blogs) => {
  if (blogs.length < 1)
    return {}
  const authors = {}
  let maxValue = 0
  let author = ''
  blogs.forEach((blog) => {
    if (authors[blog.author])
      authors[blog.author] += 1
    else
      authors[blog.author] = 1
    if (authors[blog.author] > maxValue) {
      maxValue = authors[blog.author]
      author = blog.author
    }
  })
  return { author, blogs: maxValue }
}
const mostLikes = (blogs) => {
  if (blogs.length < 1)
    return {}
  const authors = {}
  let maxValue = 0
  let author = ''
  blogs.forEach((blog) => {
    if (authors[blog.author])
      authors[blog.author] += blog.likes
    else
      authors[blog.author] = blog.likes
    if (authors[blog.author] > maxValue) {
      maxValue = authors[blog.author]
      author = blog.author
    }
  })
  return { author, likes: maxValue }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}