const express = require("express");
const app = express();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://jeongdh1003:jeongdh1003@cluster0.ekysavj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    const postCollection = client.db("traveldairy").collection("post");
    const counterCollection = client.db("traveldairy").collection("counter");
    console.log("서버에 연결됐다");

    //GET
    app.get("/", async (req, res) => {
      // const query = {};
      const cursor = postCollection.find({});
      const result = (await cursor.toArray()).sort().reverse();
      res.render("list.ejs", { post: result });
    });

    app.get("/write", (req, res) => {
      res.render("write.ejs");
    });

    app.get("/detail/:id", async function (req, res) {
      const result = await postCollection.findOne({
        _id: parseInt(req.params.id),
      });
      console.log(result);
      res.render("detail.ejs", { data: result });
    });

    app.get("/edit/:id", async function (req, res) {
      const result = await postCollection.findOne({
        _id: parseInt(req.params.id),
      });
      res.render("edit.ejs", { post: result });
    });

    //POST
    app.post("/add", async function (req, res) {
      const { title, category, country, date, descript } = req.body;
      const { totalcounter } = await counterCollection.findOne({
        name: "count",
      });
      await postCollection.insertOne({
        _id: totalcounter + 1,
        postTitle: title,
        postCategory: category,
        postCountry: country,
        postDate: date,
        postDescript: descript,
      });
      await counterCollection.updateOne(
        { name: "count" },
        { $inc: { totalcounter: 1 } }
      );
      res.redirect("/");
    });

    // DELETE
    app.delete("/delete", async function (req, res) {
      req.body._id = parseInt(req.body._id);
      await postCollection.deleteOne(req.body);
      res.status(200).send({ message: "성공" });
    });

    //PUT
    app.put("/edit", async (req, res) => {
      const { id, title, category, country, date, descript } = req.body;
      await postCollection.updateOne(
        { _id: parseInt(id) },
        {
          $set: {
            postTitle: title,
            postCategory: category,
            postCountry: country,
            postDate: date,
            postDescript: descript,
          },
        }
      );
      console.log("수정완료");
      res.redirect("/");
    });
  } finally {
    console.log("마무리");
  }
}

main().catch(console.dir);

app.listen(3000, () => {
  console.log("서버작동");
});
