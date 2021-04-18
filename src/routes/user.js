const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//set globals variables
// function setGlobalVariables(user, token) {
//     sessionStorage.setItem('userName', user.name)
//     sessionStorage.setItem('userEmail', user.email)
//     sessionStorage.setItem('userId', user._id)
//     sessionStorage.setItem('userToken', token)
// }

//create new user
router.post('/users', async (req, res) => {
    console.log('/users');
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        //setGlobalVariables(user, token)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //setGlobalVariables(user, token)

        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

//logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// add cinemas to user
router.patch('/users/add-cinema/:id', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user._id)

        let cinemas = user.cinemas
        if (!cinemas.includes(req.params.id)) {
            user.cinemas.push(req.params.id)
            await user.save()
            res.send(user)
        }
    } catch (e) {
        res.status(500).send()
    }
})

// get user and populate all cinemas 
router.get('/users/cinemas', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        await user.populate('cinemas').execPopulate()
        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})

// delete a cinema 
router.delete('/users/cinemas/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        await user.cinemas.pull({ _id: req.params.id })
        await user.save()
        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})

// delete all cinemas in cart 
router.patch('/users/delete-all-cinemas', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        user.cinemas = []
        await user.save()
        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router