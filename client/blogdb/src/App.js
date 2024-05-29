import './App.css';
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import Rootlayout from './components/Rootlayout/Rootlayout';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home'
import ErrorPage from './components/ErrorPage';
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import UserProfile from './components/UserProfile/UserProfile';
import AuthorProfile from  './components/AuthorProfile/AuthorProfile'
import Article from './components/Article/Article';
import Articles from './components/Articles/Articles';
import ArticlesByAuthor from './components/ArticlesByAuthor/ArticlesByAuthor'
import {lazy, Suspense} from 'react'
const AddArticle=lazy(()=>import('./components/AddArticle/AddArticle'))
function App() {
  let router=createBrowserRouter([
     {
       path:'',
       element:<Rootlayout/>,
      errorElement:<ErrorPage/>,
       children:[
         {
           path:'',
           element:<Home/>
     
         },
         {
           path:'signup',
           element:<Signup/>
         },
         {
           path:'signin',
           element:<Signin/>
         }
         ,{
          path:"/user-profile",
          element:<UserProfile/>,
          children:[
            {
              path:"articles",
              element:<Articles/>
            },
            {
              path:"article/:articleId",
              element:<Article />
            },
            {
              path:'',
              element:<Navigate to='articles' />
            }
          ]
        },
        {
          path:"/author-profile",
          element:<AuthorProfile/>,
          children:[
            {
              path:'new-article',
              element:<Suspense fallback="loading..."><AddArticle /></Suspense>
            },
            {
              path:'articles-by-author/:author',
              element:<ArticlesByAuthor/>
             
            },
            {
              path:"article/:articleId",
              element:<Article/>
            },
            {
              path:'',
              element:<Navigate to='articles-by-author/:author' />
            }
          ]
        }
       ]
 
     }
     
    ])
   return (
     <div >
     {/* provide BrowserRouter obj to application */}
    <RouterProvider router={router}/>
     </div>
   );
}

export default App;
