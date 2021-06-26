const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const web = express();
const PORT = 3000
const UserModel = require('./Models/user-model')
var session = require('express-session')
const ProductModel = require('./Models/product-model')
const connectDB = require('./Database/connectDB')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
web.set('trust proxy', 1) // trust first proxy
web.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: true }));
web.engine('.html', require('ejs').__express);
web.use('/static', express.static('static'))
web.get('/', (req, res) => {
    res.render('./login.ejs')
})
web.get('/index', async(req, res) => {
    res.render('./abc.ejs')
})
web.get('/editproduct', (req, res) => {

    res.render('./edit.ejs')
})
web.get('/register', (req, res) => {
    res.render('./register.ejs')
})
web.get('/index/:type', async(req, res) => {
    const { type } = req.params

    const products = await ProductModel.find({
        type: type
    })
    console.log(products);
    res.render('./index.ejs', {
        productArray: products
    })
})

web.post('/register', async(req, res) => {
    const HPassword = bcrypt.hashSync(req.body.password, 10)
    const newuser = await new UserModel({
        username: req.body.username,
        password: HPassword
    })

    try {
        newuser.save()
        res.status(200).json({
            msg: 'saved'
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: err
        })
    }

})

web.post('/login', async(req, res) => {
    try {
        const userfind = await UserModel.findOne({
            username: req.body.username
        })
        if (userfind) {
            const Cpassword = bcrypt.compareSync(req.body.password, userfind.password)

            if (!userfind.username) {

                res.status(40).json({
                    msg: 'Your username or password is incorrect'
                })
            } else if (Cpassword === false) {
                res.status(401).json({
                    msg: 'Your username or password is incorrect'
                })
            } else {
                res.json({
                    msg: 'Login successful'
                })
            }
        } else {
            res.status(401).json({
                msg: 'Your username or password is incorrect'
            })
        }
    } catch (err) {
        console.log(err, 'loi dang nhap');
        res.status(400).json({
            message: err.message
        })
    }
})

web.post('/addproduct', async(req, res) => {
    const newproduct = await new ProductModel({
        productname: req.body.productname,
        price: req.body.price,
        type: req.body.type
    })
    try {
        newproduct.save()
        res.json({
            msg: 'Add successful'
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'err'
        })
    }
})
web.post('/editproduct', async(req, res) => {

    const update = {
        productname: req.body.productname,
        price: req.body.price,
        type: req.body.type
    }

    console.log(update);
    await ProductModel.findOneAndUpdate({
        _id: req.body.id.split('_')[0]
    }, update, (err) => {
        if (err) {
            res.status(400).json({
                msg: ' Failed to update',
                err: err
            })
        } else {
            res.json({
                msg: 'Updated'
            })
        }
    })
})
web.delete('/deleteproduct', async(req, res) => {
    const deleteproduct = await ProductModel.findOneAndRemove({
        _id: mongoose.Types.ObjectId(req.body._id)
    })
})
const main = async() => {
    try {
        await connectDB()
        web.listen(PORT, () => {
            console.log("Server running at port", PORT);
        })
    } catch (err) {
        console.log(err, 'Fail to connect to DB');
    }
}

main()