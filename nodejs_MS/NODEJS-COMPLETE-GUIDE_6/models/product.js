const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);

//const mongodb = require('mongodb');
//const getDb = require('../util/database').getDb;

//class Product { 
    /*constructor(title, price, imageUrl, description, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        
        // Validate and set _id
        if (id && typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]+$/.test(id)) {
            this._id = new mongodb.ObjectId(id);
        } else if (id) {
            this._id = id; // Assume it's already an ObjectId
        } else {
            this._id = null;
        }
        
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //Update the product
            dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
        } else {
            //Insert the product
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
        });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
        }

        static findById(prodId) {
            const db = getDb();
            try {
                const objectId = new mongodb.ObjectId(prodId);
                return db.collection('products')
                .find({_id: objectId})
                .next()
                .then(product => {
                    console.log(product);
                    return product;
                })
                .catch(err => {
                    console.log(err);
                });
            } catch (error) {
                console.log('Invalid ObjectId:', prodId);
                return Promise.resolve(null);
            }
        }

        static deleteById(prodId) {
            const db = getDb();
            try {
                const objectId = new mongodb.ObjectId(prodId);
                return db.collection('products').deleteOne({_id: objectId})
                .then(result => {
                    console.log('Deleted Product');
                })
                .catch(err => {
                    console.log(err);
                });
            } catch (error) {
                console.log('Invalid ObjectId:', prodId);
                return Promise.resolve();
            }
        }
    }*/

//module.exports = Product;