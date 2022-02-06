const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const axios = require('axios')

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })

  getActivites() 

  function getActivites(){
    const token = 'a66ec2d3f547998558de8d40cbef81c250d04fac'

    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${token}`
        return config
      },
      error =>{
        return Promise.reject(error)
      }

    )
    const activity_link = 'https://www.strava.com/api/v3/activities/6620594561?include_all_efforts=false'
    axios.get("https://www.strava.com/api/v3/activities/6620594561?include_all_efforts=false")
        .then((res) => console.log(res.data.distance, res.data.id))
  }

})

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router