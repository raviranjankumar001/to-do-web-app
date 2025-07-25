import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken';
import connectDB from './config/databaseconnect.js';
import user from './models/usermodel.js';
import todomodel from './models/todomodel.js';


const app = express();


//connect db
connectDB()

// middleware 
app.use(express.json());
app.use(cors())




// auth middleware 

const vefyadmintoken = (req, res, next) =>{
  const authheader = req.headers.token;


  if(!authheader){
    return res.json({message : "Unauthorized: No token provided"})
  }

  try {
    const decodetoken = jwt.verify(authheader, "shhhhhhhhhh");
    if(decodetoken.role !== "admin"){
      return res.json({message : "not admin"})
    }
    // console.log(decodetoken);
    
    req.admin = decodetoken;

    next()
    
  } catch (error) {
    return res.json({message: "somthing went wrong"})
  }

  
}

const verifyUserToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "shhhhhhhhhh");
    //check if user exist in db by email or Id

    const existinguser = await user.findOne({email: decoded.email});

    if(!existinguser){
      return res.json({message:"user not found"})
    }


    // Attach decoded user info to req.user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};







// routes and apis  --------------------------------

app.get('/',(req,res) =>{
    res.end("hello")
})


// admin login
app.post('/api/admin/login',(req, res) => {
  const { email, password } = req.body;

  
  const adminEmail = 'admin@e.com';
  const adminPassword = '123';

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }

  
  const token = jwt.sign({ role: 'admin', email }, "shhhhhhhhhh");

  res.json({
    success: true,
    token,
    message: 'Admin login successful',
  });
});



// get all todo
app.get("/api/todos",vefyadmintoken, async (req, res) => {
  try {
    // console.log(req.admin);

    if(req.admin.email !== 'admin@e.com'){
      return res.json({message:"some thing went wrong"})

    }
    
    const todos = await todomodel.find();
    res.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});



// add toto by admin
// app.post("/api/add/admin", async (req, res) => {
//   const { title, email , type } = req.body;

//   if (!title || !email || !type) {
//     return res.status(400).json({ message: 'Title and Email are required' });
//   }

//   try {
//     const newTodo = new todomodel({ title, email ,type});
//     await newTodo.save();
//     res.json({ message: 'Todo created successfully', todo: newTodo });
//   } catch (error) {
//     console.error('Error creating todo:', error);
//     res.status(500).json({ message: 'Failed to create todo' });
//   }
// });



// get all user for admin 
app.get("/api/user",vefyadmintoken, async (req, res) => {
  if(req.admin.email !== 'admin@e.com'){
      return res.json({message:"some thing went wrong"})

    }

  try {
    const data = await user.find();
    // console.log(data);
    // console.log(req.admin);
    // console.log('hi');
    
    
    
    res.json({ data });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});








// user apis----------------------------------------


// user register
app.post("/api/user/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    

    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.json({ message: "Email already exists" });
    }

    const newuser = new user({ username, email, password });
    await newuser.save();

    res.json({ message: "user registered successfully" });
  } catch (error) {
    res.json({ message: "Registration failed", error });
  }
});





// app login 
app.post("/api/user/login", async (req, res) => {
  
  
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    

    const userr = await user.findOne({ email });
    // console.log(userr);
    
    if (!userr) {
      return res.json({ message: "user not found" });
    }
    // console.log('hi');
    



    const token = jwt.sign({ id: userr._id, email: userr.email }, 'shhhhhhhhhh');

    res.json({ message: "Login successful", token, user: { id: userr._id, email: userr.email } });
  } catch (error) {
    res.json({ message: "Login failed", error });
  }
});


//add todo  by user 
app.post("/api/add/user",verifyUserToken, async (req, res) => {
  const { title, email , type } = req.body;

  if (!title || !email || !type) {
    return res.status(400).json({ message: 'Title and Email are required' });
  }

  try {
    const newTodo = new todomodel({ title, email ,type});
    await newTodo.save();
    res.json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Failed to create todo' });
  }
});




// GET /api/todos
app.get("/api/user/todos",verifyUserToken ,async (req, res) => {
  // console.log(req.user);
  try {
    // const { email } = req.query;
    const email = req.user.email
    // console.log(email);
    

    const filter = email ? { email } : {};

    const todos = await todomodel.find(filter);
    // console.log(todos);
    
    res.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});



// delete todo authenticatino inside callback 
app.post('/api/delete', async (req, res) => {
  const { id } = req.body;
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decode = jwt.verify(token, "shhhhhhhhhh");

    const todo = await todomodel.findById(id);
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    // Check if admin or the owner of the todo
    if (decode.email === 'admin@e.com' || decode.email === todo.email) {
      await todo.deleteOne();
      return res.json({ success: true, message: 'Todo deleted successfully' });
    } else {
      return res.status(403).json({ message: "Unauthorized to delete this todo" });
    }

  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});



// EDIT todo 
// app.post('/api/edit',async (req, res) => {
//   try {
//     const { task, type } = req.body; // receive updated data
//     const todoId = req.params.id;

//     const updatedTodo = await Todo.findByIdAndUpdate(
//       todoId,
//       { task, type },
//       { new: true }
//     );

//     if (!updatedTodo) {
//       return res.status(404).json({ success: false, message: "Todo not found" });
//     }

//     res.json({ success: true, message: "Todo updated", todo: updatedTodo });
//   } catch (error) {
//     console.error("Error updating todo:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });




app.listen(3000 ,() => {
  console.log("Server is running on http://localhost:3000");
})