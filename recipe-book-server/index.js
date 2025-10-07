const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI and client setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q1etiuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Home route
app.get('/', (req, res) => {
    res.send('🍲 This is Hot Recipes server!');
});

async function run() {
    try {
        // await client.connect();
        const recipesCollection = client.db('recipesDB').collection('recipe');

        // Add new recipe
        app.post('/addRecipes', async (req, res) => {
            const newRecipe = req.body;
            
            const result = await recipesCollection.insertOne(newRecipe);
            res.send(result);
        });

        // Get all recipes
        app.get('/allRecipes', async (req, res) => {

            const allRecipes = await recipesCollection.find().toArray();
            res.send(allRecipes);
        });

        // Get recipe by ID
        app.get('/recipes/:id', async (req, res) => {
            const id = req.params.id;

            const result = await recipesCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        // Get recipes by user email (using userEmail key)
        app.get('/recipes', async (req, res) => {
            const userEmail = req.query.email;

            const userRecipes = await recipesCollection.find({ userEmail }).toArray();
            res.send(userRecipes);
        });

        // Delete recipe by ID
        app.delete('/recipes/:id', async (req, res) => {
            const id = req.params.id;

            const result = await recipesCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        // Update recipe by ID
        app.put('/recipes/:id', async (req, res) => {
            const id = req.params.id;
            const updatedRecipe = req.body;

            const result = await recipesCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedRecipe }
            );
            res.send(result);
        });

        // PATCH /api/recipes/:id/like
        app.patch('/api/recipes/:id/like', async (req, res) => {
            const { id } = req.params;
            const { likes } = req.body;

            try {
                const result = await recipesCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { likes } }
                );

                if (result.modifiedCount === 1) {
                    res.status(200).json({ message: 'Likes updated successfully' });
                } else {
                    res.status(404).json({ message: 'Recipe not found or already updated' });
                }
            } catch (err) {
                res.status(500).json({ message: 'Failed to update likes', error: err });
            }
        });


        // MongoDB connection ping
        // await client.db("admin").command({ ping: 1 });
        console.log("🚀 Connected to MongoDB and server is running!");

    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        // process.exit(1);
    }
}

run().catch(console.dir);

// Start server
app.listen(port, () => {
    console.log(`🍜 Server is running on http://localhost:${port}`);
});
