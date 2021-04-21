const express = require('express')
const Cinema = require('../models/cinema')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/new', async (req, res) => {
    const cinema = new Cinema(req.body)

    try {
        await cinema.save()
        res.status(201).send({ cinema })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/cinemas', async (req, res) => {
    Cinema.find({}, (err, cinemas) => {
        if (err) {
            console.log(err);
        } else {
            console.log(cinemas);
            res.send(cinemas);
        }
    })
})


// edit cinema
router.patch('/cinema/:id', async (req, res) => { //add auth!!!!!!!!

    const updates = Object.keys(req.body)

    try {
        const cinema = await Cinema.findOne({ _id: req.params.id })
        if (!cinema) {
            return res.status(404).send()
        }

        updates.forEach((update) => cinema[update] = req.body[update])
        await cinema.save()

        res.send(cinema)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/cinema/:id', async (req, res) => {
    try {
        const cinema = await Cinema.findOneAndDelete({ _id: req.params.id })

        if (!cinema) {
            res.status(404).send()
        }

        res.send(cinema)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router